import React from 'react';

const CalendarSidebar = ({ 
  currentDate, 
  onDateSelect, 
  selectedServices, 
  onServiceToggle, 
  services,
  selectedProfessionals,
  onProfessionalToggle,
  professionals,
  expanded = true,
  setExpanded
}) => {
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    while (current <= lastDay || current.getDay() !== 0) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return date.toDateString() === currentDate.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="h-full flex flex-col" role="complementary" aria-label="Painel lateral do calendário">
      <div className="p-4 flex-1 overflow-y-auto">
        {/* Mini Calendário - otimizado */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-base font-semibold text-gray-900 dark:text-gray-100 ${!expanded ? 'hidden' : ''}`} id="mini-calendar-title">
              {currentDate.toLocaleDateString('pt-BR', { 
                month: 'short', 
                year: 'numeric' 
              })}
            </h3>
            {!expanded && (
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100" id="mini-calendar-title-collapsed">
                {currentDate.toLocaleDateString('pt-BR', { 
                  month: 'short'
                })}
              </h3>
            )}
          </div>

          {/* Dias da semana - melhorados */}
          <div className={`grid grid-cols-7 gap-1 mb-2 ${!expanded ? 'hidden' : ''}`} role="row" aria-labelledby="mini-calendar-title">
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
              <div key={index} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 p-1" role="columnheader" aria-label={day}>
                {day}
              </div>
            ))}
          </div>

          {/* Grade do calendário - maior e mais clara */}
          <div className="grid grid-cols-7 gap-1" role="grid" aria-labelledby={expanded ? "mini-calendar-title" : "mini-calendar-title-collapsed"}>
            {days.map((day, index) => {
              const isCurrentMonthDay = isCurrentMonth(day);
              const isTodayDate = isToday(day);
              const isSelectedDate = isSelected(day);
              
              return (
                <button
                  key={index}
                  onClick={() => onDateSelect(day)}
                  className={`
                    w-8 h-8 text-sm rounded-md flex items-center justify-center transition-colors
                    ${isSelectedDate 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' 
                      : isTodayDate 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800'
                      : isCurrentMonthDay 
                      ? 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700' 
                      : 'text-gray-400 dark:text-gray-500'
                    }
                  `}
                  aria-label={`${day.toLocaleDateString('pt-BR', { weekday: 'long' })} ${day.getDate()} ${day.toLocaleDateString('pt-BR', { month: 'long' })}`}
                  aria-pressed={isSelectedDate}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtros de Serviços - otimizados */}
        <div className={`mb-6 ${!expanded ? 'hidden' : ''}`}>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wide">
            Serviços
          </h3>
          <div className="space-y-2">
            {services.map((service) => (
              <label key={service.id} className="flex items-center space-x-3 cursor-pointer py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md px-1 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service.id)}
                  onChange={() => onServiceToggle(service.id)}
                  className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
                  style={{ backgroundColor: service.color }}
                ></div>
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate font-medium">
                  {service.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Filtros de Profissionais - otimizados */}
        <div className={`mb-6 ${!expanded ? 'hidden' : ''}`}>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wide">
            Profissionais
          </h3>
          <div className="space-y-2">
            {professionals.map((professional) => (
              <label key={professional.id} className="flex items-center space-x-3 cursor-pointer py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md px-1 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedProfessionals.includes(professional.id)}
                  onChange={() => onProfessionalToggle(professional.id)}
                  className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
                  style={{ backgroundColor: professional.color }}
                ></div>
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate font-medium">
                  {professional.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Botão de expandir/recolher (desktop) - no rodapé, centralizado */}
      {setExpanded && (
        <button
          className={`hidden md:flex items-center justify-center w-8 h-8 mb-4 mx-auto rounded-full transition-colors focus:outline-none
            text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-300`}
          style={{ background: "none", border: "none" }}
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? "Recolher menu" : "Expandir menu"}
        >
          <span className="material-icons text-lg">
            {expanded ? "chevron_right" : "chevron_left"}
          </span>
        </button>
      )}
    </div>
  );
};

export default CalendarSidebar; 