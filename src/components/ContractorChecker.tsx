import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, AlertTriangle, CheckCircle, XCircle, Building, MapPin, Calendar } from 'lucide-react';

interface ContractorInfo {
  inn: string;
  name: string;
  fullName: string;
  status: 'active' | 'liquidated' | 'reorganizing' | 'blocked';
  registrationDate: string;
  address: string;
  director: string;
  capital: number;
  riskLevel: 'low' | 'medium' | 'high';
  blacklist: boolean;
  taxDebt: number;
}

const mockContractors: Record<string, ContractorInfo> = {
  '7707083893': {
    inn: '7707083893',
    name: 'ПАО Сбербанк',
    fullName: 'Публичное акционерное общество "Сбербанк России"',
    status: 'active',
    registrationDate: '1991-06-20',
    address: 'г. Москва, ул. Вавилова, д. 19',
    director: 'Греф Герман Оскарович',
    capital: 67760843000,
    riskLevel: 'low',
    blacklist: false,
    taxDebt: 0
  },
  '7728168971': {
    inn: '7728168971',
    name: 'ООО Альфа-Банк',
    fullName: 'Общество с ограниченной ответственностью "Альфа-Банк"',
    status: 'active',
    registrationDate: '1990-12-25',
    address: 'г. Москва, ул. Каланчевская, д. 27',
    director: 'Косогова Ольга Владимировна',
    capital: 50000000000,
    riskLevel: 'low',
    blacklist: false,
    taxDebt: 0
  },
  '1234567890': {
    inn: '1234567890',
    name: 'ООО Рискованная компания',
    fullName: 'Общество с ограниченной ответственностью "Рискованная компания"',
    status: 'active',
    registrationDate: '2023-01-15',
    address: 'г. Москва, ул. Неизвестная, д. 1',
    director: 'Иванов Иван Иванович',
    capital: 10000,
    riskLevel: 'high',
    blacklist: true,
    taxDebt: 150000
  }
};

export function ContractorChecker() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ContractorInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<ContractorInfo[]>([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // Имитация API запроса
    setTimeout(() => {
      const result = mockContractors[searchQuery.trim()];
      if (result) {
        setSearchResults(result);
        setSearchHistory(prev => {
          const filtered = prev.filter(item => item.inn !== result.inn);
          return [result, ...filtered].slice(0, 5);
        });
      } else {
        setSearchResults(null);
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return { label: 'Действующий', color: 'bg-green-100 text-green-800' };
      case 'liquidated':
        return { label: 'Ликвидирован', color: 'bg-red-100 text-red-800' };
      case 'reorganizing':
        return { label: 'Реорганизация', color: 'bg-yellow-100 text-yellow-800' };
      case 'blocked':
        return { label: 'Заблокирован', color: 'bg-red-100 text-red-800' };
      default:
        return { label: 'Неизвестно', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getRiskInfo = (level: string) => {
    switch (level) {
      case 'low':
        return { label: 'Низкий', color: 'bg-green-100 text-green-800', icon: CheckCircle };
      case 'medium':
        return { label: 'Средний', color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle };
      case 'high':
        return { label: 'Высокий', color: 'bg-red-100 text-red-800', icon: XCircle };
      default:
        return { label: 'Неизвестно', color: 'bg-gray-100 text-gray-800', icon: AlertTriangle };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Проверка контрагентов</h2>
        <p className="text-gray-600">Проверяйте надежность ваших деловых партнеров</p>
      </div>

      {/* Поиск */}
      <Card className="p-6">
        <div className="flex space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Введите ИНН для проверки (например: 7707083893)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button 
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-primary hover:bg-red-700"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Search className="w-4 h-4 mr-2" />
            )}
            Проверить
          </Button>
        </div>
      </Card>

      {/* Результаты поиска */}
      {searchResults && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{searchResults.name}</h3>
                <p className="text-gray-600">{searchResults.fullName}</p>
                <p className="text-sm text-gray-500 mt-1">ИНН: {searchResults.inn}</p>
              </div>
              
              <div className="text-right space-y-2">
                <Badge className={getStatusInfo(searchResults.status).color}>
                  {getStatusInfo(searchResults.status).label}
                </Badge>
                
                {searchResults.blacklist && (
                  <div>
                    <Badge className="bg-red-100 text-red-800">В черном списке</Badge>
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Директор</p>
                    <p className="font-medium">{searchResults.director}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Адрес</p>
                    <p className="font-medium">{searchResults.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Дата регистрации</p>
                    <p className="font-medium">
                      {new Date(searchResults.registrationDate).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Ус��авный капитал</p>
                  <p className="font-medium">{searchResults.capital.toLocaleString('ru-RU')} ₽</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Налоговая задолженность</p>
                  <p className={`font-medium ${searchResults.taxDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {searchResults.taxDebt > 0 
                      ? `${searchResults.taxDebt.toLocaleString('ru-RU')} ₽`
                      : 'Отсутствует'
                    }
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Уровень риска</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {(() => {
                      const riskInfo = getRiskInfo(searchResults.riskLevel);
                      const IconComponent = riskInfo.icon;
                      return (
                        <>
                          <IconComponent className="w-4 h-4" />
                          <Badge className={riskInfo.color}>{riskInfo.label}</Badge>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {searchQuery && !searchResults && !isLoading && (
        <Card className="p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Контрагент не найден</h3>
          <p className="text-gray-600">Проверьте правильность введенного ИНН</p>
        </Card>
      )}

      {/* История поиска */}
      {searchHistory.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">История поиска</h3>
          <div className="grid gap-3">
            {searchHistory.map((contractor) => (
              <Card 
                key={contractor.inn} 
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  setSearchQuery(contractor.inn);
                  setSearchResults(contractor);
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{contractor.name}</p>
                    <p className="text-sm text-gray-500">ИНН: {contractor.inn}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusInfo(contractor.status).color}>
                      {getStatusInfo(contractor.status).label}
                    </Badge>
                    
                    {(() => {
                      const riskInfo = getRiskInfo(contractor.riskLevel);
                      const IconComponent = riskInfo.icon;
                      return <IconComponent className="w-4 h-4 text-gray-400" />;
                    })()}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}