import { createClient } from '@/lib/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = await createClient();

  // Refresh session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect admin routes (except /admin/login)
  if (request.nextUrl.pathname.startsWith('/master') && !request.nextUrl.pathname.startsWith('/master/login')) {
    if (!user) {
      const loginUrl = new URL('/master/login', request.url);
      loginUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/master/:path*'],
};
