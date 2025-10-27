import { Bell } from 'lucide-react';
import { Button } from '../ui/button';
import React from "react";

export function MobileHeader() {
  return (
    <header className="bg-white px-6 py-4 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">А</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Альфа-Сфера</h1>
        </div>
        
        <Button variant="ghost" size="sm" className="relative p-2">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
      </div>
    </header>
  );
}