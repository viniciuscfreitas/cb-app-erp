import React from 'react';
import { Button } from '../Button/Button';

const CalendarHeader = ({ 
  currentDate, 
  view, 
  onDateChange, 
  onViewChange, 
  onCreateEvent,
  sidebarVisible,
  onToggleSidebar,
  showCreateButton = true,
  isMobile = false
}) => {
  const goToToday = () => {
    onDateChange(new Date());
  };

  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (view === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    }
    onDateChange(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (view === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    }
    onDateChange(newDate);
  };

  const getViewTitle = () => {
    if (view === 'month') {
      return currentDate.toLocaleDateString('pt-BR', { 
        month: 'long', 
        year: 'numeric' 
      });
    } else if (view === 'week') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return `${startOfWeek.getDate()} - ${endOfWeek.getDate()} ${endOfWeek.toLocaleDateString('pt-BR', { 
        month: 'long', 
        year: 'numeric' 
      })}`;
    } else if (view === 'day') {
      return currentDate.toLocaleDateString('pt-BR', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
    }
    return currentDate.toLocaleDateString('pt-BR', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="flex items-center justify-between gap-4" role="toolbar" aria-label="Controles do calendário">
      {/* Esquerda: Navegação e título */}
      <div className="flex items-center space-x-2 min-w-0 flex-1">
        {/* Controles de navegação */}
        <div className="flex items-center space-x-1">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Anterior (←)"
          >
            <span className="material-icons text-gray-600 dark:text-gray-400">chevron_left</span>
          </button>
          
          <button
            onClick={goToToday}
            className="px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
            title="Hoje (Ctrl+H)"
          >
            Hoje
          </button>
          
          <button
            onClick={goToNext}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Próximo (→)"
          >
            <span className="material-icons text-gray-600 dark:text-gray-400">chevron_right</span>
          </button>
        </div>

        {/* Título - responsivo */}
        <h1 className={`text-lg font-bold text-gray-900 dark:text-gray-100 ml-2 truncate ${isMobile ? 'hidden' : ''}`} id="calendar-title">
          {getViewTitle()}
        </h1>
      </div>

      {/* Direita: Controles principais */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        {/* Seletor de visualização */}
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-md p-1" role="group" aria-labelledby="calendar-title">
          {[
            { key: 'day', label: 'Dia' },
            { key: 'week', label: 'Semana' },
            { key: 'month', label: 'Mês' },
            { key: 'agenda', label: 'Agenda' }
          ].map((viewOption) => (
            <button
              key={viewOption.key}
              onClick={() => onViewChange(viewOption.key)}
              className={`
                px-3 py-1 text-sm font-medium rounded transition-colors
                ${view === viewOption.key
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }
              `}
            >
              {viewOption.label}
            </button>
          ))}
        </div>

        {/* Botão toggle sidebar */}
        {!isMobile && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={sidebarVisible ? "Ocultar sidebar (Ctrl+B)" : "Mostrar sidebar (Ctrl+B)"}
          >
            <span className="material-icons text-gray-600 dark:text-gray-400 transition-transform duration-300">
              {sidebarVisible ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
        )}

        {/* Botão criar agendamento */}
        {showCreateButton && (
          <button
            onClick={onCreateEvent}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center space-x-2"
            title="Novo agendamento (Ctrl+N)"
          >
            <span className="material-icons text-sm">add</span>
            <span className="text-sm">Criar</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CalendarHeader; 