import React from "react";
import { Card } from './ui/card';
import { TrendingUp, TrendingDown, CreditCard, Building2 } from 'lucide-react';

const mockAccounts = [
  {
    id: 1,
    bank: 'Сбербанк',
    accountNumber: '•••• 1234',
    balance: 1250000,
    currency: '₽',
    change: +15000,
    type: 'Расчетный счет'
  },
  {
    id: 2,
    bank: 'ВТБ',
    accountNumber: '•••• 5678',
    balance: 890000,
    currency: '₽',
    change: -25000,
    type: 'Корпоративный счет'
  },
  {
    id: 3,
    bank: 'Райффайзенбанк',
    accountNumber: '•••• 9012',
    balance: 2100000,
    currency: '₽',
    change: +75000,
    type: 'Депозитный счет'
  }
];

export function Dashboard() {
  const totalBalance = mockAccounts.reduce((sum, account) => sum + account.balance, 0);
  const totalChange = mockAccounts.reduce((sum, account) => sum + account.change, 0);

  return (
    <div className="space-y-6">
      {/* Общий баланс */}
      <Card className="p-6 bg-gradient-to-br from-primary to-red-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-100 text-sm">Общий баланс</p>
            <p className="text-3xl font-bold">
              {totalBalance.toLocaleString('ru-RU')} ₽
            </p>
            <div className="flex items-center mt-2">
              {totalChange >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm">
                {totalChange >= 0 ? '+' : ''}{totalChange.toLocaleString('ru-RU')} ₽ за месяц
              </span>
            </div>
          </div>
          <div className="text-right">
            <CreditCard className="w-12 h-12 text-red-200" />
          </div>
        </div>
      </Card>

      {/* Счета по банкам */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockAccounts.map((account) => (
          <Card key={account.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-medium text-gray-900">{account.bank}</p>
                <p className="text-sm text-gray-500">{account.type}</p>
              </div>
              <Building2 className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600">{account.accountNumber}</p>
              <p className="text-2xl font-bold text-gray-900">
                {account.balance.toLocaleString('ru-RU')} {account.currency}
              </p>
              
              <div className="flex items-center">
                {account.change >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${account.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {account.change >= 0 ? '+' : ''}{account.change.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}