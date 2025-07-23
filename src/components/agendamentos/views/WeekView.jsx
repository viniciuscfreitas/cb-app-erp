import React from 'react';
import EventCard from '../EventCard';

const WeekView = ({ currentDate, events, onEventClick, onCreateEvent }) => {
  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getEventsForDay = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    }).sort((a, b) => new Date(a.start) - new Date(b.start));
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
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

  const weekDays = getWeekDays(currentDate);

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg overflow-hidden flex flex-col h-full" role="grid" aria-label="Visualização semanal do calendário">
      {/* Cabeçalho dos dias */}
      <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0" role="row">
        {weekDays.map((day, index) => (
          <div key={index} className="p-3 text-center" role="columnheader" aria-label={`${day.toLocaleDateString('pt-BR', { weekday: 'long' })} ${day.getDate()}`}>
            <div className={`
              text-sm font-medium
              ${isToday(day) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}
            `}>
              {day.toLocaleDateString('pt-BR', { weekday: 'short' })}
            </div>
            <div className={`
              text-lg font-bold mt-1
              ${isToday(day) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}
            `}>
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Grade dos eventos com scroll vertical */}
      <div className="flex-1 overflow-y-auto" style={{ height: 'calc(100vh - 300px)' }} role="grid">
        <div className="grid grid-cols-7 min-h-[600px]" role="row">
          {weekDays.map((day, dayIndex) => {
            const dayEvents = getEventsForDay(day);
            
            return (
              <div
                key={dayIndex}
                className={`
                  border-r border-gray-200 dark:border-gray-700
                  ${isToday(day) ? 'bg-blue-50 dark:bg-blue-900/10' : 'bg-white dark:bg-gray-900'}
                  ${dayIndex === 6 ? 'border-r-0' : ''}
                `}
                role="gridcell"
                aria-label={`${day.toLocaleDateString('pt-BR', { weekday: 'long' })} ${day.getDate()}`}
              >
                <div 
                  className="p-2 space-y-2 h-full cursor-pointer"
                  onDoubleClick={() => handleDoubleClick(day)}
                  title="Duplo clique para criar agendamento"
                >
                  {dayEvents.length > 0 ? (
                    dayEvents.map((event) => (
                      <div key={event.id} className="cursor-pointer">
                        <EventCard 
                          event={event} 
                          compact={true}
                          onClick={() => onEventClick(event)}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-400 dark:text-gray-500 text-sm py-4">
                      Nenhum evento
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

export default WeekView; 