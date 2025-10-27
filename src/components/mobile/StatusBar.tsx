export function StatusBar() {
  const currentTime = new Date().toLocaleTimeString('ru-RU', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="flex justify-between items-center px-6 py-2 bg-white text-black">
      <div className="flex items-center space-x-1">
        <span className="text-sm font-medium">{currentTime}</span>
      </div>
      
      <div className="flex items-center space-x-1">
        {/* Уровень сигнала */}
        <div className="flex items-center space-x-0.5">
          <div className="w-1 h-2 bg-black rounded-full"></div>
          <div className="w-1 h-3 bg-black rounded-full"></div>
          <div className="w-1 h-4 bg-black rounded-full"></div>
          <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
        </div>
        
        {/* WiFi */}
        <div className="w-4 h-3 relative ml-1">
          <div className="absolute bottom-0 left-0 w-1 h-1 bg-black rounded-full"></div>
          <div className="absolute bottom-0 left-1 w-1 h-2 bg-black rounded-full"></div>
          <div className="absolute bottom-0 left-2 w-1 h-3 bg-black rounded-full"></div>
        </div>
        
        {/* Батарея */}
        <div className="flex items-center ml-1">
          <div className="w-6 h-3 border border-black rounded-sm relative">
            <div className="w-4 h-1.5 bg-black rounded-sm absolute top-0.5 left-0.5"></div>
          </div>
          <div className="w-0.5 h-1.5 bg-black rounded-r-sm ml-0.5"></div>
        </div>
      </div>
    </div>
  );
}