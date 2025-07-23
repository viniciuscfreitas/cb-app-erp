import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { EstoqueProvider } from '../../contexts/EstoqueContext';
import EstoquePage from './EstoquePage';
import { describe, test, expect } from 'vitest';

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <EstoqueProvider>
        {component}
      </EstoqueProvider>
    </BrowserRouter>
  );
};

describe('EstoquePage', () => {
  test('renderiza a página de estoque com título', () => {
    renderWithProviders(<EstoquePage />);
    expect(screen.getByText('Estoque')).toBeInTheDocument();
  });

  test('exibe botões para criar novo produto, categoria e fornecedor', () => {
    renderWithProviders(<EstoquePage />);
    expect(screen.getByText('Novo Produto')).toBeInTheDocument();
    expect(screen.getByText('Nova Categoria')).toBeInTheDocument();
    expect(screen.getByText('Novo Fornecedor')).toBeInTheDocument();
  });

  test('exibe tabela de produtos', () => {
    renderWithProviders(<EstoquePage />);
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Categoria')).toBeInTheDocument();
    expect(screen.getByText('Quantidade')).toBeInTheDocument();
    expect(screen.getByText('Preço')).toBeInTheDocument();
    expect(screen.getByText('Fornecedor')).toBeInTheDocument();
    expect(screen.getByText('Ações')).toBeInTheDocument();
  });

  test('exibe produtos mockados na tabela', () => {
    renderWithProviders(<EstoquePage />);
    expect(screen.getByText('Ração Premium Cães')).toBeInTheDocument();
    expect(screen.getByText('Shampoo para Gatos')).toBeInTheDocument();
    expect(screen.getByText('Brinquedo Interativo')).toBeInTheDocument();
  });

  test('abre formulário de novo produto ao clicar no botão', async () => {
    renderWithProviders(<EstoquePage />);
    
    fireEvent.click(screen.getByText('Novo Produto'));
    
    await waitFor(() => {
      expect(screen.getByText('Novo Produto')).toBeInTheDocument();
      expect(screen.getByText('Nome do Produto')).toBeInTheDocument();
    });
  });

  test('abre formulário de nova categoria ao clicar no botão', async () => {
    renderWithProviders(<EstoquePage />);
    
    fireEvent.click(screen.getByText('Nova Categoria'));
    
    await waitFor(() => {
      expect(screen.getByText('Nova Categoria')).toBeInTheDocument();
      expect(screen.getByText('Nome da Categoria')).toBeInTheDocument();
    });
  });

  test('abre formulário de novo fornecedor ao clicar no botão', async () => {
    renderWithProviders(<EstoquePage />);
    
    fireEvent.click(screen.getByText('Novo Fornecedor'));
    
    await waitFor(() => {
      expect(screen.getByText('Novo Fornecedor')).toBeInTheDocument();
      expect(screen.getByText('Nome do Fornecedor')).toBeInTheDocument();
    });
  });

  test('exibe alerta de produtos com baixo estoque', () => {
    renderWithProviders(<EstoquePage />);
    // Verifica se há produtos com baixo estoque (mockados)
    expect(screen.getByText(/produto\(s\) com estoque baixo/)).toBeInTheDocument();
  });
}); 