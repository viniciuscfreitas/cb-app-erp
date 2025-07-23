import React from 'react';

const EventCard = ({ event, compact = false, onClick }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getEventStyle = () => {
    const color = event.service?.color || '#4285F4';
    return {
      backgroundColor: color + '20',
      borderLeft: `3px solid ${color}`,
      color: color
    };
  };

  if (compact) {
    return (
      <div
        onClick={onClick}
        className="text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity truncate"
        style={getEventStyle()}
        title={`${event.title} - ${formatTime(event.start)}`}
      >
        <div className="font-medium truncate">{event.title}</div>
        <div className="text-xs opacity-75">{formatTime(event.start)}</div>
        {event.professional && (
          <div className="text-xs opacity-75 truncate">
            <span className="material-icons text-xs">person</span>
            {event.professional.name}
          </div>
        )}
        {event.isRecurring && (
          <span className="material-icons text-xs opacity-75">repeat</span>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="p-3 rounded-lg cursor-pointer hover:shadow-md transition-shadow border"
      style={getEventStyle()}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm mb-1 truncate">{event.title}</h4>
          {event.description && (
            <p className="text-xs opacity-75 mb-2 line-clamp-2">{event.description}</p>
          )}
          <div className="flex items-center gap-4 text-xs opacity-75">
            <div className="flex items-center gap-1">
              <span className="material-icons text-xs">schedule</span>
              {formatTime(event.start)} - {formatTime(event.end)}
            </div>
            <div className="flex items-center gap-1">
              <span className="material-icons text-xs">person</span>
              {event.client?.name}
            </div>
            <div className="flex items-center gap-1">
              <span className="material-icons text-xs">pets</span>
              {event.pet?.name}
            </div>
            {event.professional && (
              <div className="flex items-center gap-1">
                <span className="material-icons text-xs">work</span>
                {event.professional.name}
              </div>
            )}
          </div>
        </div>
        {event.isRecurring && (
          <span className="material-icons text-xs opacity-75">repeat</span>
        )}
      </div>
    </div>
  );
};

export default EventCard; 