'use client';

import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import ExpenseForm from './ExpenseForm';
import { Expense, ExpenseFormData } from '../types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  editing: Expense | null;
  onSubmit: (data: ExpenseFormData) => void;
  onUpdate: (id: string, data: Partial<Expense>) => void;
  cancelEdit: () => void;
};

export default function ExpenseModal({
  isOpen,
  onClose,
  editing,
  onSubmit,
  onUpdate,
  cancelEdit,
}: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />

      {/* Panel */}
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 z-50 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Heading */}
        <Dialog.Title className="text-xl font-semibold mb-4 text-center">
          {editing ? 'Edit Expense' : 'Add Expense'}
        </Dialog.Title>

        {/* Form */}
        <ExpenseForm
          editing={editing}
          onSubmit={onSubmit}
          onUpdate={onUpdate}
          cancelEdit={cancelEdit}
        />
      </div>
    </Dialog>
  );
}
