// src/components/mobile/AddChallengePage.tsx
import React, { useState } from 'react';
import { ExpenseItem } from '../../types'; // Импорт типа ExpenseItem
import { MobileHeader } from './MobileHeader'; // Импорт MobileHeader

interface AddChallengePageProps {
  onBack: () => void;
  onAddChallenge: (name: string, durationDays: number, relatedTransactions: ExpenseItem[]) => void;
  availableExpenses: ExpenseItem[]; // Доступные транзакции для выбора
  activeTab: string; // Оставляем для совместимости с App.tsx
  onTabChange: (tab: string) => void; // Оставляем для совместимости с App.tsx
}

// Компонент для создания нового челленджа. Здесь пользователь будет указывать цель, срок и выбирать транзакции.
const AddChallengePage: React.FC<AddChallengePageProps> = ({ onBack, onAddChallenge, availableExpenses }) => {
  const [challengeName, setChallengeName] = useState('');
  const [challengeDuration, setChallengeDuration] = useState<number>(0);
  const [selectedTransactions, setSelectedTransactions] = useState<ExpenseItem[]>([]); // Для хранения выбранных объектов транзакций

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (challengeName && challengeDuration > 0) {
      onAddChallenge(challengeName, challengeDuration, selectedTransactions);
    }
  };

  const handleTransactionToggle = (expense: ExpenseItem) => {
    setSelectedTransactions(prev =>
      prev.some(item => item.id === expense.id)
        ? prev.filter(item => item.id !== expense.id)
        : [...prev, expense]
    );
  };

  return (
    <>
      <MobileHeader title="Создать новый челлендж" onBack={onBack} showBell={false} />
      
      <div className="p-4 pb-32">
        {/* Форма для ввода данных челленджа */}
        <form onSubmit={handleSubmit} id="challenge-form">
          <div className="mb-4">
            <label htmlFor="challengeName" className="block text-gray-700 text-sm font-bold mb-2">
              Цель челленджа:
            </label>
            <input
              type="text"
              id="challengeName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Например: Не пить кофе 7 дней"
              value={challengeName}
              onChange={(e) => setChallengeName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="challengeDuration" className="block text-gray-700 text-sm font-bold mb-2">
              Срок (в днях):
            </label>
            <input
              type="number"
              id="challengeDuration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Например: 7"
              value={challengeDuration}
              onChange={(e) => setChallengeDuration(parseInt(e.target.value))}
            />
          </div>
          {/* Здесь будет выбор транзакций */}
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Выберите связанные транзакции:</h2>
            {availableExpenses.length === 0 ? (
              <p>Нет доступных транзакций для выбора.</p>
            ) : (
              <div className="space-y-2">
                {availableExpenses.map((expense) => (
                  <label key={expense.id} className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={selectedTransactions.some(item => item.id === expense.id)}
                      onChange={() => handleTransactionToggle(expense)}
                    />
                    <span className="ml-2">{expense.description} ({expense.amount} ₽) - {expense.date}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
      
      {/* Кнопка в fixed позиции, выше BottomNavigation */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 max-w-sm mx-auto">
        <button 
          type="submit" 
          form="challenge-form"
          className="w-full bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg font-bold text-lg shadow-lg active:scale-95 transition-all"
        >
          Создать
        </button>
      </div>
    </>
  );
};

export default AddChallengePage;
