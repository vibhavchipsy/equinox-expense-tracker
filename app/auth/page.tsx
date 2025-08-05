'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth'; // assuming you have this
import AuthForm from '@/features/auth/components/AuthForm';

export default function AuthPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <AuthForm />
    </main>
  );
}
