import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renderiza o card com título', () => {
    render(<Card title="Teste Card">Conteúdo do card</Card>);
    
    expect(screen.getByText('Teste Card')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo do card')).toBeInTheDocument();
  });

  it('renderiza o card sem título', () => {
    render(<Card>Conteúdo do card</Card>);
    
    expect(screen.getByText('Conteúdo do card')).toBeInTheDocument();
  });

  it('renderiza o card com ações', () => {
    const actions = <button>Ver todos</button>;
    render(<Card title="Card com Ações" actions={actions}>Conteúdo</Card>);
    
    expect(screen.getByText('Card com Ações')).toBeInTheDocument();
    expect(screen.getByText('Ver todos')).toBeInTheDocument();
  });

  it('renderiza o card com variantes', () => {
    const { rerender } = render(<Card variant="default">Conteúdo</Card>);
    expect(screen.getByText('Conteúdo')).toBeInTheDocument();

    rerender(<Card variant="outlined">Conteúdo</Card>);
    expect(screen.getByText('Conteúdo')).toBeInTheDocument();

    rerender(<Card variant="elevated">Conteúdo</Card>);
    expect(screen.getByText('Conteúdo')).toBeInTheDocument();
  });

  it('renderiza o card com tamanhos', () => {
    const { rerender } = render(<Card size="sm">Conteúdo</Card>);
    expect(screen.getByText('Conteúdo')).toBeInTheDocument();

    rerender(<Card size="md">Conteúdo</Card>);
    expect(screen.getByText('Conteúdo')).toBeInTheDocument();

    rerender(<Card size="lg">Conteúdo</Card>);
    expect(screen.getByText('Conteúdo')).toBeInTheDocument();
  });
}); 