import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../Button/Button';
import CalendarHeader from './CalendarHeader';
import CalendarView from './CalendarView';
import CalendarSidebar from './CalendarSidebar';
import EventModal from './EventModal';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, day, agenda
  const [events, setEvents] = useState([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Estados para filtros
  const [selectedServices, setSelectedServices] = useState(['all']);
  const [selectedProfessionals, setSelectedProfessionals] = useState(['all']);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Estado para detectar mobile
  const [isMobile, setIsMobile] = useState(false);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Serviços disponíveis
  const services = [
    { id: 'all', name: 'Todos os Serviços', color: '#4285F4' },
    { id: '1', name: 'Banho e Tosa', color: '#4285F4' },
    { id: '2', name: 'Banho Completo', color: '#34A853' },
    { id: '3', name: 'Tosa Higiênica', color: '#FBBC04' }
  ];

  // Profissionais disponíveis
  const professionals = [
    { id: 'all', name: 'Todos os Profissionais', color: '#4285F4' },
    { id: '1', name: 'Ana Silva', color: '#4285F4' },
    { id: '2', name: 'Carlos Santos', color: '#34A853' },
    { id: '3', name: 'Maria Costa', color: '#FBBC04' },
    { id: '4', name: 'João Oliveira', color: '#EA4335' },
    { id: '5', name: 'Fernanda Lima', color: '#9C27B0' },
    { id: '6', name: 'Roberto Almeida', color: '#FF6B35' },
    { id: 'none', name: 'Sem Profissional', color: '#757575' }
  ];



  // Handlers
  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => {
      if (serviceId === 'all') {
        return prev.includes('all') ? [] : ['all'];
      }
      
      const newServices = prev.filter(id => id !== 'all');
      if (newServices.includes(serviceId)) {
        return newServices.filter(id => id !== serviceId);
      } else {
        return [...newServices, serviceId];
      }
    });
  };

  const handleProfessionalToggle = (professionalId) => {
    setSelectedProfessionals(prev => {
      if (professionalId === 'all') {
        return prev.includes('all') ? [] : ['all'];
      }
      
      const newProfessionals = prev.filter(id => id !== 'all');
      if (newProfessionals.includes(professionalId)) {
        return newProfessionals.filter(id => id !== professionalId);
      } else {
        return [...newProfessionals, professionalId];
      }
    });
  };

  const toggleSidebar = React.useCallback(() => {
    setSidebarVisible(!sidebarVisible);
  }, [sidebarVisible]);

  const handleCloseEventModal = () => {
    setIsEventModalOpen(false);
    setSelectedEvent(null);
    setSelectedTimeSlot(null);
  };





  // Atalhos de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+N: Novo agendamento
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        const now = new Date();
        const startTime = new Date(now);
        startTime.setMinutes(Math.ceil(now.getMinutes() / 30) * 30, 0, 0);
        
        const endTime = new Date(startTime);
        endTime.setMinutes(startTime.getMinutes() + 60);

        setSelectedTimeSlot({
          start: startTime.toISOString().slice(0, 16),
          end: endTime.toISOString().slice(0, 16)
        });
        setSelectedEvent(null);
        setIsEventModalOpen(true);
      }



      // Ctrl+H: Hoje
      if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        setCurrentDate(new Date());
      }

      // Setas para navegar
      if (e.key === 'ArrowLeft' && !e.ctrlKey) {
        e.preventDefault();
        const newDate = new Date(currentDate);
        if (view === 'day') {
          newDate.setDate(currentDate.getDate() - 1);
        } else if (view === 'week') {
          newDate.setDate(currentDate.getDate() - 7);
        } else {
          newDate.setMonth(currentDate.getMonth() - 1);
        }
        setCurrentDate(newDate);
      }

      if (e.key === 'ArrowRight' && !e.ctrlKey) {
        e.preventDefault();
        const newDate = new Date(currentDate);
        if (view === 'day') {
          newDate.setDate(currentDate.getDate() + 1);
        } else if (view === 'week') {
          newDate.setDate(currentDate.getDate() + 7);
        } else {
          newDate.setMonth(currentDate.getMonth() + 1);
        }
        setCurrentDate(newDate);
      }

      // ESC: Fechar modais
      if (e.key === 'Escape') {
        if (isEventModalOpen) {
          handleCloseEventModal();
        }
      }

      // Ctrl+B: Toggle sidebar
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentDate, view, isEventModalOpen, toggleSidebar]);

  // Mock data - será substituído por dados reais do backend
  useEffect(() => {
    const loadMockData = () => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);

      const mockEvents = [
        // AGENDA LOTADA DE HOJE - TODOS OS PROFISSIONAIS
        
        // 09:00 - 6 eventos simultâneos (todos os profissionais)
        {
          id: '1',
          title: 'Banho e Tosa - Rex',
          description: 'Banho completo com tosa higiênica',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
          client: { id: '1', name: 'João Santos' },
          pet: { id: '1', name: 'Rex' },
          service: { id: '1', name: 'Banho e Tosa', color: '#4285F4' },
          professional: { id: '1', name: 'Ana Silva', color: '#4285F4' },
          isRecurring: false
        },
        {
          id: '2',
          title: 'Banho Completo - Luna',
          description: 'Banho com shampoo especial',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
          client: { id: '2', name: 'Maria Silva' },
          pet: { id: '2', name: 'Luna' },
          service: { id: '2', name: 'Banho Completo', color: '#34A853' },
          professional: { id: '2', name: 'Carlos Santos', color: '#34A853' },
          isRecurring: false
        },
        {
          id: '3',
          title: 'Tosa Higiênica - Thor',
          description: 'Apenas tosa higiênica',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30),
          client: { id: '3', name: 'Pedro Costa' },
          pet: { id: '3', name: 'Thor' },
          service: { id: '3', name: 'Tosa Higiênica', color: '#FBBC04' },
          professional: { id: '3', name: 'Maria Costa', color: '#FBBC04' },
          isRecurring: false
        },
        {
          id: '4',
          title: 'Banho e Tosa - Max',
          description: 'Banho completo com tosa',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
          client: { id: '4', name: 'Ana Oliveira' },
          pet: { id: '4', name: 'Max' },
          service: { id: '1', name: 'Banho e Tosa', color: '#4285F4' },
          professional: { id: '4', name: 'João Oliveira', color: '#EA4335' },
          isRecurring: false
        },
        {
          id: '5',
          title: 'Banho Completo - Bella',
          description: 'Banho com tratamento especial',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
          client: { id: '5', name: 'Carlos Ferreira' },
          pet: { id: '5', name: 'Bella' },
          service: { id: '2', name: 'Banho Completo', color: '#34A853' },
          professional: { id: '5', name: 'Fernanda Lima', color: '#9C27B0' },
          isRecurring: false
        },
        {
          id: '6',
          title: 'Tosa Higiênica - Rocky',
          description: 'Tosa higiênica e limpeza',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30),
          client: { id: '6', name: 'Fernanda Lima' },
          pet: { id: '6', name: 'Rocky' },
          service: { id: '3', name: 'Tosa Higiênica', color: '#FBBC04' },
          professional: { id: '6', name: 'Roberto Almeida', color: '#FF6B35' },
          isRecurring: false
        },

        // 09:30 - 6 eventos simultâneos
        {
          id: '7',
          title: 'Banho e Tosa - Zeus',
          description: 'Banho completo com tosa de raça grande',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
          client: { id: '7', name: 'Patricia Costa' },
          pet: { id: '7', name: 'Zeus' },
          service: { id: '1', name: 'Banho e Tosa', color: '#4285F4' },
          professional: { id: '1', name: 'Ana Silva', color: '#4285F4' },
          isRecurring: false
        },
        {
          id: '8',
          title: 'Banho Completo - Mia',
          description: 'Banho com tratamento para pelo branco',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
          client: { id: '8', name: 'Ricardo Oliveira' },
          pet: { id: '8', name: 'Mia' },
          service: { id: '2', name: 'Banho Completo', color: '#34A853' },
          professional: { id: '2', name: 'Carlos Santos', color: '#34A853' },
          isRecurring: false
        },
        {
          id: '9',
          title: 'Tosa Higiênica - Duke',
          description: 'Tosa higiênica e corte de unhas',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
          client: { id: '9', name: 'Sofia Martins' },
          pet: { id: '9', name: 'Duke' },
          service: { id: '3', name: 'Tosa Higiênica', color: '#FBBC04' },
          professional: { id: '3', name: 'Maria Costa', color: '#FBBC04' },
          isRecurring: false
        },
        {
          id: '10',
          title: 'Banho e Tosa - Lola',
          description: 'Banho completo com tosa de raça pequena',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
          client: { id: '10', name: 'Marcos Silva' },
          pet: { id: '10', name: 'Lola' },
          service: { id: '1', name: 'Banho e Tosa', color: '#4285F4' },
          professional: { id: '4', name: 'João Oliveira', color: '#EA4335' },
          isRecurring: false
        },
        {
          id: '11',
          title: 'Banho Completo - Toby',
          description: 'Banho com tratamento para pelo longo',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
          client: { id: '11', name: 'Juliana Costa' },
          pet: { id: '11', name: 'Toby' },
          service: { id: '2', name: 'Banho Completo', color: '#34A853' },
          professional: { id: '5', name: 'Fernanda Lima', color: '#9C27B0' },
          isRecurring: false
        },
        {
          id: '12',
          title: 'Tosa Higiênica - Nina',
          description: 'Tosa higiênica e escovação',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
          client: { id: '12', name: 'Roberto Santos' },
          pet: { id: '12', name: 'Nina' },
          service: { id: '3', name: 'Tosa Higiênica', color: '#FBBC04' },
          professional: { id: '6', name: 'Roberto Almeida', color: '#FF6B35' },
          isRecurring: false
        },

        // 10:00 - 6 eventos simultâneos
        {
          id: '13',
          title: 'Banho e Tosa - Charlie',
          description: 'Banho completo com tosa de raça média',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30),
          client: { id: '13', name: 'Amanda Lima' },
          pet: { id: '13', name: 'Charlie' },
          service: { id: '1', name: 'Banho e Tosa', color: '#4285F4' },
          professional: { id: '1', name: 'Ana Silva', color: '#4285F4' },
          isRecurring: false
        },
        {
          id: '14',
          title: 'Banho Completo - Daisy',
          description: 'Banho com tratamento para pelo curto',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
          client: { id: '14', name: 'Fernando Costa' },
          pet: { id: '14', name: 'Daisy' },
          service: { id: '2', name: 'Banho Completo', color: '#34A853' },
          professional: { id: '2', name: 'Carlos Santos', color: '#34A853' },
          isRecurring: false
        },
        {
          id: '15',
          title: 'Tosa Higiênica - Buddy',
          description: 'Tosa higiênica e limpeza de orelhas',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
          client: { id: '15', name: 'Carolina Silva' },
          pet: { id: '15', name: 'Buddy' },
          service: { id: '3', name: 'Tosa Higiênica', color: '#FBBC04' },
          professional: { id: '3', name: 'Maria Costa', color: '#FBBC04' },
          isRecurring: false
        },
        {
          id: '16',
          title: 'Banho e Tosa - Molly',
          description: 'Banho completo com tosa de raça pequena',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
          client: { id: '16', name: 'Lucas Oliveira' },
          pet: { id: '16', name: 'Molly' },
          service: { id: '1', name: 'Banho e Tosa', color: '#4285F4' },
          professional: { id: '4', name: 'João Oliveira', color: '#EA4335' },
          isRecurring: false
        },
        {
          id: '17',
          title: 'Banho Completo - Jack',
          description: 'Banho com tratamento para pelo branco',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
          client: { id: '17', name: 'Mariana Santos' },
          pet: { id: '17', name: 'Jack' },
          service: { id: '2', name: 'Banho Completo', color: '#34A853' },
          professional: { id: '5', name: 'Fernanda Lima', color: '#9C27B0' },
          isRecurring: false
        },
        {
          id: '18',
          title: 'Tosa Higiênica - Lucy',
          description: 'Tosa higiênica e corte de unhas',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
          client: { id: '18', name: 'Diego Costa' },
          pet: { id: '18', name: 'Lucy' },
          service: { id: '3', name: 'Tosa Higiênica', color: '#FBBC04' },
          professional: { id: '6', name: 'Roberto Almeida', color: '#FF6B35' },
          isRecurring: false
        },

        // Continuando com mais horários...
        // 10:30, 11:00, 11:30, 12:00, 12:30, 13:00, 13:30, 14:00, 14:30, 15:00, 15:30, 16:00, 16:30, 17:00, 17:30, 18:00
        // Cada horário com 6 eventos simultâneos (um para cada profissional)
        
        // 10:30 - 6 eventos
        {
          id: '19',
          title: 'Banho e Tosa - Cooper',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
          client: { id: '19', name: 'Gabriela Lima' },
          pet: { id: '19', name: 'Cooper' },
          service: { id: '1', name: 'Banho e Tosa', color: '#4285F4' },
          professional: { id: '1', name: 'Ana Silva', color: '#4285F4' },
          isRecurring: false
        },
        {
          id: '20',
          title: 'Banho Completo - Sadie',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30),
          client: { id: '20', name: 'Thiago Silva' },
          pet: { id: '20', name: 'Sadie' },
          service: { id: '2', name: 'Banho Completo', color: '#34A853' },
          professional: { id: '2', name: 'Carlos Santos', color: '#34A853' },
          isRecurring: false
        },
        {
          id: '21',
          title: 'Tosa Higiênica - Bailey',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
          client: { id: '21', name: 'Isabela Costa' },
          pet: { id: '21', name: 'Bailey' },
          service: { id: '3', name: 'Tosa Higiênica', color: '#FBBC04' },
          professional: { id: '3', name: 'Maria Costa', color: '#FBBC04' },
          isRecurring: false
        },
        {
          id: '22',
          title: 'Banho e Tosa - Tucker',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
          client: { id: '22', name: 'Rafael Oliveira' },
          pet: { id: '22', name: 'Tucker' },
          service: { id: '1', name: 'Banho e Tosa', color: '#4285F4' },
          professional: { id: '4', name: 'João Oliveira', color: '#EA4335' },
          isRecurring: false
        },
        {
          id: '23',
          title: 'Banho Completo - Zoe',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30),
          client: { id: '23', name: 'Camila Santos' },
          pet: { id: '23', name: 'Zoe' },
          service: { id: '2', name: 'Banho Completo', color: '#34A853' },
          professional: { id: '5', name: 'Fernanda Lima', color: '#9C27B0' },
          isRecurring: false
        },
        {
          id: '24',
          title: 'Tosa Higiênica - Bear',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
          client: { id: '24', name: 'Bruno Lima' },
          pet: { id: '24', name: 'Bear' },
          service: { id: '3', name: 'Tosa Higiênica', color: '#FBBC04' },
          professional: { id: '6', name: 'Roberto Almeida', color: '#FF6B35' },
          isRecurring: false
        },

        // 11:00 - 6 eventos
        {
          id: '25',
          title: 'Banho e Tosa - Bentley',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 30),
          client: { id: '25', name: 'Valentina Costa' },
          pet: { id: '25', name: 'Bentley' },
          service: { id: '1', name: 'Banho e Tosa', color: '#4285F4' },
          professional: { id: '1', name: 'Ana Silva', color: '#4285F4' },
          isRecurring: false
        },
        {
          id: '26',
          title: 'Banho Completo - Stella',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
          client: { id: '26', name: 'Leonardo Silva' },
          pet: { id: '26', name: 'Stella' },
          service: { id: '2', name: 'Banho Completo', color: '#34A853' },
          professional: { id: '2', name: 'Carlos Santos', color: '#34A853' },
          isRecurring: false
        },
        {
          id: '27',
          title: 'Tosa Higiênica - Oliver',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30),
          client: { id: '27', name: 'Sophia Oliveira' },
          pet: { id: '27', name: 'Oliver' },
          service: { id: '3', name: 'Tosa Higiênica', color: '#FBBC04' },
          professional: { id: '3', name: 'Maria Costa', color: '#FBBC04' },
          isRecurring: false
        },
        {
          id: '28',
          title: 'Banho e Tosa - Ruby',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 30),
          client: { id: '28', name: 'Matheus Santos' },
          pet: { id: '28', name: 'Ruby' },
          service: { id: '1', name: 'Banho e Tosa', color: '#4285F4' },
          professional: { id: '4', name: 'João Oliveira', color: '#EA4335' },
          isRecurring: false
        },
        {
          id: '29',
          title: 'Banho Completo - Winston',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
          client: { id: '29', name: 'Larissa Lima' },
          pet: { id: '29', name: 'Winston' },
          service: { id: '2', name: 'Banho Completo', color: '#34A853' },
          professional: { id: '5', name: 'Fernanda Lima', color: '#9C27B0' },
          isRecurring: false
        },
        {
          id: '30',
          title: 'Tosa Higiênica - Penny',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30),
          client: { id: '30', name: 'Eduardo Costa' },
          pet: { id: '30', name: 'Penny' },
          service: { id: '3', name: 'Tosa Higiênica', color: '#FBBC04' },
          professional: { id: '6', name: 'Roberto Almeida', color: '#FF6B35' },
          isRecurring: false
        },

        // Eventos de amanhã (para comparação)
        {
          id: '31',
          title: 'Banho Completo - Zeus',
          description: 'Banho com tratamento especial',
          start: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 10, 0),
          end: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 11, 30),
          client: { id: '31', name: 'Patricia Costa' },
          pet: { id: '31', name: 'Zeus' },
          service: { id: '2', name: 'Banho Completo', color: '#34A853' },
          professional: { id: '5', name: 'Fernanda Lima', color: '#9C27B0' },
          isRecurring: false
        },

        // Mais eventos para hoje - 12:00
        {
          id: '32',
          title: 'Banho e Tosa - Charlie',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 30),
          client: { id: '32', name: 'Amanda Costa' },
          pet: { id: '32', name: 'Charlie' },
          service: { id: '1', name: 'Banho e Tosa', color: '#4285F4' },
          professional: { id: '1', name: 'Ana Silva', color: '#4285F4' },
          isRecurring: false
        },
        {
          id: '33',
          title: 'Banho Completo - Daisy',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
          client: { id: '33', name: 'Ricardo Silva' },
          pet: { id: '33', name: 'Daisy' },
          service: { id: '2', name: 'Banho Completo', color: '#34A853' },
          professional: { id: '2', name: 'Carlos Santos', color: '#34A853' },
          isRecurring: false
        },
        {
          id: '34',
          title: 'Tosa Higiênica - Milo',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 30),
          client: { id: '34', name: 'Juliana Lima' },
          pet: { id: '34', name: 'Milo' },
          service: { id: '3', name: 'Tosa Higiênica', color: '#FBBC04' },
          professional: { id: '3', name: 'Maria Costa', color: '#FBBC04' },
          isRecurring: false
        },
        {
          id: '35',
          title: 'Banho e Tosa - Lucy',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 30),
          client: { id: '35', name: 'Felipe Oliveira' },
          pet: { id: '35', name: 'Lucy' },
          service: { id: '1', name: 'Banho e Tosa', color: '#4285F4' },
          professional: { id: '4', name: 'João Oliveira', color: '#EA4335' },
          isRecurring: false
        },
        {
          id: '36',
          title: 'Banho Completo - Buddy',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
          client: { id: '36', name: 'Carolina Santos' },
          pet: { id: '36', name: 'Buddy' },
          service: { id: '2', name: 'Banho Completo', color: '#34A853' },
          professional: { id: '5', name: 'Fernanda Lima', color: '#9C27B0' },
          isRecurring: false
        },
        {
          id: '37',
          title: 'Tosa Higiênica - Lola',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 30),
          client: { id: '37', name: 'Daniel Costa' },
          pet: { id: '37', name: 'Lola' },
          service: { id: '3', name: 'Tosa Higiênica', color: '#FBBC04' },
          professional: { id: '6', name: 'Roberto Almeida', color: '#FF6B35' },
          isRecurring: false
        },

        // Mais eventos para hoje - 12:30
        {
          id: '38',
          title: 'Banho e Tosa - Jack',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 30),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
          client: { id: '38', name: 'Mariana Silva' },
          pet: { id: '38', name: 'Jack' },
          service: { id: '1', name: 'Banho e Tosa', color: '#4285F4' },
          professional: { id: '1', name: 'Ana Silva', color: '#4285F4' },
          isRecurring: false
        },
        {
          id: '39',
          title: 'Banho Completo - Sophie',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 30),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 30),
          client: { id: '39', name: 'André Lima' },
          pet: { id: '39', name: 'Sophie' },
          service: { id: '2', name: 'Banho Completo', color: '#34A853' },
          professional: { id: '2', name: 'Carlos Santos', color: '#34A853' },
          isRecurring: false
        },
        {
          id: '40',
          title: 'Tosa Higiênica - Oscar',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 30),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
          client: { id: '40', name: 'Beatriz Costa' },
          pet: { id: '40', name: 'Oscar' },
          service: { id: '3', name: 'Tosa Higiênica', color: '#FBBC04' },
          professional: { id: '3', name: 'Maria Costa', color: '#FBBC04' },
          isRecurring: false
        },
        {
          id: '41',
          title: 'Banho e Tosa - Ruby',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 30),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
          client: { id: '41', name: 'Lucas Oliveira' },
          pet: { id: '41', name: 'Ruby' },
          service: { id: '1', name: 'Banho e Tosa', color: '#4285F4' },
          professional: { id: '4', name: 'João Oliveira', color: '#EA4335' },
          isRecurring: false
        },
        {
          id: '42',
          title: 'Banho Completo - Winston',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 30),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 30),
          client: { id: '42', name: 'Fernanda Santos' },
          pet: { id: '42', name: 'Winston' },
          service: { id: '2', name: 'Banho Completo', color: '#34A853' },
          professional: { id: '5', name: 'Fernanda Lima', color: '#9C27B0' },
          isRecurring: false
        },
        {
          id: '43',
          title: 'Tosa Higiênica - Penny',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 30),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
          client: { id: '43', name: 'Roberto Costa' },
          pet: { id: '43', name: 'Penny' },
          service: { id: '3', name: 'Tosa Higiênica', color: '#FBBC04' },
          professional: { id: '6', name: 'Roberto Almeida', color: '#FF6B35' },
          isRecurring: false
        },

        // Eventos para outros dias da semana (para testar visualizações)
        // Dia +2
        {
          id: '44',
          title: 'Banho e Tosa - Shadow',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 9, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 10, 30),
          client: { id: '44', name: 'Lucas Mendes' },
          pet: { id: '44', name: 'Shadow' },
          service: { id: '1', name: 'Banho e Tosa', color: '#4285F4' },
          professional: { id: '1', name: 'Ana Silva', color: '#4285F4' },
          isRecurring: false
        },
        {
          id: '45',
          title: 'Banho Completo - Nova',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 14, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 15, 0),
          client: { id: '45', name: 'Beatriz Alves' },
          pet: { id: '45', name: 'Nova' },
          service: { id: '2', name: 'Banho Completo', color: '#34A853' },
          professional: { id: '2', name: 'Carlos Santos', color: '#34A853' },
          isRecurring: false
        },

        // Dia +3
        {
          id: '46',
          title: 'Tosa Higiênica - Ace',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 10, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 10, 30),
          client: { id: '46', name: 'Marcelo Costa' },
          pet: { id: '46', name: 'Ace' },
          service: { id: '3', name: 'Tosa Higiênica', color: '#FBBC04' },
          professional: { id: '3', name: 'Maria Costa', color: '#FBBC04' },
          isRecurring: false
        },
        {
          id: '47',
          title: 'Banho e Tosa - Ruby',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 15, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 16, 30),
          client: { id: '47', name: 'Vanessa Lima' },
          pet: { id: '47', name: 'Ruby' },
          service: { id: '1', name: 'Banho e Tosa', color: '#4285F4' },
          professional: { id: '4', name: 'João Oliveira', color: '#EA4335' },
          isRecurring: false
        },

        // Dia +5 (próxima semana)
        {
          id: '48',
          title: 'Banho Completo - Duke',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 11, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 12, 0),
          client: { id: '48', name: 'André Silva' },
          pet: { id: '48', name: 'Duke' },
          service: { id: '2', name: 'Banho Completo', color: '#34A853' },
          professional: { id: '5', name: 'Fernanda Lima', color: '#9C27B0' },
          isRecurring: false
        },
        {
          id: '49',
          title: 'Tosa Higiênica - Scout',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 16, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 16, 30),
          client: { id: '49', name: 'Renata Costa' },
          pet: { id: '49', name: 'Scout' },
          service: { id: '3', name: 'Tosa Higiênica', color: '#FBBC04' },
          professional: { id: '6', name: 'Roberto Almeida', color: '#FF6B35' },
          isRecurring: false
        },

        // Dia +8 (próximo mês)
        {
          id: '50',
          title: 'Banho e Tosa - Atlas',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8, 9, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8, 10, 30),
          client: { id: '50', name: 'Paulo Mendes' },
          pet: { id: '50', name: 'Atlas' },
          service: { id: '1', name: 'Banho e Tosa', color: '#4285F4' },
          professional: { id: '1', name: 'Ana Silva', color: '#4285F4' },
          isRecurring: false
        },
        {
          id: '51',
          title: 'Banho Completo - Echo',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8, 13, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8, 14, 0),
          client: { id: '51', name: 'Carla Santos' },
          pet: { id: '51', name: 'Echo' },
          service: { id: '2', name: 'Banho Completo', color: '#34A853' },
          professional: { id: '2', name: 'Carlos Santos', color: '#34A853' },
          isRecurring: false
        }
      ];
      
      setEvents(mockEvents);
    };
    
    setTimeout(loadMockData, 100);
  }, []);

  const handleCreateEvent = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setSelectedEvent(null);
    setIsEventModalOpen(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setSelectedTimeSlot(null);
    setIsEventModalOpen(true);
  };

  const handleEventUpdate = (updatedEvent) => {
    setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  const handleSaveEvent = (eventData) => {
    if (selectedEvent) {
      // Editar evento existente
      setEvents(prev => prev.map(e => e.id === selectedEvent.id ? { ...e, ...eventData } : e));
    } else {
      // Criar novo evento
      const newEvent = {
        id: Date.now().toString(),
        ...eventData
      };
      setEvents(prev => [...prev, newEvent]);
    }
    setIsEventModalOpen(false);
    setSelectedEvent(null);
    setSelectedTimeSlot(null);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    setIsEventModalOpen(false);
    setSelectedEvent(null);
  };

  // Filtrar eventos baseado nos filtros selecionados
  const filteredEvents = events.filter(event => {
    // Filtro por serviço
    const serviceMatch = selectedServices.includes('all') || 
      selectedServices.includes(event.service?.id);

    // Filtro por profissional
    const professionalMatch = selectedProfessionals.includes('all') || 
      selectedProfessionals.includes(event.professional?.id || 'none');

    return serviceMatch && professionalMatch;
  });

  // Componente para visualização mobile (lista de eventos do dia)
  const MobileDayView = () => {
    const today = new Date();
    const todayEvents = filteredEvents.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === today.toDateString();
    });

    const formatTime = (date) => {
      return new Date(date).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    };

    const getEventColor = (event) => {
      const service = services.find(s => s.id === event.service?.id);
      return service?.color || '#4285F4';
    };

    return (
      <div className="h-full bg-gray-50 dark:bg-gray-900 overflow-y-auto pb-20">
        {/* Header do dia */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {today.toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {todayEvents.length} agendamento{todayEvents.length !== 1 ? 's' : ''} hoje
              </p>
            </div>
          </div>
        </div>

        {/* Lista de eventos */}
        <div className="p-4 space-y-3">
          {todayEvents.length === 0 ? (
            <div className="text-center py-8">
              <span className="material-icons text-gray-400 text-4xl mb-4">event_busy</span>
              <p className="text-gray-500 dark:text-gray-400">Nenhum agendamento para hoje</p>
            </div>
          ) : (
            todayEvents
              .sort((a, b) => new Date(a.start) - new Date(b.start))
              .map((event) => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleEventClick(event)}
                >
                  <div className="flex items-start space-x-3">
                    {/* Indicador de tempo */}
                    <div className="flex-shrink-0">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getEventColor(event) }}
                      />
                    </div>
                    
                    {/* Conteúdo do evento */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {event.title}
                        </h3>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {formatTime(event.start)} - {formatTime(event.end)}
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        {event.client && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <span className="material-icons text-xs mr-1">person</span>
                            {event.client.name}
                          </p>
                        )}
                        {event.pet && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <span className="material-icons text-xs mr-1">pets</span>
                            {event.pet.name}
                          </p>
                        )}
                        {event.service && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <span className="material-icons text-xs mr-1">spa</span>
                            {event.service.name}
                          </p>
                        )}
                        {event.professional && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <span className="material-icons text-xs mr-1">work</span>
                            {event.professional.name}
                          </p>
                        )}
                      </div>
                      
                      {event.notes && (
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 italic">
                          "{event.notes}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    );
  };

  // Componente para visualização mobile com navegação
  const MobileCalendarView = () => {
    const getViewTitle = () => {
      if (view === 'day') {
        return currentDate.toLocaleDateString('pt-BR', { 
          weekday: 'long', 
          day: 'numeric', 
          month: 'long' 
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
      } else if (view === 'month') {
        return currentDate.toLocaleDateString('pt-BR', { 
          month: 'long', 
          year: 'numeric' 
        });
      } else {
        return 'Agenda';
      }
    };

    const getEventsForView = () => {
      if (view === 'day') {
        return filteredEvents.filter(event => {
          const eventDate = new Date(event.start);
          return eventDate.toDateString() === currentDate.toDateString();
        });
      } else if (view === 'week') {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        
        return filteredEvents.filter(event => {
          const eventDate = new Date(event.start);
          return eventDate >= startOfWeek && eventDate <= endOfWeek;
        });
      } else if (view === 'month') {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        
        return filteredEvents.filter(event => {
          const eventDate = new Date(event.start);
          return eventDate >= startOfMonth && eventDate <= endOfMonth;
        });
      } else {
        // Agenda - todos os eventos futuros
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return filteredEvents.filter(event => {
          const eventDate = new Date(event.start);
          return eventDate >= today;
        });
      }
    };

    const formatTime = (date) => {
      return new Date(date).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    };

    const getEventColor = (event) => {
      const service = services.find(s => s.id === event.service?.id);
      return service?.color || '#4285F4';
    };

    const events = getEventsForView();

    return (
      <div className="h-full bg-gray-50 dark:bg-gray-900 overflow-y-auto pb-20">
        {/* Header com navegação */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {getViewTitle()}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {events.length} agendamento{events.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>


        </div>

        {/* Lista de eventos */}
        <div className="p-4 space-y-3">
          {events.length === 0 ? (
            <div className="text-center py-8">
              <span className="material-icons text-gray-400 text-4xl mb-4">event_busy</span>
              <p className="text-gray-500 dark:text-gray-400">
                {view === 'day' ? 'Nenhum agendamento para hoje' :
                 view === 'week' ? 'Nenhum agendamento nesta semana' :
                 view === 'month' ? 'Nenhum agendamento neste mês' :
                 'Nenhum agendamento futuro'}
              </p>
            </div>
          ) : (
            events
              .sort((a, b) => new Date(a.start) - new Date(b.start))
              .map((event) => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleEventClick(event)}
                >
                  <div className="flex items-start space-x-3">
                    {/* Indicador de tempo */}
                    <div className="flex-shrink-0">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getEventColor(event) }}
                      />
                    </div>
                    
                    {/* Conteúdo do evento */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {event.title}
                        </h3>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {view === 'agenda' ? formatDate(event.start) : formatTime(event.start)}
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        {event.client && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <span className="material-icons text-xs mr-1">person</span>
                            {event.client.name}
                          </p>
                        )}
                        {event.pet && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <span className="material-icons text-xs mr-1">pets</span>
                            {event.pet.name}
                          </p>
                        )}
                        {event.service && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <span className="material-icons text-xs mr-1">spa</span>
                            {event.service.name}
                          </p>
                        )}
                        {event.professional && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <span className="material-icons text-xs mr-1">work</span>
                            {event.professional.name}
                          </p>
                        )}
                      </div>
                      
                      {event.notes && (
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 italic">
                          "{event.notes}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    );
  };


  return (
    <div className="h-full flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
      {/* Overlay para mobile quando sidebar estiver aberta */}
      {sidebarVisible && !isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity lg:hidden"
          onClick={toggleSidebar}
          aria-label="Fechar sidebar"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleSidebar();
            }
          }}
        />
      )}
      {/* Conteúdo principal - otimizado */}
      <div className={`flex-1 flex flex-col min-h-0 overflow-hidden transition-all duration-300 ease-in-out ${!sidebarVisible ? 'lg:mr-0' : ''}`}>
        {/* Cabeçalho do calendário - mais compacto */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex-shrink-0">
          <CalendarHeader
            currentDate={currentDate}
            view={view}
            onDateChange={setCurrentDate}
            onViewChange={setView}
            onCreateEvent={handleCreateEvent}
            sidebarVisible={sidebarVisible}
            onToggleSidebar={toggleSidebar}
            showCreateButton={!isMobile}
            isMobile={isMobile}
          />
        </div>

        {/* Visualização do calendário - mais espaço */}
        <div 
          className="flex-1 overflow-hidden bg-white dark:bg-gray-800"
          role="main"
          aria-label={`Visualização ${view === 'month' ? 'mensal' : view === 'week' ? 'semanal' : view === 'day' ? 'diária' : 'agenda'} do calendário`}
        >
          {isMobile ? (
            <MobileCalendarView />
          ) : (
            <CalendarView
              view={view}
              currentDate={currentDate}
              events={filteredEvents}
              onEventClick={handleEventClick}
              onEventUpdate={handleEventUpdate}
              onCreateEvent={handleCreateEvent}
            />
          )}
        </div>
      </div>

      {/* Sidebar - lado direito - apenas no desktop */}
      {!isMobile && (
        <div 
          className={`
            fixed top-0 right-0 h-full lg:static lg:h-auto
            w-full lg:w-72 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex-shrink-0 shadow-lg overflow-hidden
            transition-[width,transform] duration-300 ease-in-out z-50
            ${sidebarVisible ? 'translate-x-0 lg:w-72' : 'translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden'}
          `}
          role="complementary"
          aria-label="Painel lateral do calendário"
        >
          <CalendarSidebar
            currentDate={currentDate}
            onDateSelect={setCurrentDate}
            selectedServices={selectedServices}
            onServiceToggle={handleServiceToggle}
            services={services}
            selectedProfessionals={selectedProfessionals}
            onProfessionalToggle={handleProfessionalToggle}
            professionals={professionals}
          />
        </div>
      )}

      {/* Botão flutuante para criar evento - apenas no mobile */}
      {isMobile && (
        <button
          onClick={handleCreateEvent}
          className="fixed bottom-20 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-10"
          aria-label="Criar novo agendamento"
        >
          <span className="material-icons">add</span>
        </button>
      )}

      {/* Modal de evento */}
      {isEventModalOpen && (
        <EventModal
          event={selectedEvent}
          timeSlot={selectedTimeSlot}
          onClose={handleCloseEventModal}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          professionals={professionals}
        />
      )}
    </div>
  );
};

export default CalendarPage; 