import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus, Settings, Trash2, Eye, EyeOff } from 'lucide-react';

const supportedBanks = [
  'Сбербанк',
  'ВТБ',
  'Газпромбанк',
  'Райффайзенбанк',
  'Россельхозбанк',
  'Открытие',
  'Тинькофф',
  'МТС Банк'
];

const mockConnectedAccounts = [
  {
    id: 1,
    bank: 'Сбербанк',
    accountNumber: '40817810400000123456',
    accountName: 'Основной расчетный',
    status: 'connected',
    lastSync: '2024-09-14T10:30:00'
  },
  {
    id: 2,
    bank: 'ВТБ',
    accountNumber: '40817810500000789012',
    accountName: 'Корпоративный счет',
    status: 'connected',
    lastSync: '2024-09-14T09:15:00'
  }
];

export function AccountsManager() {
  const [connectedAccounts, setConnectedAccounts] = useState(mockConnectedAccounts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [showFullNumbers, setShowFullNumbers] = useState(false);
  const [newAccount, setNewAccount] = useState({
    bank: '',
    accountNumber: '',
    accountName: '',
    login: '',
    password: ''
  });

  const handleAddAccount = () => {
    if (newAccount.bank && newAccount.accountNumber && newAccount.accountName) {
      const newId = Math.max(...connectedAccounts.map(acc => acc.id)) + 1;
      setConnectedAccounts([...connectedAccounts, {
        id: newId,
        bank: newAccount.bank,
        accountNumber: newAccount.accountNumber,
        accountName: newAccount.accountName,
        status: 'connected' as const,
        lastSync: new Date().toISOString()
      }]);
      setNewAccount({ bank: '', accountNumber: '', accountName: '', login: '', password: '' });
      setIsAddDialogOpen(false);
    }
  };

  const handleRemoveAccount = (id: number) => {
    setConnectedAccounts(connectedAccounts.filter(acc => acc.id !== id));
  };

  const formatAccountNumber = (accountNumber: string) => {
    if (showFullNumbers) {
      return accountNumber;
    }
    return `•••• ${accountNumber.slice(-4)}`;
  };

  const formatLastSync = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Управление счетами</h2>
          <p className="text-gray-600">Подключайте счета других банков для единого управления</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFullNumbers(!showFullNumbers)}
          >
            {showFullNumbers ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showFullNumbers ? 'Скрыть номера' : 'Показать номера'}
          </Button>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                Добавить счет
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Добавить банковский счет</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <label className="text-sm font-medium">Банк</label>
                  <Select onValueChange={(value) => setNewAccount({...newAccount, bank: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите банк" />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedBanks.map((bank) => (
                        <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Номер счета</label>
                  <Input
                    placeholder="40817810400000123456"
                    value={newAccount.accountNumber}
                    onChange={(e) => setNewAccount({...newAccount, accountNumber: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Название счета</label>
                  <Input
                    placeholder="Основной расчетный"
                    value={newAccount.accountName}
                    onChange={(e) => setNewAccount({...newAccount, accountName: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Логин в интернет-банке</label>
                  <Input
                    placeholder="Введите логин"
                    value={newAccount.login}
                    onChange={(e) => setNewAccount({...newAccount, login: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Пароль</label>
                  <Input
                    type="password"
                    placeholder="Введите пароль"
                    value={newAccount.password}
                    onChange={(e) => setNewAccount({...newAccount, password: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleAddAccount} className="bg-primary hover:bg-red-700">
                  Подключить
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4">
        {connectedAccounts.map((account) => (
          <Card key={account.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {account.bank.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-900">{account.bank}</p>
                    <p className="text-sm text-gray-500">{account.accountName}</p>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center space-x-6 text-sm text-gray-600">
                  <span>Счет: {formatAccountNumber(account.accountNumber)}</span>
                  <span>Последняя синхронизация: {formatLastSync(account.lastSync)}</span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Подключен
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleRemoveAccount(account.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {connectedAccounts.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-gray-400 mb-4">
            <Plus className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Нет подключенных счетов</h3>
          <p className="text-gray-600 mb-4">Добавьте первый банковский счет для начала работы</p>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-primary hover:bg-red-700">
            Добавить счет
          </Button>
        </Card>
      )}
    </div>
  );
}