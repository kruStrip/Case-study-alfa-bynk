import React, { useState } from 'react';
import { ArrowLeft, Search, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface TransferFrameProps {
  onBack: () => void;
}

export function TransferFrame({ onBack }: TransferFrameProps) {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [comment, setComment] = useState('');
  const [showReliabilityModal, setShowReliabilityModal] = useState(false);
  const [contractorData, setContractorData] = useState<any>(null);

  const accounts = [
    { id: '1', name: 'Альфа-Банк • Основной', balance: 350000, number: '•••• 1234' },
    { id: '2', name: 'Тинькофф • Бизнес', balance: 280000, number: '•••• 5678' },
    { id: '3', name: 'Сбербанк • Текущий', balance: 212150, number: '•••• 9012' }
  ];

  const handleCheckContractor = () => {
    // Симуляция проверки контрагента
    const mockData = {
      inn: '7707083893',
      name: 'ООО "АЛЬФА-БАНК"',
      status: 'reliable', // reliable, moderate, risky
      lastUpdate: '15.12.2024',
      risks: ['Нет критических рисков'],
      recommendations: ['Можно проводить операции без ограничений'],
      additionalInfo: {
        registrationDate: '17.01.1991',
        address: 'г. Москва, ул. Каланчевская, д. 27',
        authorizedCapital: '50 000 000 000 ₽'
      }
    };
    setContractorData(mockData);
    setShowReliabilityModal(true);
  };

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('ru-RU').format(amount) + ' ₽';
  };

  const getReliabilityBadge = (status: string) => {
    switch (status) {
      case 'reliable':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Надежный</Badge>;
      case 'moderate':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Умеренный риск</Badge>;
      case 'risky':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Высокий риск</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">Перевод контрагенту</h1>
        </div>
      </header>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Recipient */}
        <Card className="p-4">
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Получатель
          </Label>
          <div className="space-y-3">
            <div className="relative">
              <Input
                placeholder="ИНН, название или счет получателя"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
            </div>
            
            {recipient && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">ООО "АЛЬФА-БАНК"</p>
                  <p className="text-sm text-gray-500">ИНН: 7707083893</p>
                  <p className="text-sm text-gray-500">Счет: 40702810902960000811</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCheckContractor}
                  className="flex items-center space-x-1 text-primary border-primary"
                >
                  <Info className="w-4 h-4" />
                  <span>Проверить</span>
                </Button>
              </div>
            )}

            {contractorData && (
              <div className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-800">Контрагент проверен</span>
                {getReliabilityBadge(contractorData.status)}
              </div>
            )}
          </div>
        </Card>

        {/* Amount */}
        <Card className="p-4">
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Сумма перевода
          </Label>
          <div className="relative">
            <Input
              type="text"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-2xl font-medium text-center py-4"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl text-gray-400">₽</span>
          </div>
        </Card>

        {/* Account Selection */}
        <Card className="p-4">
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Счет списания
          </Label>
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите счет" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p className="font-medium">{account.name}</p>
                      <p className="text-sm text-gray-500">{account.number}</p>
                    </div>
                    <span className="text-sm font-medium">{formatBalance(account.balance)}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedAccount && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              {(() => {
                const account = accounts.find(a => a.id === selectedAccount);
                return account ? (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Доступно:</span>
                    <span className="font-medium">{formatBalance(account.balance)}</span>
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </Card>

        {/* Comment */}
        <Card className="p-4">
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Назначение платежа
          </Label>
          <Input
            placeholder="Комментарий к переводу"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Card>

        {/* Transfer Details */}
        {amount && selectedAccount && (
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h3 className="font-medium text-gray-900 mb-3">Детали перевода</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Сумма:</span>
                <span className="font-medium">{amount} ₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Комиссия:</span>
                <span className="font-medium text-green-600">0 ₽</span>
              </div>
              <div className="flex justify-between border-t border-blue-200 pt-2">
                <span className="font-medium">К списанию:</span>
                <span className="font-medium">{amount} ₽</span>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <Button 
          className="w-full py-4 bg-primary hover:bg-primary/90 text-white"
          disabled={!amount || !selectedAccount || !recipient}
        >
          Перевести {amount ? `${amount} ₽` : ''}
        </Button>
      </div>

      
    </div>
  );
}