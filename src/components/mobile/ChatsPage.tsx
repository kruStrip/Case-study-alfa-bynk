import React, { useState, useEffect } from 'react';
import { Search, MessageSquare, PlusCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import catImage from '@assets/kotek.png'; // Импортируем изображение кота
import { ChatWindow } from './ChatWindow'; // Импортируем компонент ChatWindow

interface ChatMessage {
  id: string;
  text: string;
  isMe: boolean;
  time: string;
}

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
  onChatOpened?: () => void;
}

/**
 * Компонент страницы для раздела 'Чаты'.
 * Здесь будет отображаться список чатов или интерфейс чата.
 */
export function ChatsPage({
  onChatWindowOpenChange,
  className,
  initialChatId,
  onChatOpened,
}: ChatsPageProps) {
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const [messages, setMessages] = useState<{ [key: string]: ChatMessage[] }>({
    '3': [
      {
        id: 'm1',
        text: 'Вы тратите 3 200 ₽ в месяц на кофе. Если готовить его дома, сэкономите до 2 400 - почти 10% от вашей цели!',
        isMe: false,
        time: '10:35',
      },
    ],
  });

  // Пример данных для чатов
  const [chatItems, setChatItems] = useState<ChatItem[]>([
    {
      id: '3',
      name: 'Пора остановиться!',
      lastMessage: 'Вы тратите 3 200 ₽ в месяц на кофе.',
      time: 'Пн',
      unread: true,
    },
  ]);

  useEffect(() => {
    if (initialChatId) {
      if (initialChatId === 'new_coffee_chat') {
        let chat = chatItems.find((c) => c.name === 'Пора остановиться!');
        if (!chat) {
          const newChatId = (chatItems.length + 1).toString();
          const newChat: ChatItem = {
            id: newChatId,
            name: 'Пора остановиться!',
            lastMessage:
              'Вы тратите 3 200 ₽ в месяц на кофе. Если готовить его дома, сэкономите до 2 400 - почти 10% от вашей цели!',
            time: new Date().toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            unread: true,
          };
          setChatItems((prev) => [...prev, newChat]);
          setMessages((prev) => ({
            ...prev,
            [newChatId]: [
              {
                id: `msg-${Date.now()}`,
                text: 'Вы тратите 3 200 ₽ в месяц на кофе. Если готовить его дома, сэкономите до 2 400 - почти 10% от вашей цели!',
                isMe: false,
                time: new Date().toLocaleTimeString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
              },
            ],
          }));
          setSelectedChat(newChat);
          onChatWindowOpenChange(true);
        } else {
          setSelectedChat(chat);
          onChatWindowOpenChange(true);
        }
        onChatOpened?.();
      } else {
        const chatToOpen = chatItems.find((chat) => chat.id === initialChatId);
        if (chatToOpen) {
          setSelectedChat(chatToOpen);
          onChatWindowOpenChange(true);
          onChatOpened?.();
        }
      }
    }
  }, [initialChatId, onChatWindowOpenChange, chatItems, onChatOpened]);

  const handleChatClick = (chat: ChatItem) => {
    setSelectedChat(chat);
    onChatWindowOpenChange(true); // Сообщаем родительскому компоненту, что окно чата открыто
  };

  const handleBackFromChat = () => {
    setSelectedChat(null);
    onChatWindowOpenChange(false); // Сообщаем родительскому компоненту, что окно чата закрыто
  };

  const handleCreateNewChat = () => {
    const newChatId = `chat_${Date.now()}`;
    const newChat: ChatItem = {
      id: newChatId,
      name: `Новый диалог`,
      lastMessage: 'Привет! 😊 Как я могу помочь тебе сегодня?',
      time: new Date().toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      unread: false,
    };

    setChatItems(prev => [newChat, ...prev]);
    setMessages(prev => ({
      ...prev,
      [newChatId]: [
        {
          id: `msg_${Date.now()}`,
          text: 'Привет! 😊 Как я могу помочь тебе сегодня? Есть вопросы или задачи, которые ты хочешь обсудить?',
          isMe: false,
          time: newChat.time,
        },
      ],
    }));
    setSelectedChat(newChat);
    onChatWindowOpenChange(true);
  };

  const handleSendMessage = (
    chatId: string,
    text: string,
    isMe: boolean = true
  ) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random()}`,
      text,
      isMe,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages(prevMessages => ({
      ...prevMessages,
      [chatId]: [...(prevMessages[chatId] || []), newMessage],
    }));
  };

  if (selectedChat) {
    return (
      <ChatWindow
        chat={selectedChat}
        messages={messages[selectedChat.id] || []}
        onBack={handleBackFromChat}
        onSendMessage={handleSendMessage}
        className="h-full"
      />
    );
  }

  return (
    <div className={`flex-1 flex flex-col ${className}`}>
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Чаты</h1>
          <Button variant="ghost" className="relative flex items-center justify-center w-9 h-8" onClick={handleCreateNewChat}>
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
