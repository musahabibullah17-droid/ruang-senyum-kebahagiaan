-- =============================================
-- BantuSesama - Database Schema
-- =============================================
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. PROFILES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 2. CAMPAIGNS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  cover_image TEXT,
  goal_amount BIGINT NOT NULL DEFAULT 0,
  current_amount BIGINT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'ACTIVE', 'COMPLETED', 'CLOSED')),
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for slug lookups
CREATE INDEX IF NOT EXISTS idx_campaigns_slug ON campaigns(slug);
-- Index for status filtering
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);

-- =============================================
-- 3. CAMPAIGN IMAGES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS campaign_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for campaign gallery lookups
CREATE INDEX IF NOT EXISTS idx_campaign_images_campaign ON campaign_images(campaign_id);

-- =============================================
-- 4. TRANSACTIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_code TEXT UNIQUE NOT NULL,
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  amount BIGINT NOT NULL,
  payment_method TEXT,
  payment_status TEXT NOT NULL DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'SUCCESS', 'FAILED', 'EXPIRED')),
  midtrans_order_id TEXT UNIQUE NOT NULL,
  midtrans_transaction_id TEXT,
  message TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for transaction queries
CREATE INDEX IF NOT EXISTS idx_transactions_campaign ON transactions(campaign_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(payment_status);
CREATE INDEX IF NOT EXISTS idx_transactions_midtrans_order ON transactions(midtrans_order_id);

-- =============================================
-- 5. FUNCTION: Update campaign current_amount
-- =============================================
CREATE OR REPLACE FUNCTION update_campaign_current_amount()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the campaign's current_amount based on SUM of SUCCESS transactions
  UPDATE campaigns
  SET
    current_amount = COALESCE(
      (SELECT SUM(amount) FROM transactions WHERE campaign_id = COALESCE(NEW.campaign_id, OLD.campaign_id) AND payment_status = 'SUCCESS'),
      0
    ),
    updated_at = NOW()
  WHERE id = COALESCE(NEW.campaign_id, OLD.campaign_id);

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- 6. TRIGGER: Auto-update campaign amount on transaction change
-- =============================================
DROP TRIGGER IF EXISTS trigger_update_campaign_amount ON transactions;
CREATE TRIGGER trigger_update_campaign_amount
  AFTER INSERT OR UPDATE OF payment_status OR DELETE
  ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_campaign_current_amount();

-- =============================================
-- 7. FUNCTION: Auto-create profile on user signup
-- =============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- =============================================
-- 8. FUNCTION: Auto-update updated_at timestamp
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS set_updated_at_campaigns ON campaigns;
CREATE TRIGGER set_updated_at_campaigns
  BEFORE UPDATE ON campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_transactions ON transactions;
CREATE TRIGGER set_updated_at_transactions
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_profiles ON profiles;
CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 9. ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- ----- PROFILES -----
-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ----- CAMPAIGNS -----
-- Anyone can view active and completed campaigns
CREATE POLICY "Anyone can view public campaigns"
  ON campaigns FOR SELECT
  USING (status IN ('ACTIVE', 'COMPLETED') OR
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can insert campaigns
CREATE POLICY "Admins can create campaigns"
  ON campaigns FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update campaigns
CREATE POLICY "Admins can update campaigns"
  ON campaigns FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can delete campaigns
CREATE POLICY "Admins can delete campaigns"
  ON campaigns FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ----- CAMPAIGN IMAGES -----
-- Anyone can view campaign images
CREATE POLICY "Anyone can view campaign images"
  ON campaign_images FOR SELECT
  USING (true);

-- Admins can insert campaign images
CREATE POLICY "Admins can create campaign images"
  ON campaign_images FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update campaign images
CREATE POLICY "Admins can update campaign images"
  ON campaign_images FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can delete campaign images
CREATE POLICY "Admins can delete campaign images"
  ON campaign_images FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ----- TRANSACTIONS -----
-- Anyone can create a transaction (donating)
CREATE POLICY "Anyone can create transactions"
  ON transactions FOR INSERT
  WITH CHECK (true);

-- Admins can view all transactions
CREATE POLICY "Admins can view all transactions"
  ON transactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Public can view non-anonymous donors for specific campaigns (limited fields via API)
CREATE POLICY "Public can view public donations"
  ON transactions FOR SELECT
  USING (payment_status = 'SUCCESS' AND is_anonymous = false);

-- Service role handles updates (webhook) — no user-facing update policy needed
-- The service_role key bypasses RLS

-- =============================================
-- 10. STORAGE BUCKET
-- =============================================
-- Run this in Supabase Dashboard > Storage, or via SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('campaigns', 'campaigns', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
-- Anyone can view campaign images
CREATE POLICY "Public can view campaign images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'campaigns');

-- Admins can upload campaign images
CREATE POLICY "Admins can upload campaign images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'campaigns'
    AND EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update campaign images
CREATE POLICY "Admins can update campaign images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'campaigns'
    AND EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can delete campaign images
CREATE POLICY "Admins can delete campaign images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'campaigns'
    AND EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );
