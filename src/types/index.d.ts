declare module "*.png" {
  const src: string;
  export default src;
}

// Определение типа для транзакции.
export interface ExpenseItem {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  subcategory: string;
  type?: 'adequate' | 'impulsive'; // Делаем тип необязательным
}

// Определение типа для челленджа.
export interface Challenge {
  id: string;
  name: string;
  durationDays: number;
  startDate: string;
  endDate: string;
  relatedTransactions: ExpenseItem[]; // Связанные транзакции
  status: 'active' | 'completed' | 'failed';
  progress: number; // Прогресс челленджа (например, сколько дней продержался)
}