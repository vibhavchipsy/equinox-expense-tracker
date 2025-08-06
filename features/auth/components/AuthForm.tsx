'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { signIn, signUp } from '../services/authService';
import { notify } from '@/lib/toastService';

export default function AuthForm() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    notify.info('Please login to continue');
  }, []);
  

  const handleAuth = async () => {
    const fn = mode === 'login' ? signIn : signUp;

    try {
      await fn(email, password); // no destructuring needed
      router.push('/dashboard');
    } catch (error: any) {
      console.error(error);
      // Optional: could show inline error here if needed
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 space-y-4">
      <h2 className="text-xl font-semibold text-center">
        {mode === 'login' ? 'Login' : 'Register'}
      </h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded-md"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded-md"
      />
      <button
        onClick={handleAuth}
        className="w-full bg-blue-600 text-white py-2 rounded-md"
      >
        {mode === 'login' ? 'Sign In' : 'Sign Up'}
      </button>
      <p className="text-sm text-center">
        {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          className="text-blue-500 underline"
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
        >
          {mode === 'login' ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}
