'use client';
import { useAuth } from '@/features/auth/hooks/useAuth';
import ExpenseForm from '@/features/expenses/components/ExpenseForm';
import ExpenseList from '@/features/expenses/components/ExpenseList';
import { useExpenses } from '@/features/expenses/hooks/useExpenses';
import { signOut } from '@/features/auth/services/authService';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const {
    expenses,
    editing,
    setEditing,
    addExpense,
    editExpense,
    removeExpense,
  } = useExpenses(user?.id ?? null);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!user) return redirect('/auth');

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-xl w-full">
        <div className="flex justify-end mb-4">
          <button
            onClick={async () => {
              await signOut();
              location.reload();
            }}
            className="text-sm underline text-gray-600"
          >
            Logout
          </button>
        </div>
        <h1 className="text-3xl font-bold text-center mb-4">💸 Expense Tracker</h1>

        <ExpenseForm
          userId={user.id}
          editing={editing}
          onSubmit={addExpense}
          onUpdate={editExpense}
          cancelEdit={() => setEditing(null)}
        />

        <div className="mt-6">
          <ExpenseList expenses={expenses} onEdit={setEditing} onDelete={removeExpense} />
        </div>
      </div>
    </main>
  );
}
