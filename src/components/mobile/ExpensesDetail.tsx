import React, { useState } from 'react';
import { ArrowLeft, Plus, Wallet, Utensils, Car, Smile, ShoppingBag } from 'lucide-react'; // Импорт иконок
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { CategoryExpensesDetail } from './CategoryExpensesDetail'; // Импортируем CategoryExpensesDetail

interface SubCategory {
  id: string;
  name: string;
  percentage: number;
}

interface ExpenseCategory {
  id: string;
  category: string;
  percentage: number;
  color: string;
  icon: React.ElementType; // Добавляем поле для иконки
  subcategories?: SubCategory[];
}

interface ExpensesDetailProps {
  onBack: () => void;
}

/**
 * Компонент мобильного экрана «Детали расходов»
 * @param onBack Функция для возврата на предыдущий экран
 */
export function ExpensesDetail({ onBack }: ExpensesDetailProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryPercentage, setNewCategoryPercentage] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [openCollapsibleId, setOpenCollapsibleId] = useState<string | null>(null);
  const [selectedCategoryForDetail, setSelectedCategoryForDetail] = useState<{ id: string; name: string } | null>(null);

  const [expenses, setExpenses] = useState<ExpenseCategory[]>([
    {
      id: 'all-expenses',
      category: 'Все расходы',
      percentage: 100,
      color: '#6B7280', // Нейтральный серый цвет
      icon: Wallet, // Иконка для всех расходов
      subcategories: [], // Нет подкатегорий для 'Все расходы'
    },
    {
      id: 'cat1',
      category: 'Еда и кафе',
      percentage: 35,
      color: '#EF4444',
      icon: Utensils, // Иконка для Еды и кафе
      subcategories: [
        { id: 'sub1', name: 'Рестораны', percentage: 60 },
        { id: 'sub2', name: 'Продукты', percentage: 40 },
      ],
    },
    {
      id: 'cat2',
      category: 'Транспорт',
      percentage: 20,
      color: '#EC4899',
      icon: Car, // Иконка для Транспорта
      subcategories: [
        { id: 'sub3', name: 'Общественный транспорт', percentage: 70 },
        { id: 'sub4', name: 'Такси', percentage: 30 },
      ],
    },
    {
      id: 'cat3',
      category: 'Развлечения',
      percentage: 25,
      color: '#F59E0B',
      icon: Smile, // Иконка для Развлечений
      subcategories: [
        { id: 'sub5', name: 'Кино', percentage: 50 },
        { id: 'sub6', name: 'Игры', percentage: 50 },
      ],
    },
    {
      id: 'cat4',
      category: 'Покупки',
      percentage: 20,
      color: '#06B6D4',
      icon: ShoppingBag, // Иконка для Покупок
      subcategories: [
        { id: 'sub7', name: 'Одежда', percentage: 60 },
        { id: 'sub8', name: 'Электроника', percentage: 40 },
      ],
    },
  ]);

  /**
   * Обработчик сохранения новой категории расходов
   * Логирует данные и закрывает форму
   */
  const handleSaveNewCategory = () => {
    // В реальном приложении здесь будет логика добавления новой категории в состояние или на сервер
    console.log({
      name: newCategoryName,
      percentage: parseInt(newCategoryPercentage),
      parentCategoryId: selectedCategoryId,
    });
    setIsFormOpen(false); // Восстанавливаем вызов setIsFormOpen
    setNewCategoryName('');
    setNewCategoryPercentage('');
    setSelectedCategoryId(null);
  };

  /**
   * Обработчик отмены добавления новой категории расходов
   * Закрывает форму и сбрасывает поля
   */
  const handleCancelAddCategory = () => {
    setIsFormOpen(false); // Восстанавливаем вызов setIsFormOpen
    setNewCategoryName('');
    setNewCategoryPercentage('');
    setSelectedCategoryId(null);
  };

  const handleCategoryClick = (categoryId: string, categoryName: string) => {
    setSelectedCategoryForDetail({ id: categoryId, name: categoryName });
  };

  const handleBackFromCategoryDetail = () => {
    setSelectedCategoryForDetail(null);
  };

  const categoryColorsMap = expenses.reduce<Record<string, string>>((map, item) => {
    map[item.category] = item.color;
    item.subcategories?.forEach(sub => {
      map[sub.name] = item.color; // Подкатегории наследуют цвет родительской категории
    });
    return map;
  }, {});

  if (selectedCategoryForDetail) {
    return (
      <CategoryExpensesDetail
        categoryId={selectedCategoryForDetail.id}
        categoryName={selectedCategoryForDetail.name}
        onBack={handleBackFromCategoryDetail}
        categoryColorsMap={categoryColorsMap} // Передаем карту цветов
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="flex-1 text-center">
            Детали расходов
          </h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 pb-24">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Категории расходов</h2>
          {/* Dialog for adding a new expense category */}
          <Dialog open={isFormOpen} onOpenChange={(open) => {setIsFormOpen(open); console.log("Dialog open state changed to:", open);}}> 
            {/* Возвращаем asChild и используем компонент Button из ../ui/button.tsx */}
            <DialogTrigger asChild>
              <Button
                variant="ghost" // Используем ghost вариант для иконки
                size="icon"     // Используем icon размер для круглой кнопки
                className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Plus className="w-5 h-5 text-gray-700" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {selectedCategoryId ? 'Добавить подкатегорию' : 'Добавить категорию расходов'}
                </DialogTitle>
                <DialogDescription>
                  {selectedCategoryId 
                    ? 'Введите название и процент для новой подкатегории.' 
                    : 'Введите название и процент для новой категории расходов.'}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoryName" className="text-right">
                    Название
                  </Label>
                  <Input
                    id="categoryName"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoryPercentage" className="text-right">
                    Процент
                  </Label>
                  <Input
                    id="categoryPercentage"
                    type="number"
                    value={newCategoryPercentage}
                    onChange={(e) => setNewCategoryPercentage(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleCancelAddCategory}>
                  Отмена
                </Button>
                <Button onClick={handleSaveNewCategory}>Добавить</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-3">
          {expenses.map((item) => (
            <Collapsible
              key={item.id}
              open={openCollapsibleId === item.id}
              onOpenChange={(isOpen) => setOpenCollapsibleId(isOpen ? item.id : null)}
              className="space-y-3"
            >
              <CollapsibleTrigger asChild>
                <div
                  className="bg-gray-100 rounded-xl p-4 flex items-center justify-between cursor-pointer"
                  onClick={() => handleCategoryClick(item.id, item.category)}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" style={{ color: item.color }} /> {/* Отображаем иконку */}
                    <span className="text-base font-medium">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold">{item.percentage}%</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation(); // Предотвращаем срабатывание CollapsibleTrigger
                        setOpenCollapsibleId(openCollapsibleId === item.id ? null : item.id); // Переключаем состояние Collapsible
                        setSelectedCategoryId(item.id);
                        setIsFormOpen(true);
                      }}
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </Button>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-8 space-y-2">
                {item.subcategories?.map((sub) => (
                  <div
                    key={sub.id}
                    className="bg-gray-50 rounded-lg p-3 flex items-center justify-between text-sm cursor-pointer"
                    onClick={() => handleCategoryClick(sub.id, sub.name)}
                  >
                    <span>{sub.name}</span>
                    <span>{sub.percentage}%</span>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}
