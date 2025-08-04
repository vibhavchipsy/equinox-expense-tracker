'use client';
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';

type Expense = {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
};

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [form, setForm] = useState({ amount: '', category: '', date: '', description: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);


  useEffect(() => {
    const getUserAndFetch = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        fetchExpenses(user.id);
      }
    };
    getUserAndFetch();
  }, []);  

  const fetchExpenses = async (uid: string) => {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', uid)
      .order('date', { ascending: false });
  
    if (!error) setExpenses(data || []);
  };
  

  const handleSubmit = async () => {
    const { amount, category, date, description } = form;
    if (!amount || !category || !date ||!userId) return;

    const dataToSend = {
      amount: Number(amount),
      category,
      date,
      description,
      user_id: userId
    };

    const action = editingId
      ? supabase.from('expenses').update(form).eq('id', editingId)
      : supabase.from('expenses').insert([dataToSend]);

    const { error } = await action;
    if (!error) {
      setForm({ amount: '', category: '', date: '', description: '' });
      setEditingId(null);
      fetchExpenses(userId);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('expenses').delete().eq('id', id);
    if (!error && userId) fetchExpenses(userId);
  };

  const handleEdit = (exp: Expense) => {
    setEditingId(exp.id);
    setForm({
      amount: exp.amount.toString(),
      category: exp.category,
      date: exp.date,
      description: exp.description || ''
    });
    
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-6">💸 Expense Tracker</h1>

        <div className="bg-white shadow-md rounded-xl p-6 mb-6 space-y-4">
          <div className="flex flex-col gap-3 md:gap-4">
            <input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="flex-1 border border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="flex-1 border border-gray-300 rounded-md p-2"
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="flex-1 border border-gray-300 rounded-md p-2"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {editingId ? 'Update' : 'Add'} Expense
            </button>
            {editingId && (
              <button
                onClick={() => {
                  setForm({ amount: '', category: '', date: '', description: '' });
                  setEditingId(null);
                }}
                className="text-sm text-gray-500 underline"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {expenses.length === 0 ? (
            <p className="text-center text-gray-500">No expenses yet.</p>
          ) : (
            expenses.map((exp) => (
              <div
                key={exp.id}
                className="bg-white shadow-sm rounded-md p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-lg">₹{exp.amount}</p>
                  <p className="text-sm text-gray-500">
                    {exp.category} • {new Date(exp.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">{exp.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
