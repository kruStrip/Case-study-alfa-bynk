import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import KotekImage from '@assets/kotek.png';

interface ChatMessage {
  id: string;
  text: string;
  isMe: boolean;
  time: string;
}

interface ChatWindowProps {
  chat: {
    id: string;
    name: string;
    lastMessage: string;
    time: string;
    unread: boolean;
  };
  onBack: () => void;
  className?: string;
}

/**
 * Компонент окна чата для отображения сообщений и отправки новых.
 */
export function ChatWindow({ chat, onBack, className }: ChatWindowProps) {
  const messages: ChatMessage[] = [
    { id: 'm1', text: 'Привет! Чем могу помочь?', isMe: false, time: '10:35' }
  ];

  return (
    <div className={`bg-white flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10 px-4 py-3 flex items-center shrink-0">
        <Button variant="ghost" size="sm" className="relative p-2 -ml-2" onClick={onBack}>
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900 ml-2">{chat.name}</h1>
      </div>

      {/* Kotek Image */}
      <div className="flex justify-center mt-4">
        <div className="relative w-30 h-30 rounded-full overflow-hidden bg-black flex items-center justify-center">
          <img src={KotekImage} alt="Kotek" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-900">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${message.isMe
                ? 'bg-primary text-white rounded-br-none'
                : 'bg-gray-800 text-black rounded-bl-none shadow-sm border border-gray-700'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs mt-1 opacity-75 text-right">{message.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
