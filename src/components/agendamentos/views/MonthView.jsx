import React from 'react';
import EventCard from '../EventCard';

const MonthView = ({ currentDate, events, onEventClick, onCreateEvent }) => {
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

  const getEventsForDay = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const handleDoubleClick = (day) => {
    if (onCreateEvent) {
      // Criar evento para o dia clicado às 9h da manhã
      const eventDate = new Date(day);
      eventDate.setHours(9, 0, 0, 0);
      
      const endDate = new Date(eventDate);
      endDate.setHours(10, 0, 0, 0);
      
      onCreateEvent({
        start: eventDate.toISOString().slice(0, 16),
        end: endDate.toISOString().slice(0, 16)
      });
    }
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg overflow-hidden flex flex-col h-full" role="grid" aria-label="Visualização mensal do calendário">
      {/* Cabeçalho dos dias da semana */}
      <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0" role="row">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
          <div key={day} className="p-3 text-center text-sm font-medium text-gray-600 dark:text-gray-300" role="columnheader" aria-label={day}>
            {day}
          </div>
        ))}
      </div>

      {/* Grade do calendário com scroll vertical */}
      <div className="flex-1 overflow-y-auto" style={{ height: 'calc(100vh - 300px)' }} role="grid">
        <div className="grid grid-cols-7 min-h-[700px]" role="row">
          {days.map((day, index) => {
            const dayEvents = getEventsForDay(day);
            const isCurrentMonthDay = isCurrentMonth(day);
            
            return (
              <div
                key={index}
                className={`
                  min-h-[120px] border-r border-b border-gray-200 dark:border-gray-700
                  ${isCurrentMonthDay ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}
                  ${isToday(day) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                  hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer
                `}
                onDoubleClick={() => handleDoubleClick(day)}
                title="Duplo clique para criar agendamento"
                role="gridcell"
                aria-label={`${day.toLocaleDateString('pt-BR', { weekday: 'long' })} ${day.getDate()} ${day.toLocaleDateString('pt-BR', { month: 'long' })}`}
              >
                {/* Número do dia */}
                <div className={`
                  p-2 text-right text-sm font-medium
                  ${isCurrentMonthDay ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'}
                  ${isToday(day) ? 'text-blue-600 dark:text-blue-400' : ''}
                `}>
                  {day.getDate()}
                </div>

                {/* Eventos do dia */}
                <div className="px-1 pb-1 space-y-1 max-h-[80px] overflow-y-auto">
                  {dayEvents.slice(0, 3).map(event => (
                    <div key={event.id} className="cursor-pointer">
                      <EventCard 
                        event={event} 
                        compact={true}
                        onClick={() => onEventClick(event)}
                      />
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-1">
                      +{dayEvents.length - 3} mais
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonthView; 