'use client';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import AppShell from './AppShell';

type Props = {
  children: ReactNode;
};

export default function AuthenticatedLayout({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-black-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    redirect('/auth');
  }

  // return <>{children}</>;
  // Wrap children with navigation
  return <AppShell>{children}</AppShell>;
}
