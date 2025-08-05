'use client';
import { useEffect, useState } from 'react';
import { Expense } from '../types';
import {
  fetchExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from '../services/expenseService';

export const useExpenses = (userId: string | null) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Expense | null>(null);

  const loadExpenses = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const data = await fetchExpenses(userId);
      setExpenses(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userId) loadExpenses();
  }, [userId]);

  const addExpense = async (data: Omit<Expense, 'id'>) => {
    await createExpense(data);
    loadExpenses();
  };

  const editExpense = async (id: string, data: Partial<Expense>) => {
    if (!userId) return;
    await updateExpense(id, userId, data);
    setEditing(null);
    loadExpenses();
  };

  const removeExpense = async (id: string) => {
    await deleteExpense(id);
    loadExpenses();
  };

  return {
    expenses,
    loading,
    editing,
    setEditing,
    addExpense,
    editExpense,
    removeExpense,
  };
};
