import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from './Header';

// Mock do Material Icons
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useRef: () => ({ current: null }),
  };
});

describe('Header', () => {
  const defaultProps = {
    user: { nome: "Dra. Ana Paula", cargo: "Veterinária", fotoUrl: "/assets/ana.jpg" },
    breadcrumbs: [{ label: "Dashboard", href: "/" }, { label: "Clientes", href: "/clientes" }],
    notifications: [{ id: 1, title: "Novo agendamento", read: false, href: "/agendamentos/1" }],
  };

  it('renderiza o header com informações do usuário', () => {
    render(<Header {...defaultProps} />);
    
    expect(screen.getByText('Dra. Ana Paula')).toBeInTheDocument();
    expect(screen.getByText('Veterinária')).toBeInTheDocument();
  });

  it('renderiza breadcrumbs corretamente', () => {
    render(<Header {...defaultProps} />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Clientes')).toBeInTheDocument();
  });

  it('renderiza o logo e nome da empresa', () => {
    render(<Header {...defaultProps} />);
    
    expect(screen.getByText('Cisne Branco ERP')).toBeInTheDocument();
  });

  it('renderiza campo de busca', () => {
    render(<Header {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Buscar clientes, pets, vendas...');
    expect(searchInput).toBeInTheDocument();
  });

  it('renderiza botão de notificações', () => {
    render(<Header {...defaultProps} />);
    
    const notificationButton = screen.getByLabelText('Notificações');
    expect(notificationButton).toBeInTheDocument();
  });

  it('renderiza botão de tema', () => {
    render(<Header {...defaultProps} />);
    
    const themeButton = screen.getByLabelText('Alternar tema');
    expect(themeButton).toBeInTheDocument();
  });

  it('renderiza menu do usuário', () => {
    render(<Header {...defaultProps} />);
    
    const userMenuButton = screen.getByLabelText('Menu do usuário');
    expect(userMenuButton).toBeInTheDocument();
  });
}); 