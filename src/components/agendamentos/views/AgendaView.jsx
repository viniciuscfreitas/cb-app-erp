import React from 'react';
import EventCard from '../EventCard';

const AgendaView = ({ currentDate, events, onEventClick, onCreateEvent }) => {
  const getEventsForPeriod = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    return events
      .filter(event => {
        const eventDate = new Date(event.start);
        return eventDate >= startOfMonth && eventDate <= endOfMonth;
      })
      .sort((a, b) => new Date(a.start) - new Date(b.start));
  };

  const groupEventsByDate = (events) => {
    const groups = {};
    events.forEach(event => {
      const dateKey = new Date(event.start).toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(event);
    });
    return groups;
  };

  const handleDoubleClick = (date) => {
    if (onCreateEvent) {
      // Criar evento para o dia clicado às 9h da manhã
      const eventDate = new Date(date);
      eventDate.setHours(9, 0, 0, 0);
      
      const endDate = new Date(eventDate);
      endDate.setHours(10, 0, 0, 0);
      
      onCreateEvent({
        start: eventDate.toISOString().slice(0, 16),
        end: endDate.toISOString().slice(0, 16)
      });
    }
  };

  const allEvents = getEventsForPeriod(currentDate);
  const eventsByDate = groupEventsByDate(allEvents);

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg overflow-hidden flex flex-col h-full" role="main" aria-label="Visualização de agenda do calendário">
      {/* Cabeçalho */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100" id="agenda-title">
          Agenda - {currentDate.toLocaleDateString('pt-BR', { 
            month: 'long', 
            year: 'numeric' 
          })}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1" aria-describedby="agenda-title">
          {allEvents.length} evento{allEvents.length !== 1 ? 's' : ''} agendado{allEvents.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Lista de eventos com scroll vertical */}
      <div className="flex-1 overflow-y-auto" style={{ height: 'calc(100vh - 300px)' }} role="list" aria-labelledby="agenda-title">
        <div className="min-h-[600px]">
                      {Object.keys(eventsByDate).length > 0 ? (
              Object.entries(eventsByDate).map(([dateKey, dayEvents]) => {
                const date = new Date(dateKey);
                return (
                  <div key={dateKey} className="border-b border-gray-200 dark:border-gray-700" role="listitem">
                  {/* Cabeçalho da data */}
                  <div 
                    className="p-4 bg-gray-50 dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onDoubleClick={() => handleDoubleClick(date)}
                    title="Duplo clique para criar agendamento"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {date.toLocaleDateString('pt-BR', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long' 
                      })}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {dayEvents.length} evento{dayEvents.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* Eventos do dia */}
                  <div className="p-4 space-y-3">
                    {dayEvents.map((event) => (
                      <div key={event.id} className="cursor-pointer">
                        <EventCard 
                          event={event} 
                          compact={true}
                          onClick={() => onEventClick(event)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
                <span className="material-icons text-6xl">event_busy</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Nenhum evento este mês
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Clique em "+ Criar Agendamento" para adicionar um novo evento
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgendaView; 