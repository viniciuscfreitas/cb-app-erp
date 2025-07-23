import React from 'react';
import MonthView from './views/MonthView';
import WeekView from './views/WeekView';
import DayView from './views/DayView';
import AgendaView from './views/AgendaView';

const CalendarView = ({ view, currentDate, events, onEventClick, onEventUpdate, onCreateEvent }) => {
  const renderView = () => {
    switch (view) {
      case 'month':
        return (
          <MonthView
            currentDate={currentDate}
            events={events}
            onEventClick={onEventClick}
            onCreateEvent={onCreateEvent}
          />
        );
      case 'week':
        return (
          <WeekView
            currentDate={currentDate}
            events={events}
            onEventClick={onEventClick}
            onCreateEvent={onCreateEvent}
          />
        );
      case 'day':
        return (
          <DayView
            currentDate={currentDate}
            events={events}
            onEventClick={onEventClick}
            onEventUpdate={onEventUpdate}
            onCreateEvent={onCreateEvent}
          />
        );
      case 'agenda':
        return (
          <AgendaView
            currentDate={currentDate}
            events={events}
            onEventClick={onEventClick}
            onCreateEvent={onCreateEvent}
          />
        );
      default:
        return (
          <MonthView
            currentDate={currentDate}
            events={events}
            onEventClick={onEventClick}
            onCreateEvent={onCreateEvent}
          />
        );
    }
  };

  return (
    <div className="h-full">
      {renderView()}
    </div>
  );
};

export default CalendarView; 