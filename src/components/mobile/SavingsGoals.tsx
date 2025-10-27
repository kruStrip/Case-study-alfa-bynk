import { MessageCircle, Percent, PiggyBank, Coins, HandCoins, Target, Plane, Wallet, Zap, Plus, PawPrint } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import catImage from "@assets/kotek.png";
import React from "react";

interface ExpenseCategory {
  id: string;
  category: string;
  percentage: number;
  color: string;
}

interface Goal {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  progress: number;
  dueDate: string; // Добавляем поле для даты выполнения
}

interface SavingsGoalsProps {
  /**
   * Массив финансовых целей
   */
  goals: Goal[];
  /**
   * Функция для навигации к детальной информации о расходах
   * @param categoryId ID выбранной категории или подкатегории.
   * @param categoryName Название выбранной категории или подкатегории.
   * @param expenseType Тип трат для фильтрации ('all' | 'adequate' | 'impulsive' | 'unspecified').
   */
  onNavigateToExpenses: (categoryId: string, categoryName: string, expenseType: 'all' | 'adequate' | 'impulsive' | 'unspecified') => void;
  onStartChatClick?: () => void; // Добавляем пропс для кнопки 'Начать чат'
  onNavigateToCashbackHistory: () => void; // Добавляем пропс для навигации к истории кэшбэка
  onNavigateToSavingsHistory: () => void; // Добавляем пропс для навигации к истории накопительного счета
  onNavigateToRoundingHistory: () => void; // Добавляем пропс для навигации к истории округления трат
  onNavigateToSelfSavingsHistory: () => void; // Добавляем пропс для навигации к истории личных отложений
  onAddGoalClick: () => void; // Добавляем пропс для навигации к странице добавления цели
}

/**
 * Компонент мобильного экрана «Финансовые цели» с визуализацией накоплений и советами
 */
