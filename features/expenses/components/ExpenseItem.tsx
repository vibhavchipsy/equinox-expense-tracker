import { Expense } from '../types';
import { formatDate } from '@/utils/dateUtils';

type Props = {
  expense: Expense;
  onEdit: (e: Expense) => void;
  onDelete: (id: string) => void;
};

export default function ExpenseItem({ expense, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between">
      <div>
        <p className="font-medium text-lg">₹{expense.amount}</p>
        <p className="text-sm text-gray-500">
          {expense.category} • {formatDate(expense.date)}
        </p>
        {expense.description && <p className="text-sm text-gray-500">{expense.description}</p>}
      </div>
      <div className="flex gap-2">
        <button onClick={() => onEdit(expense)} className="text-blue-600 text-sm underline">
          Edit
        </button>
        <button onClick={() => onDelete(expense.id)} className="text-red-600 text-sm underline">
          Delete
        </button>
      </div>
    </div>
  );
}
