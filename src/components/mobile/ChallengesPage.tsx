// src/components/mobile/ChallengesPage.tsx
import React from 'react';
import { Plus } from 'lucide-react'; // Импорт иконки Plus
import { Button } from '../ui/button'; // Импорт компонента Button
import { Challenge } from '../../types'; // Импорт типа Challenge

interface ChallengesPageProps {
  onAddChallengeClick: () => void;
  challenges: Challenge[]; // Список челленджей
}

// Компонент страницы "Челленджи", где будет отображаться список всех созданных челленджей пользователя.
const ChallengesPage: React.FC<ChallengesPageProps> = ({ onAddChallengeClick, challenges }) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Мои Челленджи</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={onAddChallengeClick}
          className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Plus className="w-5 h-5 text-gray-700" />
        </Button>
      </div>
      {challenges.length === 0 ? (
        <p>Пока нет активных челленджей. Начните новый!</p>
      ) : (
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">{challenge.name}</h2>
              <p>Срок: {challenge.durationDays} дней</p>
              <p>Статус: {challenge.status}</p>
              <p>Прогресс: {challenge.progress}%</p>
              <p>Начало: {challenge.startDate}</p>
              <p>Окончание: {challenge.endDate}</p>
              {/* Здесь можно добавить дополнительную информацию о связанных транзакциях */}
            </div>
          ))}
        </div>
      )}
      {/* Кнопка для создания нового челленджа */}
      <button onClick={onAddChallengeClick} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Создать новый челлендж
      </button>
    </div>
  );
};

export default ChallengesPage;
