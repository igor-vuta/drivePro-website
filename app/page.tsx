'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Root redirect: /test-repo/ → /test-repo/ru/
export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/ru');
  }, [router]);

  return (
    <html lang="ru">
      <body
        style={{
          background: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          margin: 0,
          color: '#F5F0E8',
          fontFamily: 'sans-serif',
        }}
      >
        <span>★</span>
      </body>
    </html>
  );
}
