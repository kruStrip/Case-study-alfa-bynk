import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SavingsHistoryPageProps {
  onBack: () => void;
}

/**
 * Компонент страницы для отображения истории начислений с накопительного счета.
 * @param onBack Функция для возврата на предыдущий экран.
 */
export function SavingsHistoryPage({ onBack }: SavingsHistoryPageProps) {
  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10 px-4 py-3 flex items-center">
        <Button variant="ghost" size="sm" className="relative p-2 -ml-2" onClick={onBack}>
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900 ml-2">История накопительного счета</h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <p className="text-gray-700">Здесь будет отображаться детальная история ваших начислений с накопительного счета.</p>
        {/* Здесь можно добавить логику для загрузки и отображения реальных данных */}
        <div className="mt-4 space-y-3">
          {/* Пример элемента истории */}
          <div className="bg-gray-100 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <p className="font-medium">Процентный доход</p>
              <span className="text-green-600 font-semibold">+ 800 ₽</span>
            </div>
            <p className="text-sm text-gray-600">26 октября 2025 г.</p>
          </div>
          <div className="bg-gray-100 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <p className="font-medium">Пополнение счета</p>
              <span className="text-green-600 font-semibold">+ 5 000 ₽</span>
            </div>
            <p className="text-sm text-gray-600">20 октября 2025 г.</p>
          </div>
          <div className="bg-gray-100 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <p className="font-medium">Процентный доход</p>
              <span className="text-green-600 font-semibold">+ 100 ₽</span>
            </div>
            <p className="text-sm text-gray-600">18 октября 2025 г.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
