import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { snap } from '@/lib/midtrans';
import { generateTransactionCode } from '@/lib/utils';
import { MIN_DONATION_AMOUNT } from '@/lib/constants';
import { z } from 'zod';
import rateLimit, { getIP } from '@/lib/rate-limit';

const limiter = rateLimit({
  uniqueTokenPerInterval: 500,
  interval: 60000,
});

const donationSchema = z.object({
  campaign_id: z.string().min(1, "ID Campaign tidak valid"),
  donor_name: z.string().min(2, "Nama minimal 2 karakter").max(100),
  donor_email: z.string().email("Email tidak valid"),
  amount: z.number().min(MIN_DONATION_AMOUNT, `Minimal donasi adalah Rp${MIN_DONATION_AMOUNT}`),
  message: z.string().max(500).optional(),
  is_anonymous: z.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting
    try {
      const ip = getIP(request);
      await limiter.check(5, ip); // Limit to 5 requests per minute per IP
    } catch {
      return NextResponse.json({ error: 'Terlalu banyak permintaan. Silakan coba lagi nanti.' }, { status: 429 });
    }

    // 2. Input Validation & Sanitization with Zod
    const rawBody = await request.json();
    const validationResult = donationSchema.safeParse(rawBody);

    if (!validationResult.success) {
      return NextResponse.json({ 
        error: 'Data input tidak valid', 
        details: validationResult.error.format() 
      }, { status: 400 });
    }

    const { campaign_id, donor_name, donor_email, amount, message, is_anonymous } = validationResult.data;

    const supabase = createAdminClient();

    // 2. Check if campaign exists and is active
    const { data: campaign, error: campaignError } = await supabase
      .from('campaigns')
      .select('id, title, status')
      .eq('id', campaign_id)
      .single();

    if (campaignError || !campaign) {
      return NextResponse.json({ error: 'Campaign tidak ditemukan', details: campaignError }, { status: 404 });
    }

    if (campaign.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'Campaign ini tidak dapat menerima donasi saat ini' }, { status: 400 });
    }

    // 3. Generate transaction data
    const transactionCode = generateTransactionCode();
    const midtransOrderId = `ORDER-${transactionCode}`;

    // 4. Create transaction in Supabase
    const { data: transaction, error: insertError } = await supabase
      .from('transactions')
      .insert({
        transaction_code: transactionCode,
        campaign_id,
        donor_name,
        donor_email,
        amount,
        midtrans_order_id: midtransOrderId,
        message,
        is_anonymous,
        payment_status: 'PENDING',
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating transaction in DB:', insertError);
      return NextResponse.json({ error: 'Gagal membuat transaksi', details: insertError }, { status: 500 });
    }

    // 5. Create Midtrans Snap Transaction
    const parameter = {
      transaction_details: {
        order_id: midtransOrderId,
        gross_amount: amount,
      },
      customer_details: {
        first_name: is_anonymous ? 'Hamba Allah' : donor_name,
        email: donor_email,
      },
      item_details: [
        {
          id: campaign_id,
          price: amount,
          quantity: 1,
          name: `Donasi: ${campaign.title.substring(0, 40)}`, // Midtrans name max length is 50
        },
      ],
      custom_field1: transaction.id, // Store our DB transaction ID for reference
    };

    const snapResponse = await snap.createTransaction(parameter);

    return NextResponse.json({
      transaction_id: transaction.id,
      snap_token: snapResponse.token,
      redirect_url: snapResponse.redirect_url,
    });
  } catch (error: any) {
    console.error('Donation API Error:', error);
    // OBFUSCATION: Do not leak internal error message to client
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server saat memproses donasi.' },
      { status: 500 }
    );
  }
}
