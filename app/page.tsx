'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/ru');
  }, [router]);

  return (
    <div
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
      <span>◆</span>
    </div>
  );
}
