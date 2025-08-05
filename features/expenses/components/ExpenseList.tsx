import { Expense } from '../types';
import ExpenseItem from './ExpenseItem';

type Props = {
  expenses: Expense[];
  onEdit: (e: Expense) => void;
  onDelete: (id: string) => void;
};

export default function ExpenseList({ expenses, onEdit, onDelete }: Props) {
  if (expenses.length === 0) {
    return <p className="text-center text-gray-500">No expenses yet.</p>;
  }

  return (
    <div className="space-y-3">
      {expenses.map((exp) => (
        <ExpenseItem key={exp.id} expense={exp} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
