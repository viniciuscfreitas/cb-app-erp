import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DashboardPage from './DashboardPage';

// Mock do useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Configuração global para Jest
/* global jest, describe, test, expect, beforeEach */

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('DashboardPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renderiza o título do Dashboard', () => {
    renderWithRouter(<DashboardPage />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('renderiza cards de estatísticas', () => {
    renderWithRouter(<DashboardPage />);
    
    // Aguarda os dados mockados carregarem
    setTimeout(() => {
      expect(screen.getByText('Total de Clientes')).toBeInTheDocument();
      expect(screen.getByText('Total de Pets')).toBeInTheDocument();
      expect(screen.getByText('Agendamentos Hoje')).toBeInTheDocument();
      expect(screen.getByText('Receita Mensal')).toBeInTheDocument();
    }, 600);
  });

  test('renderiza seções principais', () => {
    renderWithRouter(<DashboardPage />);
    
    expect(screen.getByText('Ações Rápidas')).toBeInTheDocument();
    expect(screen.getByText('Atividades Recentes')).toBeInTheDocument();
    expect(screen.getByText('Navegação Rápida')).toBeInTheDocument();
  });

  test('renderiza ações rápidas', () => {
    renderWithRouter(<DashboardPage />);
    
    expect(screen.getByText('Novo Cliente')).toBeInTheDocument();
    expect(screen.getByText('Novo Pet')).toBeInTheDocument();
    expect(screen.getByText('Agendamento')).toBeInTheDocument();
    expect(screen.getByText('Venda')).toBeInTheDocument();
  });

  test('renderiza atividades recentes', () => {
    renderWithRouter(<DashboardPage />);
    
    expect(screen.getByText(/Novo cliente cadastrado/)).toBeInTheDocument();
    expect(screen.getByText(/Pet "Rex" adicionado/)).toBeInTheDocument();
    expect(screen.getByText(/Agendamento: Banho e tosa/)).toBeInTheDocument();
    expect(screen.getByText(/Venda: Ração premium/)).toBeInTheDocument();
  });
}); 