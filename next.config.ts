import type { NextConfig } from "next";

let r2Hostname = '';
if (process.env.R2_PUBLIC_URL) {
  try {
    r2Hostname = new URL(process.env.R2_PUBLIC_URL).hostname;
  } catch {
    // fallback if URL is invalid or empty
  }
}

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://app.midtrans.com https://app.sandbox.midtrans.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://images.unsplash.com https://zuotpkitkbhiynsoavos.supabase.co https://*.r2.dev https://*.cloudflarestorage.com ${r2Hostname ? `https://${r2Hostname}` : ''};
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    frame-src 'self' https://app.midtrans.com https://app.sandbox.midtrans.com;
    connect-src 'self' https://app.midtrans.com https://app.sandbox.midtrans.com https://zuotpkitkbhiynsoavos.supabase.co https://*.r2.dev https://*.cloudflarestorage.com ${r2Hostname ? `https://${r2Hostname}` : ''};
`;

const remotePatterns: Array<{
  protocol: 'http' | 'https';
  hostname: string;
  port?: string;
  pathname: string;
}> = [
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'zuotpkitkbhiynsoavos.supabase.co',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: '**.r2.dev',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: '**.cloudflarestorage.com',
    pathname: '/**',
  },
];

if (r2Hostname && !remotePatterns.some((p) => p.hostname === r2Hostname)) {
  remotePatterns.push({
    protocol: 'https',
    hostname: r2Hostname,
    pathname: '/**',
  });
}

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Use DENY if not expecting to be framed
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns,
  },
};

export default nextConfig;
