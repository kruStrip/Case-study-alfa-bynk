import React, { useState } from 'react';
import { ArrowLeft, Target } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface AddGoalPageProps {
  /**
   * Функция для возврата на предыдущую страницу
   */
  onBack: () => void;
  /**
   * Функция для добавления новой цели
   */
  onAddGoal: (name: string, targetAmount: number, dueDate: string) => void;
}

/**
 * Компонент страницы добавления новой финансовой цели
 */
export function AddGoalPage({ onBack, onAddGoal }: AddGoalPageProps) {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Обрабатывает создание новой цели
  const handleSubmit = () => {
    if (!goalName || !targetAmount || !dueDate) return;

    // Конвертируем дату из формата YYYY-MM-DD в DD.MM.YYYY
    const dateParts = dueDate.split('-');
    const formattedDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;

    onAddGoal(goalName, parseFloat(targetAmount), formattedDate);
    onBack();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Назад"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold">Новая цель</h1>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <div className="bg-gray-100 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary rounded-full p-4">
              <Target className="w-8 h-8 text-white" />
            </div>
          </div>
          <p className="text-center text-gray-600">
            Создайте новую финансовую цель и начните откладывать на нее средства
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="goal-name" className="text-base">
              Название цели
            </Label>
            <Input
              id="goal-name"
              placeholder="Например: На отпуск"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal-amount" className="text-base">
              Целевая сумма (₽)
            </Label>
            <Input
              id="goal-amount"
              type="number"
              placeholder="50000"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal-date" className="text-base">
              Срок выполнения
            </Label>
            <Input
              id="goal-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="h-12 text-base"
            />
          </div>
        </div>

        <div className="mt-32">
          <Button
            onClick={handleSubmit}
            disabled={!goalName || !targetAmount || !dueDate}
            className="w-full h-12 bg-primary hover:bg-red-700 text-base"
          >
            Создать цель
          </Button>
        </div>
      </div>
    </div>
  );
}

