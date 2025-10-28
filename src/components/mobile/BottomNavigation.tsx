import { Home, CreditCard, ShoppingBag, Target, MessageCircle, Zap } from 'lucide-react';
import React from "react";

const navItems = [
  { id: 'goals', icon: Target, label: 'Цели' },
  { id: 'expenses', icon: CreditCard, label: 'Расходы' }, // Новая вкладка для расходов
  { id: 'challenges', icon: Zap, label: 'Челленджи' },
  { id: 'chats', icon: MessageCircle, label: 'Чаты' }
];

interface BottomNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  className?: string;
}

export function BottomNavigation({ activeTab = 'goals', onTabChange, className }: BottomNavigationProps) {

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-inset-bottom ${className}`}>
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange?.(item.id)}
              className={`flex flex-col items-center space-y-1 p-2 transition-colors ${
                isActive ? 'text-primary' : 'text-gray-400'
              }`}
            >
              <IconComponent className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
              <span className={`text-xs font-medium ${
                isActive ? 'text-primary' : 'text-gray-400'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 bg-primary rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}