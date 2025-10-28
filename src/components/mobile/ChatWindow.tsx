import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Bot, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';
import KotekImage from '@assets/kotek.png';
import OpenAI from 'openai';

const apiKey =
  'io-v2-eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6IjI0Y2NhYjY4LTdjNzEtNGU5OC05Njg4LWVjZGI1NGUwOWFlZCIsImV4cCI6NDkxNTI0OTc5OH0.ilXvEHapTJXofCXob_WsQSgOxAXy4DRfRNmhbHXTuvZ-waJ1oz32s6EhWM2KUuuPV3cg1ow0dtbSGUOnOz2Dwg';

const openai = new OpenAI({
  baseURL: 'https://api.intelligence.io.solutions/api/v1',
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

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
  messages: ChatMessage[];
  onBack: () => void;
  onSendMessage: (chatId: string, text: string, isMe?: boolean) => void;
  className?: string;
}

/**
 * Компонент окна чата для отображения сообщений и отправки новых.
 */
export function ChatWindow({
  chat,
  messages,
  onBack,
  onSendMessage,
  className,
}: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('');
  const [models, setModels] = useState<{ id: string }[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    /**
     * Загружает список доступных моделей AI.
     */
    const fetchModels = async () => {
      try {
        const modelsList = await openai.models.list();
        const availableModels = modelsList.data.map((model) => ({
          id: model.id,
        }));
        setModels(availableModels);
        if (availableModels.length > 0) {
          setSelectedModel(availableModels[0].id);
        }
      } catch (error) {
        console.error('Ошибка при загрузке моделей:', error);
      }
    };

    fetchModels();
  }, []);

  /**
   * Обработчик отправки сообщения.
   * Вызывает колбэк onSendMessage для отправки данных в родительский компонент.
   * Очищает поле ввода после отправки.
   * Отправляет сообщение AI и получает ответ.
   */
  const handleSendMessage = async (e: React.FormEvent, text: string = newMessage) => {
    e.preventDefault();
    if (text.trim() === '' || !selectedModel) return;

    onSendMessage(chat.id, text, true);
    setNewMessage('');
    setIsLoading(true);

    const apiMessages = messages.map((msg) => ({
      role: msg.isMe ? ('user' as const) : ('assistant' as const),
      content: msg.text,
    }));
    apiMessages.push({ role: 'user', content: text });

    try {
      const completion = await openai.chat.completions.create({
        model: selectedModel,
        messages: apiMessages,
      });

      const aiResponse = completion.choices[0].message.content;
      if (aiResponse) {
        onSendMessage(chat.id, aiResponse, false);
      }
    } catch (error) {
      console.error('Ошибка при отправке сообщения AI:', error);
      onSendMessage(
        chat.id,
        'Извините, произошла ошибка при ответе.',
        false
      );
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    'Расскажи о моих тратах',
    'Как сэкономить?',
    'Дай совет по накоплениям',
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
      <div className="flex flex-col items-center mt-4">
        <div className="relative w-30 h-30 rounded-full overflow-hidden bg-black flex items-center justify-center">
          <img src={KotekImage} alt="Kotek" className="w-full h-full object-cover" />
        </div>
        <p className="mt-2 text-lg font-semibold text-gray-800">Дзынь Ⅰ</p>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-40">
        {messages.map((message) => {
          return (
            <div
              key={message.id}
              className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.isMe
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-white text-black rounded-bl-none shadow-sm'
                }`}
              >
                <div className="text-sm prose">
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
                <p className="text-xs mt-1 opacity-75 text-right">
                  {message.time}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input & Suggestions */}
      <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-white z-20">
        <div className="px-4 pt-2">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage({ preventDefault: () => {} } as React.FormEvent, suggestion)}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-sm hover:bg-gray-200 transition"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
        <form
          onSubmit={(e) => handleSendMessage(e, newMessage)}
          className="border-t border-gray-200 p-4 flex items-center"
        >
          <Select onValueChange={setSelectedModel} defaultValue={selectedModel}>
            <SelectTrigger className="w-12 p-2 mr-2">
              <Bot className="w-5 h-5" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input
            type="text"
            placeholder="Написать сообщение..."
            className="flex-1 mr-2 bg-gray-100 border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button
            type="submit"
            size="icon"
            className="flex-shrink-0 bg-primary text-white"
            disabled={!newMessage.trim() || isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
