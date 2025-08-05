'use client';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { redirect } from 'next/navigation';

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!user) return redirect('/auth');

  return <div className="min-h-screen bg-gray-100">{children}</div>;
}
