import { supabase } from '@/lib/supabaseClient';
import { Expense } from '../types';

export const fetchExpenses = async (userId: string) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (error) throw error;
  return data as Expense[];
};

export const createExpense = async (expense: Omit<Expense, 'id'>) => {
  const { error } = await supabase.from('expenses').insert([expense]);
  if (error) throw error;
};

export const updateExpense = async (id: string, userId: string, updateData: Partial<Expense>) => {
  const { error } = await supabase
    .from('expenses')
    .update(updateData)
    .eq('id', id)
    .eq('user_id', userId);

  if (error) throw error;
};

export const deleteExpense = async (id: string) => {
  const { error } = await supabase.from('expenses').delete().eq('id', id);
  if (error) throw error;
};
