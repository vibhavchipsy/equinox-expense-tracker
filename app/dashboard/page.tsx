'use client';

import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import ExpenseForm from '@/features/expenses/components/ExpenseForm';
import ExpenseList from '@/features/expenses/components/ExpenseList';
import { useExpenses } from '@/features/expenses/hooks/useExpenses';
import { signOut } from '@/features/auth/services/authService';
import { useAuth } from '@/features/auth/hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();
  const {
    expenses,
    editing,
    setEditing,
    addExpense,
    editExpense,
    removeExpense,
  } = useExpenses(); // No more need to pass userId manually

  return (
    <AuthenticatedLayout>
      <main className="flex flex-col items-center">
        <div className="max-w-xl w-full">
          <div className="flex justify-between mb-4">
            <p className="text-sm text-gray-700">
              Hi{user?.email ? `, ${user.email}` : ''} 👋
            </p>
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
            editing={editing}
            onSubmit={addExpense}
            onUpdate={editExpense}
            cancelEdit={() => setEditing(null)}
          />

          <div className="mt-6">
            <ExpenseList
              expenses={expenses}
              onEdit={setEditing}
              onDelete={removeExpense}
            />
          </div>
        </div>
      </main>
    </AuthenticatedLayout>
  );
}
