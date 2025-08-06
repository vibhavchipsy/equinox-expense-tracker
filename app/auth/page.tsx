'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth'; // assuming you have this
import { notify } from '@/lib/toastService';
import AuthForm from '@/features/auth/components/AuthForm';

export default function AuthPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (user) {
      notify.info('Already logged in, redirecting');
      router.push('/dashboard');
    }
  }, [user, loading]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <AuthForm />
    </main>
  );
}
