'use client';
import { useState, useEffect } from 'react';
import { Expense } from '../types';

type Props = {
  userId: string;
  onSubmit: (data: Omit<Expense, 'id'>) => void;
  onUpdate: (id: string, data: Partial<Expense>) => void;
  editing: Expense | null;
  cancelEdit: () => void;
};

export default function ExpenseForm({
  userId,
  onSubmit,
  onUpdate,
  editing,
  cancelEdit,
}: Props) {
  const [form, setForm] = useState({
    amount: '',
    category: '',
    date: '',
    description: '',
  });

  useEffect(() => {
    if (editing) {
      setForm({
        amount: editing.amount.toString(),
        category: editing.category,
        date: editing.date,
        description: editing.description || '',
      });
    } else {
      setForm({ amount: '', category: '', date: '', description: '' });
    }
  }, [editing]);

  const handleSubmit = () => {
    if (!form.amount || !form.category || !form.date) return;
    const payload = {
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
      description: form.description,
      user_id: userId,
    };
    if (editing) {
      onUpdate(editing.id, payload);
    } else {
      onSubmit(payload);
    }
    setForm({ amount: '', category: '', date: '', description: '' });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <div className="flex gap-4">
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
          {editing ? 'Update' : 'Add'} Expense
        </button>
        {editing && (
          <button onClick={cancelEdit} className="text-sm text-gray-500 underline">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
