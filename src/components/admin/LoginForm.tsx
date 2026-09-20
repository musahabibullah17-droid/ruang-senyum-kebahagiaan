'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Loader2, ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeBtn, setActiveBtn] = useState<number>(0);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError) {
        await supabase.auth.signOut();
        setError('Error mengambil profil: ' + profileError.message);
        setLoading(false);
        return;
      }

      if (profile?.role === 'admin') {
        router.push('/master');
        router.refresh();
      } else {
        await supabase.auth.signOut();
        setError('Akses ditolak: Akun Anda tidak memiliki hak akses administrator.');
      }
    }
    
    setLoading(false);
  };

  return (
    <form className="space-y-5" onSubmit={handleLogin}>
      {error && (
        <div className="p-3.5 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      <div className="box-fieldset">
        <label htmlFor="email-address">Alamat Email</label>
        <div className="relative">
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="admin@ruangsenyum.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="box-fieldset">
        <label htmlFor="password">Kata Sandi</label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="pt-3">
        <div 
          className="btn-campaign-pair"
          onMouseLeave={() => setActiveBtn(0)}
        >
          <button
            type="submit"
            disabled={loading}
            onMouseEnter={() => setActiveBtn(0)}
            className={`btn-campaign-item !h-11 ${activeBtn === 0 ? 'is-active' : 'is-inactive'}`}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          <Link
            href="/"
            onMouseEnter={() => setActiveBtn(1)}
            className={`btn-campaign-item !h-11 ${activeBtn === 1 ? 'is-active' : 'is-inactive'}`}
          >
            <span>← Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </form>
  );
}
