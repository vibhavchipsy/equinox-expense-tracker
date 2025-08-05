export type Expense = {
    id: string;
    amount: number;
    category: string;
    date: string;
    description?: string;
    user_id: string;
  };
  
  export type ExpenseFormData = Omit<Expense, 'id' | 'user_id'>;