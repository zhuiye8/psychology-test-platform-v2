'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';
import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // Redirect authenticated users to dashboard
        router.replace('/dashboard');
      } else {
        // Redirect unauthenticated users to login
        router.replace('/login');
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spin size="large" />
    </div>
  );
}