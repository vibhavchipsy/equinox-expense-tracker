'use client';
import { supabase } from '@/lib/supabaseClient';
import { notify } from '@/lib/toastService';

export const signIn = async (email: string, password: string) => {
  // return await supabase.auth.signInWithPassword({ email, password });
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    notify.error('Login failed');
    throw error;
  }
  notify.success('Logged in successfully');
  return data;
};

export const signUp = async (email: string, password: string) => {
  // return await supabase.auth.signUp({ email, password });
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    notify.error('Signup failed');
    throw error;
  }
  notify.success('Account created! Please verify your email');
  return data;
};

export const signOut = async () => {
  // return await supabase.auth.signOut();
  const { error } = await supabase.auth.signOut();
  if (error) {
    notify.error('Logout failed');
    throw error;
  }
  notify.success('Logged out');
};

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};
