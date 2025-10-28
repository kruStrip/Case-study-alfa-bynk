import React, { useState } from 'react';
import { MobileHeader } from './components/mobile/MobileHeader';
import { BottomNavigation } from './components/mobile/BottomNavigation';
import { TransferFrame } from './components/mobile/TransferFrame';
import { SavingsGoals } from './components/mobile/SavingsGoals';
import { ExpensesDetail } from './components/mobile/ExpensesDetail'; // Импорт нового компонента
import { ChatsPage } from './components/mobile/ChatsPage'; // Импорт нового компонента ChatsPage
import { CategoryExpensesDetail } from './components/mobile/CategoryExpensesDetail'; // Импорт нового компонента
import { CashbackHistoryPage } from './components/mobile/CashbackHistoryPage'; // Импорт нового компонента
import { SavingsHistoryPage } from './components/mobile/SavingsHistoryPage'; // Импорт нового компонента
import { RoundingHistoryPage } from './components/mobile/RoundingHistoryPage'; // Импорт нового компонента
import { SelfSavingsHistoryPage } from './components/mobile/SelfSavingsHistoryPage'; // Импорт нового компонента
import { AddGoalPage } from './components/mobile/AddGoalPage'; // Импорт страницы добавления цели
import ChallengesPage from './components/mobile/ChallengesPage'; // Импорт страницы челленджей
import AddChallengePage from './components/mobile/AddChallengePage'; // Импорт страницы добавления челленджа
import { Challenge, ExpenseItem } from './types'; // Импорт типов Challenge и ExpenseItem

