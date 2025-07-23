import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
  useDraggable,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const DraggableEventCard = ({ event, onClick, isDragging }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: event.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const startTime = new Date(event.start).toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
  const endTime = new Date(event.end).toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing mb-0.5 transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95' : 'hover:scale-[1.02] hover:shadow-md'
      }`}
      onClick={onClick}
    >
      <div 
        className="p-1 rounded border text-xs transition-all duration-200"
        style={{
          backgroundColor: (event.service?.color || '#4285F4') + '20',
          borderColor: event.service?.color || '#4285F4',
          boxShadow: isDragging ? '0 8px 25px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        {/* Título e horário */}
        <div className="font-medium text-gray-900 dark:text-gray-100 truncate mb-0.5 text-xs">
          {event.title}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-300 mb-0.5">
          {startTime} - {endTime}
        </div>
        
        {/* Cliente e Pet */}
        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {event.client?.name} • {event.pet?.name}
        </div>
      </div>
    </div>
  );
};

const DroppableSlot = ({ id, isDragOver, onDoubleClick }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`h-full min-h-[25px] border-2 border-dashed rounded flex items-center justify-center transition-all duration-200 cursor-pointer ${
        isDragOver 
          ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 scale-105' 
          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
      }`}
      onDoubleClick={onDoubleClick}
      title="Duplo clique para criar agendamento"
    >
      <div className={`text-center text-xs transition-colors duration-200 ${
        isDragOver 
          ? 'text-blue-600 dark:text-blue-400' 
          : 'text-gray-400 dark:text-gray-500'
      }`}>
        {isDragOver ? 'Soltar aqui' : '—'}
      </div>
    </div>
  );
};

const DragOverlayCard = ({ event }) => {
  const startTime = new Date(event.start).toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
  const endTime = new Date(event.end).toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

  return (
    <div className="p-1 rounded border text-xs shadow-xl transform rotate-2">
      <div 
        className="p-1 rounded border"
        style={{
          backgroundColor: (event.service?.color || '#4285F4') + '20',
          borderColor: event.service?.color || '#4285F4',
        }}
      >
        {/* Título e horário */}
        <div className="font-medium text-gray-900 dark:text-gray-100 truncate mb-0.5 text-xs">
          {event.title}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-300 mb-0.5">
          {startTime} - {endTime}
        </div>
        
        {/* Cliente e Pet */}
        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {event.client?.name} • {event.pet?.name}
        </div>
      </div>
    </div>
  );
};

const DayView = ({ currentDate, events, onEventClick, onEventUpdate, onCreateEvent }) => {
  const [activeId, setActiveId] = useState(null);
  const [dragOverSlot, setDragOverSlot] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const getEventsForDay = (date) => {
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    }).sort((a, b) => new Date(a.start) - new Date(b.start));
    
    return dayEvents;
  };

  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const getProfessionals = () => {
    // Ordem fixa dos profissionais - não muda baseado nos eventos
    return ['1', '2', '3', '4', '5', '6'];
  };

  const getEventsByTimeAndProfessional = (events) => {
    const timeSlots = getTimeSlots();
    const professionals = getProfessionals();
    
    const eventsMap = {};
    timeSlots.forEach(timeSlot => {
      eventsMap[timeSlot] = {};
      professionals.forEach(profId => {
        eventsMap[timeSlot][profId] = [];
      });
    });

    events.forEach(event => {
      const startTime = new Date(event.start);
      const startHour = startTime.getHours();
      const startMinutes = startTime.getMinutes();
      
      // Determinar o slot de início exato
      let startSlot;
      if (startMinutes >= 30) {
        startSlot = `${startHour.toString().padStart(2, '0')}:30`;
      } else {
        startSlot = `${startHour.toString().padStart(2, '0')}:00`;
      }
      
      // Adicionar evento apenas no slot de início
      if (event.professional && eventsMap[startSlot]) {
        if (!eventsMap[startSlot][event.professional.id]) {
          eventsMap[startSlot][event.professional.id] = [];
        }
        eventsMap[startSlot][event.professional.id].push(event);
      }
    });

    return { eventsMap, professionals };
  };

  const dayEvents = getEventsForDay(currentDate);
  const { eventsMap, professionals } = getEventsByTimeAndProfessional(dayEvents);
  const timeSlots = getTimeSlots();

  const professionalNames = {
    '1': 'Ana Silva',
    '2': 'Carlos Santos', 
    '3': 'Maria Costa',
    '4': 'João Oliveira',
    '5': 'Fernanda Lima',
    '6': 'Roberto Almeida'
  };

  const professionalColors = {
    '1': '#4285F4',
    '2': '#34A853',
    '3': '#FBBC04', 
    '4': '#EA4335',
    '5': '#9C27B0',
    '6': '#FF6B35'
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { over } = event;
    if (over) {
      setDragOverSlot(over.id);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    console.log('Drag End:', { active: active?.id, over: over?.id });
    
    if (active.id !== over?.id && over) {
      const eventId = active.id;
      const eventData = dayEvents.find(e => e.id === eventId);
      
      console.log('Event Data:', eventData);
      console.log('Over ID:', over.id);
      
      // Extrair informações do drop target
      const [targetTimeSlot, targetProfessionalId] = over.id.split('-');
      
      console.log('Target:', { targetTimeSlot, targetProfessionalId });
      
      if (eventData && targetTimeSlot && targetProfessionalId) {
        // Calcular novo horário baseado no slot
        const [hours, minutes] = targetTimeSlot.split(':');
        const newStartTime = new Date(eventData.start);
        newStartTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        // Calcular nova duração
        const duration = new Date(eventData.end) - new Date(eventData.start);
        const newEndTime = new Date(newStartTime.getTime() + duration);
        
        // Encontrar novo profissional
        const newProfessional = {
          id: targetProfessionalId,
          name: professionalNames[targetProfessionalId],
          color: professionalColors[targetProfessionalId]
        };
        
        // Atualizar evento
        const updatedEvent = {
          ...eventData,
          start: newStartTime,
          end: newEndTime,
          professional: newProfessional
        };
        
        console.log('Updated Event:', updatedEvent);
        onEventUpdate(updatedEvent);
      }
    }
    
    setActiveId(null);
    setDragOverSlot(null);
  };

  const handleDoubleClick = (timeSlot, professionalId) => {
    if (onCreateEvent) {
      // Criar evento para o horário e profissional específicos
      const eventDate = new Date(currentDate);
      const [hours, minutes] = timeSlot.split(':').map(Number);
      eventDate.setHours(hours, minutes, 0, 0);
      
      const endDate = new Date(eventDate);
      endDate.setMinutes(endDate.getMinutes() + 60); // 1 hora de duração
      
      onCreateEvent({
        start: eventDate.toISOString().slice(0, 16),
        end: endDate.toISOString().slice(0, 16),
        professional: professionalId
      });
    }
  };

  const activeEvent = activeId ? dayEvents.find(e => e.id === activeId) : null;

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg overflow-hidden flex flex-col h-full" role="grid" aria-label="Visualização diária do calendário">

      {/* Tabela de horários com profissionais */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 overflow-y-auto" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="min-h-[600px]">
            {/* Cabeçalho das colunas - mais compacto */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-10" role="row">
              <div className="grid grid-cols-7 gap-0.5 p-1" role="row">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-300 text-center p-1" role="columnheader" aria-label="Horário">
                  Horário
                </div>
                {professionals.map(profId => (
                  <div key={profId} className="text-xs font-medium text-center p-1" role="columnheader" aria-label={`Profissional ${professionalNames[profId]}`}>
                    <div 
                      className="w-2 h-2 rounded-full mx-auto mb-0.5"
                      style={{ backgroundColor: professionalColors[profId] }}
                      aria-hidden="true"
                    ></div>
                    <div className="text-xs truncate font-medium text-gray-700 dark:text-gray-200">
                      {professionalNames[profId]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Linhas de horário - mais compactas */}
            {timeSlots.map(timeSlot => (
              <div key={timeSlot} className="grid grid-cols-7 gap-0.5 border-b border-gray-100 dark:border-gray-700 min-h-[40px]">
                {/* Coluna de horário - mais compacta */}
                <div className="p-1 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-200">
                    {timeSlot}
                  </div>
                </div>

                {/* Colunas dos profissionais - mais compactas */}
                {professionals.map(profId => {
                  const dropId = `${timeSlot}-${profId}`;
                  const slotEvents = eventsMap[timeSlot]?.[profId] || [];
                  const isDragOver = dragOverSlot === dropId;
                  
                  return (
                    <div key={profId} className="p-0.5 relative">
                      {slotEvents.map((event) => (
                        <DraggableEventCard
                          key={event.id}
                          event={event}
                          onClick={() => onEventClick(event)}
                          isDragging={activeId === event.id}
                        />
                      ))}
                      
                      {/* Área de drop vazia - mais compacta */}
                      {slotEvents.length === 0 && (
                        <DroppableSlot 
                          id={dropId} 
                          isDragOver={isDragOver}
                          onDoubleClick={() => handleDoubleClick(timeSlot, profId)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeEvent ? <DragOverlayCard event={activeEvent} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default DayView; 