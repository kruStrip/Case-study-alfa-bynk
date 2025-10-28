import React from 'react';
import { ArrowLeft } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ExpenseItem } from '../../types'; // Импортируем тип ExpenseItem

interface CategoryExpensesDetailProps {
  categoryId: string;
  categoryName: string;
  onBack: () => void;
  categoryColorsMap: Record<string, string>; // Новый пропс для карты цветов
  initialExpenseType?: 'all' | 'adequate' | 'impulsive' | 'unspecified'; // Новый опциональный пропс
  expenses: ExpenseItem[]; // Получаем список транзакций через пропсы
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseItem[]>>; // Функция для обновления транзакций
}

/**
 * Компонент для отображения деталей трат по конкретной категории или подкатегории.
 * @param categoryId ID выбранной категории или подкатегории.
 * @param categoryName Название выбранной категории или подкатегории.
 * @param onBack Функция для возврата на предыдущий экран.
 */
export function CategoryExpensesDetail({ categoryId, categoryName, onBack, categoryColorsMap, initialExpenseType, expenses, setExpenses }: CategoryExpensesDetailProps) {
  const [selectedFilterCategory, setSelectedFilterCategory] = React.useState(categoryId);
  const [selectedExpenseType, setSelectedExpenseType] = React.useState< 'all' | 'adequate' | 'impulsive' | 'unspecified' >(initialExpenseType || 'all'); // Инициализируем из пропсов
  const [selectedExpenseForInfo, setSelectedExpenseForInfo] = React.useState<{ id: string; description: string; type: 'adequate' | 'impulsive' | null } | null>(null); // Состояние для информации о расходе
  const [selectedExpenseForCategoryChange, setSelectedExpenseForCategoryChange] = React.useState<{ id: string; category: string } | null>(null); // Новое состояние для изменения категории

  // Здесь будет логика для загрузки и отображения реальных трат по categoryId
  // const [expenses, setExpenses] = React.useState<ExpenseItem[]>(
  //   [
  //     { id: 'exp1', description: 'Покупка кофе', amount: 200, date: '2025-10-26', category: 'Еда и кафе', subcategory: '' , type: 'impulsive' },
  //     { id: 'exp2', description: 'Обед в ресторане', amount: 1200, date: '2025-10-25', category: 'Еда и кафе', subcategory: 'Рестораны', type: 'adequate' },
  //     { id: 'exp3', description: 'Поездка на такси', amount: 500, date: '2025-10-24', category: 'Транспорт', subcategory: 'Такси', type: 'adequate' },
  //     { id: 'exp4', description: 'Неизвестная трата', amount: 100, date: '2025-10-21', category: 'Развлечения', subcategory: '' }, // Трата без указанного типа
  //   ]
  // );

  const filterOptions = [
    { id: 'all-expenses', name: 'Все расходы' }, // Обновленный ID
    { id: 'Еда и кафе', name: 'Еда и кафе' },
    { id: 'Рестораны', name: 'Рестораны' },
    { id: 'Продукты', name: 'Продукты' },
    { id: 'Транспорт', name: 'Транспорт' },
    { id: 'Общественный транспорт', name: 'Общественный транспорт' },
    { id: 'Такси', name: 'Такси' },
  ];

  const expenseTypeFilterOptions = [
    { id: 'all', name: 'Все' },
    { id: 'adequate', name: 'Адекватные траты' },
    { id: 'impulsive', name: 'Импульсивные траты' },
    { id: 'unspecified', name: 'Неразобранные траты' }, // Новый пункт
  ];

  const filteredExpenses = expenses.filter(expense => {
    const matchesCategory = (
      selectedFilterCategory === 'all-expenses' ||
      expense.category === selectedFilterCategory ||
      expense.subcategory === selectedFilterCategory ||
      (selectedFilterCategory === categoryId && (expense.category === categoryName || expense.subcategory === categoryName)) // Если текущая категория страницы выбрана в фильтре
    );

    const matchesType = (
      selectedExpenseType === 'all' ||
      expense.type === selectedExpenseType ||
      (selectedExpenseType === 'unspecified' && !expense.type) // Добавляем логику для 'Неразобранные траты'
    );

    return matchesCategory && matchesType;
  });

  const handleSaveExpenseType = (expenseId: string, type: 'adequate' | 'impulsive') => {
    setExpenses(prevExpenses =>
      prevExpenses.map(expense =>
        expense.id === expenseId ? { ...expense, type } : expense
      )
    );
    setSelectedExpenseForInfo(null);
  };

  const handleSaveCategory = (expenseId: string, newCategory: string) => {
    setExpenses(prevExpenses =>
      prevExpenses.map(expense =>
        expense.id === expenseId ? { ...expense, category: newCategory } : expense
      )
    );
    setSelectedExpenseForCategoryChange(null);
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Content */}
      <div className="px-4 py-4 flex-1 flex flex-col"> {/* Удаляем overflow-hidden */}
        <h2 className="text-lg font-semibold mb-4">Список трат</h2>
        <div className="flex gap-4 pb-4 flex-shrink-0"> {/* Изменяем mb-4 на pb-4 и добавляем flex-shrink-0 */}
          <div >
            <Select onValueChange={setSelectedFilterCategory} value={selectedFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div >
            <Select onValueChange={(value: 'all' | 'adequate' | 'impulsive' | 'unspecified') => setSelectedExpenseType(value)} value={selectedExpenseType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Выберите тип траты" />
              </SelectTrigger>
              <SelectContent>
                {expenseTypeFilterOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <ScrollArea className="flex-1 w-full rounded-md overflow-y-auto mt-4"> {/* Удаляем фиксированную высоту, добавляем flex-1 и overflow-y-auto */}
          <div className="space-y-3 p-4">
            {filteredExpenses.map((expense) => (
              <div
                key={expense.id}
                className="bg-gray-100 rounded-xl p-4 flex flex-col justify-between" // Изменено на flex-col для вертикального стека
              >
                <div className="flex items-center justify-between mb-1"> {/* Верхний ряд: название и сумма */} 
                  <p className="font-medium">{expense.description}</p>
                  <span className="text-base font-semibold">{expense.amount} ₽</span>
                </div>
                <div className="flex items-end justify-between"> {/* Нижний ряд: дата+категория и кнопка */} 
                  <div className="flex items-center gap-2"> {/* Дата и Категория */} 
                    <p style={{ fontSize: '10px' }} className="text-gray-600">{expense.date}</p>
                    {/* Добавляем метку категории/подкатегории с фоном */}
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-medium text-white cursor-pointer"
                      style={{
                        backgroundColor: 
                          expense.category === 'Все расходы' || expense.category === ''
                            ? '#6B7280B3' 
                            : (categoryColorsMap[expense.category] + 'B3') || '#6B7280B3',
                      }}
                      onClick={() => setSelectedExpenseForCategoryChange({ id: expense.id, category: expense.category || '' })}
                    >
                      {expense.category === '' ? 'Неизвестная категория' : expense.category}
                    </span>
                    {expense.type && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium text-white cursor-pointer`}
                        style={{
                          backgroundColor: 
                            expense.type === 'adequate' ? '#22C55E' : '#EF4444',
                        }}
                        onClick={() => setSelectedExpenseForInfo({ id: expense.id, description: expense.description, type: expense.type || null })}
                      >
                        {expense.type === 'adequate' ? 'Адекватная' : 'Импульсивная'}
                      </span>
                    )}
                  </div>
                  {/* Кнопка показывается только если тип траты не определен */}
                  {!expense.type && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedExpenseForInfo({ id: expense.id, description: expense.description, type: expense.type || null })}
                    >
                      Какая это трата?
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <ScrollBar />
        </ScrollArea>

        {/* Кастомный модальный компонент для выбора типа траты */}
        {!!selectedExpenseForInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedExpenseForInfo(null)}>
            <div className="bg-white rounded-lg p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}> {/* Предотвращаем закрытие при клике внутри модального окна */}
              <h2 className="text-xl font-semibold mb-4">{selectedExpenseForInfo?.description}</h2>
              <p className="text-gray-700 mb-4">Выберите тип траты:</p>
              <div className="flex gap-2 mb-6">
                <Button
                  variant={selectedExpenseForInfo?.type === 'adequate' ? 'default' : 'outline'}
                  onClick={() => setSelectedExpenseForInfo(prev => prev ? { ...prev, type: 'adequate' } : null)}
                >
                  Адекватная
                </Button>
                <Button
                  variant={selectedExpenseForInfo?.type === 'impulsive' ? 'default' : 'outline'}
                  onClick={() => setSelectedExpenseForInfo(prev => prev ? { ...prev, type: 'impulsive' } : null)}
                >
                  Импульсивная
                </Button>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedExpenseForInfo(null)}>Отмена</Button>
                <Button onClick={() => {
                  handleSaveExpenseType(selectedExpenseForInfo?.id || '', selectedExpenseForInfo?.type || 'adequate');
                  setSelectedExpenseForInfo(null);
                }}>Сохранить</Button>
              </div>
            </div>
          </div>
        )}

        {/* Кастомный модальный компонент для выбора категории */}
        {!!selectedExpenseForCategoryChange && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedExpenseForCategoryChange(null)}>
            <div className="bg-white rounded-lg p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}> 
              <h2 className="text-xl font-semibold mb-4">Изменить категорию</h2>
              <p className="text-gray-700 mb-4">Выберите новую категорию для {expenses.find(exp => exp.id === selectedExpenseForCategoryChange?.id)?.description}:</p>
              <Select 
                value={selectedExpenseForCategoryChange?.category || ''} 
                onValueChange={(value) => setSelectedExpenseForCategoryChange(prev => prev ? { ...prev, category: value } : null)}
              >
                <SelectTrigger className="w-full mb-4">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.map((option) => (
                    <SelectItem key={option.id} value={option.name}> {/* Используем option.name в качестве value */}
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedExpenseForCategoryChange(null)}>Отмена</Button>
                <Button onClick={() => {
                  if (selectedExpenseForCategoryChange?.id && selectedExpenseForCategoryChange?.category) {
                    handleSaveCategory(selectedExpenseForCategoryChange.id, selectedExpenseForCategoryChange.category);
                  }
                  setSelectedExpenseForCategoryChange(null);
                }}>Сохранить</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
