import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../Button/Button';
import SummaryCard from './SummaryCard';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalClients: 0,
    totalPets: 0,
    todayAppointments: 0,
    monthlyRevenue: 0
  });

  // Mock data - será substituído por dados reais do backend
  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalClients: 156,
        totalPets: 203,
        todayAppointments: 8,
        monthlyRevenue: 15420.50
      });
    }, 500);
  }, []);

  const quickActions = [
    {
      title: 'Cadastrar Cliente',
      icon: 'person_add',
      href: '/clientes'
    },
    {
      title: 'Cadastrar Pet',
      icon: 'pets',
      href: '/pets'
    },
    {
      title: 'Agendar Serviço',
      icon: 'event',
      href: '/agendamentos'
    }
  ];

  const todayAppointments = [
    { time: '14:00', service: 'Banho e Tosa', pet: 'Rex', client: 'João Santos' },
    { time: '16:30', service: 'Banho Completo', pet: 'Luna', client: 'Maria Silva' }
  ];

  const performanceMetrics = [
    { label: 'Tempo Médio B&T', value: '45 min', icon: 'schedule' },
    { label: 'Ocupação B&T Hoje', value: '75%', icon: 'trending_up' },
    { label: 'Receita B&T Hoje', value: 'R$ 1.250', icon: 'account_balance_wallet' }
  ];

  return (
    <div className="w-full h-full bg-gray-50 dark:bg-gray-950 flex flex-col" role="main" aria-label="Dashboard do pet shop">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-6xl mx-auto space-y-8">
          {/* Header melhorado */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1" id="dashboard-title">
              Visão Geral
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm" aria-describedby="dashboard-title">
              Controle total do seu pet shop em um só lugar
            </p>
          </div>

          {/* Stats Cards com títulos melhorados */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" role="region" aria-labelledby="dashboard-title">
            <SummaryCard
              title="Clientes Ativos"
              value={stats.totalClients}
              icon="group"
              gradient="blue"
              onClick={() => navigate('/clientes')}
            />
            <SummaryCard
              title="Pets Cadastrados"
              value={stats.totalPets}
              icon="pets"
              gradient="green"
              onClick={() => navigate('/pets')}
            />
            <SummaryCard
              title="Agendamentos Hoje"
              value={stats.todayAppointments}
              icon="event"
              gradient="purple"
              onClick={() => navigate('/agendamentos')}
            />
            <SummaryCard
              title="Receita do Mês"
              value={`R$ ${stats.monthlyRevenue.toLocaleString('pt-BR')}`}
              icon="account_balance_wallet"
              gradient="yellow"
            />
          </div>

          {/* Métricas de Performance */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4" id="performance-title">
              Performance Banho & Tosa Hoje
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" role="region" aria-labelledby="performance-title">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-icons text-gray-500 dark:text-gray-400 text-lg" aria-hidden="true">
                        {metric.icon}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {metric.label}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {metric.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ações rápidas com títulos melhorados */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4" id="quick-actions-title">
              Acesso Direto
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" role="region" aria-labelledby="quick-actions-title">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  fullWidth
                  onClick={() => navigate(action.href)}
                  className="h-16 flex items-center justify-center gap-3 text-lg"
                  aria-label={`${action.title} - Navegar para ${action.href}`}
                >
                  <span className="material-icons" aria-hidden="true">{action.icon}</span>
                  {action.title}
                </Button>
              ))}
            </div>
          </div>

          {/* Agendamentos de hoje com título melhorado */}
          {todayAppointments.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4" id="appointments-title">
                Próximos Serviços
              </h2>
              <Card className="border-0 bg-white dark:bg-gray-800">
                <div className="space-y-3" role="region" aria-labelledby="appointments-title">
                  {todayAppointments.map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="material-icons text-purple-600" aria-hidden="true">event</span>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-100">
                            {appointment.service} - {appointment.pet}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {appointment.client}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                        {appointment.time}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 