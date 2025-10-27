import React, { useState, useEffect } from 'react';
import { Search, MessageSquare, PlusCircle, Send } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import catImage from '@assets/kotek.png'; // Импортируем изображение кота
import { ChatWindow } from './ChatWindow'; // Импортируем компонент ChatWindow

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

interface ChatsPageProps {
  // Определите любые необходимые пропсы здесь
  /**
   * Callback-функция, которая вызывается при изменении состояния открытия/закрытия окна чата.
   * @param isOpen true, если окно чата открыто, false, если закрыто.
   */
  onChatWindowOpenChange: (isOpen: boolean) => void;
  className?: string; // Добавляем пропс className
  initialChatId?: string; // Новый пропс для открытия конкретного чата
}

/**
 * Компонент страницы для раздела 'Чаты'.
 * Здесь будет отображаться список чатов или интерфейс чата.
 */
export function ChatsPage({ onChatWindowOpenChange, className, initialChatId }: ChatsPageProps) {
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);

  // Пример данных для чатов
  const chatItems: ChatItem[] = [
    {
      id: '3',
      name: 'Дзынь',
      lastMessage: 'Вы откладываете 15% дохода!',
      time: 'Пн',
      unread: true,
    },
  ];

  useEffect(() => {
    if (initialChatId) {
      const chatToOpen = chatItems.find(chat => chat.id === initialChatId);
      if (chatToOpen) {
        setSelectedChat(chatToOpen);
        onChatWindowOpenChange(true);
      }
    }
  }, [initialChatId, chatItems, onChatWindowOpenChange]);

  const handleChatClick = (chat: ChatItem) => {
    setSelectedChat(chat);
    onChatWindowOpenChange(true); // Сообщаем родительскому компоненту, что окно чата открыто
  };

  const handleBackFromChat = () => {
    setSelectedChat(null);
    onChatWindowOpenChange(false); // Сообщаем родительскому компоненту, что окно чата закрыто
  };

  if (selectedChat) {
    return (
      <>
        <div className="h-full pb-28">
          <ChatWindow chat={selectedChat} onBack={handleBackFromChat} className="h-full" />
        </div>
        {/* Message Input - fixed позиционирование внизу над навигацией */}
        <div style={{ bottom: '64px' }} className="fixed left-0 right-0 max-w-sm mx-auto bg-white border-t border-gray-200 p-4 flex items-center space-x-3 z-40">
          <Input
            placeholder="Написать сообщение..."
            className="flex-1 px-4 py-2 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-primary focus:ring-offset-0"
          />
          <Button className="bg-primary hover:bg-red-700 rounded-full relative flex items-center justify-center w-8 h-8">
            <Send className="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </Button>
        </div>
      </>
    );
  }

  return (
    <div className={`flex-1 flex flex-col ${className}`}>
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Чаты</h1>
          <Button variant="ghost" className="relative flex items-center justify-center w-9 h-8">
            <PlusCircle className="w-6 h-6 text-gray-600" />
          </Button>
        </div>
        <div className="mt-3 mb-4 relative">
          <Input
            placeholder="  Поиск по чатам"
            className="pl-10 pr-3 py-2 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-primary focus:ring-offset-0"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Chat List */}
      <div className="px-4 py-3 space-y-2 ">
        {chatItems.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleChatClick(chat)}
            className="flex items-center p-3 bg-gray-100 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex-shrink-0 relative">
              <img
                src={catImage}
                alt="Аватар чата"
                className="w-10 h-10 rounded-full object-cover"
              />
              {chat.unread && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold text-gray-800">{chat.name}</p>
              <p className="text-xs text-gray-600 truncate">{chat.lastMessage}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">{chat.time}</p>
              {chat.unread && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 mt-1 text-xs font-semibold leading-none text-white bg-red-500 rounded-full">
                  1
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
