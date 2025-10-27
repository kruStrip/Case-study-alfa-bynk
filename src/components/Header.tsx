import React from "react";
import { Bell, User, Menu } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">Α</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Альфа-Сфера</h1>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-600 hover:text-primary transition-colors">Главная</a>
          <a href="#" className="text-gray-600 hover:text-primary transition-colors">Счета</a>
          <a href="#" className="text-gray-600 hover:text-primary transition-colors">Контрагенты</a>
          <a href="#" className="text-gray-600 hover:text-primary transition-colors">Переводы</a>
          <a href="#" className="text-gray-600 hover:text-primary transition-colors">Аналитика</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
          </Button>
          
          <Button variant="ghost" size="sm">
            <User className="w-5 h-5 text-gray-600" />
          </Button>
          
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </header>
  );
}