export function SavingsGoals({ goals, onNavigateToExpenses, onStartChatClick, onNavigateToCashbackHistory, onNavigateToSavingsHistory, onNavigateToRoundingHistory, onNavigateToSelfSavingsHistory, onAddGoalClick }: SavingsGoalsProps) {
  const [expandedGoalId, setExpandedGoalId] = React.useState<string | null>('vacation'); // По умолчанию раскрываем первую цель
  const [isCashbackActivated, setIsCashbackActivated] = React.useState(false);

  const savingsData = [
    {
      label: "Получено с кэшбека",
      amount: "2 450",
      color: "#EF3124",
      icon: Percent,
    },
    {
      label: "Получено с накопительного",
      amount: "8 720",
      color: "#FF6B6B",
      icon: PiggyBank,
    },
    {
      label: "Получено с округления трат",
      amount: "1 230",
      color: "#FFA07A",
      icon: Coins,
    },
    {
      label: "Сколько отложил сам",
      amount: "15 000",
      color: "#FFB347",
      icon: HandCoins,
    },
  ];

  const expensesData: ExpenseCategory[] = [
    {
      id: "food-and-cafe",
      category: "Еда и кафе",
      percentage: 35,
      color: "#EF3124",
    },
    { id: "transport", category: "Транспорт", percentage: 20, color: "#FF6B6B" },
    {
      id: "entertainment",
      category: "Развлечения",
      percentage: 25,
      color: "#FFB347",
    },
    { id: "shopping", category: "Покупки", percentage: 20, color: "#4ECDC4" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* Заголовок удален по запросу пользователя */}

      {/* Scrollable Content */}
      <div className="px-4 pb-24">
        {/* Goal Section */}
        <div className="bg-gray-100 rounded-xl p-4 mt-4">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-white rounded-full p-2">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-center">Цель и сумма</h2>
            </div>
            <button
              onClick={onAddGoalClick}
              className="bg-primary text-white rounded-full p-2 hover:bg-red-700 transition-all"
              aria-label="Добавить цель"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          {goals.map((goal) => {
            // Вычисляем, сколько осталось отложить и сколько месяцев до цели
            const targetDate = new Date(goal.dueDate.split('.').reverse().join('-')); // Преобразуем дату из DD.MM.YYYY в YYYY-MM-DD
            const currentDate = new Date();
            const monthsRemaining = Math.max(0, (targetDate.getFullYear() - currentDate.getFullYear()) * 12 + targetDate.getMonth() - currentDate.getMonth());

            const monthlySavingNeeded = monthsRemaining > 0 ? Math.ceil((goal.targetAmount - goal.currentAmount) / monthsRemaining) : (goal.targetAmount - goal.currentAmount); // Округляем в большую сторону

            return (
              <div key={goal.id} className="bg-white rounded-lg p-4 text-center mt-3 cursor-pointer" onClick={() => setExpandedGoalId(expandedGoalId === goal.id ? null : goal.id)}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <PawPrint className="w-4 h-4 text-gray-600" />
                  <p className="text-gray-600">
                    Накоплено {goal.name}
                  </p>
                </div>
                {expandedGoalId === goal.id && (
                  <>
                    <p className="text-primary">
                      {goal.currentAmount} ₽ из {goal.targetAmount} ₽
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      К {goal.dueDate}
                    </p>
                    {monthsRemaining > 0 && (
                      <p className="text-xs text-gray-600 mt-1">
                        ~{monthlySavingNeeded} ₽/месяц
                      </p>
                    )}
                    <div className="mt-3 bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-500"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Savings Sources Grid */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {savingsData.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl p-4 hover:bg-gray-200 transition-colors cursor-pointer"
              onClick={item.label === "Получено с кэшбека" ? onNavigateToCashbackHistory : item.label === "Получено с накопительного" ? onNavigateToSavingsHistory : item.label === "Получено с округления трат" ? onNavigateToRoundingHistory : item.label === "Сколько отложил сам" ? onNavigateToSelfSavingsHistory : undefined}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-white rounded-full p-2">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-gray-700">
                  {item.label}
                </p>
              </div>
              <p className="text-primary">+{item.amount} ₽</p>
            </div>
          ))}
        </div>

        {/* Expenses Section */}
        <div
          className="bg-gray-100 rounded-xl p-4 mt-4 cursor-pointer"
          onClick={() => onNavigateToExpenses("food-and-cafe", "Еда и кафе", "all")}
        >
          <div className="flex items-center gap-4">
            {/* Circular Chart */}
            <div className="relative size-24 flex-shrink-0">
              <div className="flex items-center justify-center size-full">
<ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expensesData.map(item => ({
                        name: item.category,
                        value: item.percentage
                      }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={45}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {expensesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h3>Расходы</h3>
              <p className="text-sm text-gray-600 mt-1">
                За текущий месяц
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 space-y-2">
            {expensesData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">
                    {item.category}
                  </span>
                </div>
                <span className="text-sm">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Cashback Section */}
        {(() => {
          const mostExpensiveCategory = expensesData.reduce((prev, current) =>
            (prev.percentage > current.percentage) ? prev : current
          );
          return (
            <div className="bg-gray-100 rounded-xl p-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-white rounded-full p-2">
                  <Percent className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm">Персональный кэшбэк</h3>
              </div>
              <p className="text-gray-700">
                Получите 5% кэшбэка в категории "{mostExpensiveCategory.category}" в этом месяце!
              </p>
              <button
                className={isCashbackActivated ? "text-green-600 py-2 rounded-3xl text-sm mt-3 text-left transition-all" : "bg-primary text-white px-4 py-2 rounded-3xl text-sm mt-3 hover:bg-red-700 transition-all"}
                onClick={() => setIsCashbackActivated(true)}
              >
                {isCashbackActivated ? 'Активировано!' : 'Активировать кэшбэк'}
              </button>
            </div>
          );
        })()}

        {/* Spending Analysis */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div
            className="bg-gray-100 rounded-xl p-4 hover:bg-gray-200 transition-colors cursor-pointer"
            onClick={() => onNavigateToExpenses('all-expenses', 'Все расходы', 'adequate')}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-white rounded-full p-2">
                <Wallet className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm">Адекватные траты</h3>
            </div>
            <p className="text-primary">68 450 ₽</p>
            <p className="text-xs text-gray-600 mt-1">
              75% от дохода
            </p>
          </div>
          <div
            className="bg-gray-100 rounded-xl p-4 hover:bg-gray-200 transition-colors cursor-pointer"
            onClick={() => onNavigateToExpenses('all-expenses', 'Все расходы', 'impulsive')}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-white rounded-full p-2">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm">Импульсивные траты</h3>
            </div>
            <p className="text-primary">22 850 ₽</p>
            <p className="text-xs text-gray-600 mt-1">
              25% от дохода
            </p>
          </div>
        </div>

        {/* AI Advisor */}
        <div className="bg-gray-100 rounded-xl p-5 mt-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="rounded-full p-1 w-30 h-30 flex items-center justify-center">
                <img
                  src={catImage}
                  alt="Кот"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Дзынь Ⅰ
              </p>
            </div>
            <div className="flex-1">
              <p className="m-[0px] text-[rgb(255,0,0)] text-[24px]">Дзынь,</p>
              <p className="mb-3">пора остановиться!</p>
              <p className="text-sm text-gray-600">
                Вы тратите 3 200 ₽ в месяц на кофе. Если
                готовить его дома, сэкономите до 2 400 - почти
                10% от вашей цели!
              </p>
            </div>
          </div>
          <div className="text-center">
            <button className="bg-primary text-white px-6 py-2 rounded-3xl hover:bg-red-700 transition-all" onClick={onStartChatClick}>
              Начать чат
            </button>
          </div>
        </div>

        {/* Quick Tips */}
        {/* Блок быстрых советов удален по запросу пользователя */}
      </div>
    </div>
  );
}