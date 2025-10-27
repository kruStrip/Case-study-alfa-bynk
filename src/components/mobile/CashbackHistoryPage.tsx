import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CashbackHistoryPageProps {
  onBack: () => void;
}

/**
 * Компонент страницы для отображения истории начислений кэшбэка.
 * @param onBack Функция для возврата на предыдущий экран.
 */
export function CashbackHistoryPage({ onBack }: CashbackHistoryPageProps) {
  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10 px-4 py-3 flex items-center">
        <Button variant="ghost" size="sm" className="relative p-2 -ml-2" onClick={onBack}>
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900 ml-2">История кэшбэка</h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <p className="text-gray-700">Здесь будет отображаться детальная история ваших начислений кэшбэка.</p>
        {/* Здесь можно добавить логику для загрузки и отображения реальных данных */}
        <div className="mt-4 space-y-3">
          {/* Пример элемента истории кэшбэка */}
          <div className="bg-gray-100 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <p className="font-medium">Начисление кэшбэка за покупки</p>
              <span className="text-green-600 font-semibold">+ 150 ₽</span>
            </div>
            <p className="text-sm text-gray-600">25 октября 2025 г.</p>
          </div>
          <div className="bg-gray-100 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <p className="font-medium">Специальное предложение</p>
              <span className="text-green-600 font-semibold">+ 50 ₽</span>
            </div>
            <p className="text-sm text-gray-600">20 октября 2025 г.</p>
          </div>
          <div className="bg-gray-100 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <p className="font-medium">Начисление за категорию "Еда"</p>
              <span className="text-green-600 font-semibold">+ 100 ₽</span>
            </div>
            <p className="text-sm text-gray-600">18 октября 2025 г.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
