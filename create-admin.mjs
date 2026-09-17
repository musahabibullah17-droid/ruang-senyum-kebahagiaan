import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zuotpkitkbhiynsoavos.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1b3Rwa2l0a2JoaXluc29hdm9zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTYxNjExMywiZXhwIjoyMTA1MTkyMTEzfQ.vOFXNuejUmRHPl0WzhKcEpsMcsctYlgVdYBKrqX5FDI';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function createAdmin() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'musahabibullah3@gmail.com',
    password: 'konfirmasi17',
    email_confirm: true,
    user_metadata: { role: 'admin', full_name: 'Admin Musa' }
  });

  if (error) {
    console.error('Error creating user:', error.message);
    process.exit(1);
  }

  console.log('User created:', data.user.id);
}

createAdmin();
