'use client';

import { createContext, useContext, useState } from 'react';
import { Expense } from '@/features/expenses/types';

type ExpenseModalContextType = {
  openModal: (expense?: Expense | null) => void;
  closeModal: () => void;
  isModalOpen: boolean;
  editing: Expense | null;
};

const ExpenseModalContext = createContext<ExpenseModalContextType | undefined>(undefined);

export function ExpenseModalProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);

  const openModal = (expense: Expense | null = null) => {
    setEditing(expense);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
  };

  return (
    <ExpenseModalContext.Provider value={{ openModal, closeModal, isModalOpen, editing }}>
      {children}
    </ExpenseModalContext.Provider>
  );
}

export function useExpenseModal() {
  const context = useContext(ExpenseModalContext);
  if (!context) throw new Error('useExpenseModal must be used within ExpenseModalProvider');
  return context;
}