export default function App() {
  // Устанавливает текущий экран приложения. Изначально это может быть 'main' (главная страница), 'transfer' (перевод средств) или 'goals' (цели сбережений).
  const [currentScreen, setCurrentScreen] = useState<'transfer' | 'goals' | 'chats' | 'expenses' | 'cashbackHistory' | 'savingsHistory' | 'roundingHistory' | 'selfSavingsHistory' | 'addGoal' | 'challenges' | 'addChallenge'>('goals');
  // Отслеживает активную вкладку в нижней навигации. Изначально установлена на 'goals' (цели).
  const [activeTab, setActiveTab] = useState('goals');
  // Отслеживает, открыто ли окно чата. Изначально false.
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);
  const [selectedCategoryForDetail, setSelectedCategoryForDetail] = useState<{ id: string; name: string; expenseType?: 'all' | 'adequate' | 'impulsive' | 'unspecified' } | null>(null);
  const [initialChatToOpen, setInitialChatToOpen] = useState<string | undefined>(undefined); // Исправлено на undefined
  
  // State для хранения финансовых целей
  const [goals, setGoals] = useState([
    {
      id: 'vacation',
      name: 'На отпуск',
      currentAmount: 27400,
      targetAmount: 50000,
      progress: 54.8,
      dueDate: '31.12.2025',
    },
    {
      id: 'car',
      name: 'На новую машину',
      currentAmount: 150000,
      targetAmount: 1000000,
      progress: 15,
      dueDate: '31.12.2026',
    },
    {
      id: 'education',
      name: 'На образование',
      currentAmount: 50000,
      targetAmount: 200000,
      progress: 25,
      dueDate: '31.12.2025',
    },
  ]);

  // State для хранения челленджей
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  // State для хранения транзакций
  const [expenses, setExpenses] = useState<ExpenseItem[]>(
    [
      { id: 'exp1', description: 'Покупка кофе', amount: 200, date: '2025-10-26', category: 'Еда и кафе', subcategory: '' , type: 'impulsive' },
      { id: 'exp2', description: 'Обед в ресторане', amount: 1200, date: '2025-10-25', category: 'Еда и кафе', subcategory: 'Рестораны', type: 'adequate' },
      { id: 'exp3', description: 'Поездка на такси', amount: 500, date: '2025-10-24', category: 'Транспорт', subcategory: 'Такси', type: 'adequate' },
      { id: 'exp4', description: 'Неизвестная трата', amount: 100, date: '2025-10-21', category: 'Развлечения', subcategory: '' }, // Трата без указанного типа
    ]
  );

  const categoryColorsMap: Record<string, string> = {
    'Еда и кафе': '#EF4444',
    'Транспорт': '#EC4899',
    'Развлечения': '#FACC15',
    'Покупки': '#34D399',
    'Неизвестная категория': '#6B7280',
  };

  // Обрабатывает изменение активной вкладки в нижней навигации.
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setInitialChatToOpen(undefined); // Сброс при смене вкладки на undefined
    if (tab === 'goals') {
      setCurrentScreen('goals');
      // Сбросить выбранные расходы при переходе на вкладку целей
    } else if (tab === 'chats') { // Добавляем обработку для вкладки 'chats'
      setCurrentScreen('chats');
      // Сбросить выбранные расходы при переходе на вкладку чатов
    } else if (tab === 'expenses') {
      setCurrentScreen('expenses');
      setSelectedCategoryForDetail({ id: 'all-expenses', name: 'Все расходы', expenseType: 'all' }); // Устанавливаем значение по умолчанию для "Всех расходов"
    } else if (tab === 'challenges') { // Добавляем обработку для вкладки 'challenges'
      setCurrentScreen('challenges');
    }
  };

  // Обрабатывает возвращение из экрана деталей расходов.
  const handleBackFromExpenses = () => {
    setCurrentScreen('goals'); // Возвращаемся на экран целей или другой дефолтный экран
  };

  const handleStartChat = () => {
    setCurrentScreen('chats');
    setActiveTab('chats');
    setInitialChatToOpen('new_coffee_chat'); // Устанавливаем ID чата 'Дзынь I'
  };

  const handleNavigateToExpenses = (categoryId: string, categoryName: string, expenseType: 'all' | 'adequate' | 'impulsive' | 'unspecified') => {
    setSelectedCategoryForDetail({ id: categoryId, name: categoryName, expenseType });
    setCurrentScreen('expenses');
  };

  const handleNavigateToCashbackHistory = () => {
    setCurrentScreen('cashbackHistory');
  };

  const handleNavigateToSavingsHistory = () => {
    setCurrentScreen('savingsHistory');
  };

  const handleNavigateToRoundingHistory = () => {
    setCurrentScreen('roundingHistory');
  };

  const handleNavigateToSelfSavingsHistory = () => {
    setCurrentScreen('selfSavingsHistory');
  };

  const handleNavigateToAddGoal = () => {
    setCurrentScreen('addGoal');
  };

  // Обрабатывает добавление новой финансовой цели
  const handleAddGoal = (name: string, targetAmount: number, dueDate: string) => {
    const newGoal = {
      id: Date.now().toString(),
      name,
      currentAmount: 0,
      targetAmount,
      progress: 0,
      dueDate,
    };
    setGoals([...goals, newGoal]);
  };

  // Обрабатывает добавление нового челленджа
  const handleAddChallenge = (name: string, durationDays: number, relatedTransactions: ExpenseItem[]) => {
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + durationDays);

    const newChallenge: Challenge = {
      id: Date.now().toString(),
      name,
      durationDays,
      startDate,
      endDate: endDate.toISOString().split('T')[0],
      relatedTransactions,
      status: 'active',
      progress: 0,
    };
    setChallenges([...challenges, newChallenge]);
    setCurrentScreen('challenges'); // После создания возвращаемся на страницу со списком челленджей
  };

  // Если текущий экран — 'addGoal', отображает компонент AddGoalPage.
  if (currentScreen === 'addGoal') {
    return (
      <div className="min-h-screen bg-white max-w-sm mx-auto relative transition-opacity duration-300">
        <AddGoalPage
          onBack={() => setCurrentScreen('goals')}
          onAddGoal={handleAddGoal}
        />
      </div>
    );
  }

  // Если текущий экран — 'challenges', отображает компонент ChallengesPage.
  if (currentScreen === 'challenges') {
    return (
      <div className="bg-white min-h-screen max-w-sm mx-auto relative transition-opacity duration-300">
        <ChallengesPage onAddChallengeClick={() => setCurrentScreen('addChallenge')} challenges={challenges} />
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  // Если текущий экран — 'addChallenge', отображает компонент AddChallengePage.
  if (currentScreen === 'addChallenge') {
    return (
      <div className="bg-white min-h-screen max-w-sm mx-auto relative transition-opacity duration-300">
        <AddChallengePage
          onBack={() => setCurrentScreen('challenges')}
          onAddChallenge={handleAddChallenge}
          availableExpenses={expenses} // Передаем доступные транзакции
          activeTab={activeTab} // Передаем activeTab
          onTabChange={handleTabChange} // Передаем onTabChange
        />
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  // Если текущий экран — 'transfer', отображает компонент TransferFrame.
  if (currentScreen === 'transfer') {
    return (
      <div className="min-h-screen bg-gray-50 max-w-sm mx-auto relative transition-opacity duration-300">
        <TransferFrame onBack={() => {
          setCurrentScreen('goals');
          setActiveTab('goals');
        }} />
      </div>
    );
  }

  // Если текущий экран — 'expenses', отображает компонент ExpensesDetail.
  if (currentScreen === 'expenses' && selectedCategoryForDetail) {
    return (
      <div className="bg-white min-h-screen max-w-sm mx-auto relative transition-opacity duration-300">
        <CategoryExpensesDetail
          categoryId={selectedCategoryForDetail.id}
          categoryName={selectedCategoryForDetail.name}
          onBack={() => setSelectedCategoryForDetail(null)}
          categoryColorsMap={categoryColorsMap}
          initialExpenseType={selectedCategoryForDetail.expenseType || 'all'}
          expenses={expenses} // Передаем список транзакций
          setExpenses={setExpenses} // Передаем функцию для обновления транзакций
        />
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} className="absolute bottom-0 left-0 right-0" />
      </div>
    );
  }

  // Если текущий экран — 'goals', отображает компонент SavingsGoals.
  if (currentScreen === 'goals') {
    return (
      <div className="bg-white min-h-screen max-w-sm mx-auto relative transition-opacity duration-300">
        <SavingsGoals 
          goals={goals}
          onNavigateToExpenses={handleNavigateToExpenses} 
          onStartChatClick={() => {
            setInitialChatToOpen('new');
            setCurrentScreen('chats');
            setActiveTab('chats');
          }} 
          onNavigateToCashbackHistory={handleNavigateToCashbackHistory} 
          onNavigateToSavingsHistory={handleNavigateToSavingsHistory} 
          onNavigateToRoundingHistory={handleNavigateToRoundingHistory} 
          onNavigateToSelfSavingsHistory={handleNavigateToSelfSavingsHistory}
          onAddGoalClick={handleNavigateToAddGoal}
        />
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  // Если текущий экран — 'chats', отображает компонент ChatsPage.
  if (currentScreen === 'chats') {
    return (
      <div className="max-w-sm mx-auto relative flex flex-col h-screen transition-opacity duration-300">
        <div className={`flex-1 ${!isChatWindowOpen ? 'pb-16' : ''} overflow-hidden`}>
          <ChatsPage
            onChatWindowOpenChange={setIsChatWindowOpen}
            initialChatId={initialChatToOpen}
            className="h-full"
            onChatOpened={() => setInitialChatToOpen(undefined)}
          />
        </div>
        {!isChatWindowOpen && <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} className="absolute bottom-0 left-0 right-0" />}
      </div>
    );
  }

  // Если текущий экран — 'cashbackHistory', отображает компонент CashbackHistoryPage.
  if (currentScreen === 'cashbackHistory') {
    return (
      <div className="bg-white min-h-screen max-w-sm mx-auto relative transition-opacity duration-300">
        <CashbackHistoryPage onBack={() => setCurrentScreen('goals')} />
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} className="absolute bottom-0 left-0 right-0" />
      </div>
    );
  }

  // Если текущий экран — 'savingsHistory', отображает компонент SavingsHistoryPage.
  if (currentScreen === 'savingsHistory') {
    return (
      <div className="bg-white min-h-screen max-w-sm mx-auto relative transition-opacity duration-300">
        <SavingsHistoryPage onBack={() => setCurrentScreen('goals')} />
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} className="absolute bottom-0 left-0 right-0" />
      </div>
    );
  }

  // Если текущий экран — 'roundingHistory', отображает компонент RoundingHistoryPage.
  if (currentScreen === 'roundingHistory') {
    return (
      <div className="bg-white min-h-screen max-w-sm mx-auto relative transition-opacity duration-300">
        <RoundingHistoryPage onBack={() => setCurrentScreen('goals')} />
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} className="absolute bottom-0 left-0 right-0" />
      </div>
    );
  }

  // Если текущий экран — 'selfSavingsHistory', отображает компонент SelfSavingsHistoryPage.
  if (currentScreen === 'selfSavingsHistory') {
    return (
      <div className="bg-white min-h-screen max-w-sm mx-auto relative transition-opacity duration-300">
        <SelfSavingsHistoryPage onBack={() => setCurrentScreen('goals')} />
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} className="absolute bottom-0 left-0 right-0" />
      </div>
    );
  }

  // Если ни один из вышеперечисленных экранов не активен, отображает главную страницу с MobileHeader, QuickActions, BalanceOverview, AccountsList, OffersSection и BottomNavigation.
  return null;
}