import { Bell, ArrowLeft } from 'lucide-react'; // Импорт иконки ArrowLeft
import { Button } from '../ui/button';
import React from "react";

interface MobileHeaderProps {
  title: string;
  onBack?: () => void;
  showBell?: boolean;
}

export function MobileHeader({ title, onBack, showBell = true }: MobileHeaderProps) {
  return (
    <header className="bg-white px-4 py-4 border-b border-gray-100"> {/* Изменено px-6 на px-4 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {onBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </Button>
          )}
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>
        
        {showBell && (
          <Button variant="ghost" size="sm" className="relative p-2">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
        )}
      </div>
    </header>
  );
}