import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Error: Please provide NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function createAdmin() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'superadmin@gmail.com',
    password: 'admin123',
    email_confirm: true,
    user_metadata: { role: 'admin', full_name: 'Super Admin' }
  });

  if (error) {
    console.error('Error creating user:', error.message);
    process.exit(1);
  }

  console.log('User created:', data.user.id);
}

createAdmin();
