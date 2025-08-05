'use client';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function AuthenticatedLayout({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!user) {
    redirect('/auth');
  }

  return <>{children}</>;
}
