import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EstoqueProvider, EstoqueContext } from './EstoqueContext';
import { useEstoque } from './useEstoque';
import { describe, test, expect, beforeEach } from 'vitest';

// Componente de teste para usar o contexto
const TestComponent = () => {
  const { produtos, addProduto, deleteProduto } = useEstoque();
  
  return (
    <div>
      <div data-testid="produtos-count">{produtos.length}</div>
      <button onClick={() => addProduto({ nome: 'Teste', preco: 10 })}>
        Adicionar Produto
      </button>
      <button onClick={() => deleteProduto(1)}>
        Deletar Produto
      </button>
      {produtos.map(produto => (
        <div key={produto.id} data-testid={`produto-${produto.id}`}>
          {produto.nome}
        </div>
      ))}
    </div>
  );
};

describe('EstoqueContext', () => {
  beforeEach(() => {
    // Limpar localStorage antes de cada teste
    localStorage.clear();
  });

  test('fornece dados iniciais de produtos', () => {
    render(
      <EstoqueProvider>
        <TestComponent />
      </EstoqueProvider>
    );
    
    expect(screen.getByTestId('produtos-count')).toHaveTextContent('3');
    expect(screen.getByTestId('produto-1')).toHaveTextContent('Ração Premium Cães');
    expect(screen.getByTestId('produto-2')).toHaveTextContent('Shampoo para Gatos');
    expect(screen.getByTestId('produto-3')).toHaveTextContent('Brinquedo Interativo');
  });

  test('permite adicionar novo produto', async () => {
    render(
      <EstoqueProvider>
        <TestComponent />
      </EstoqueProvider>
    );
    
    const addButton = screen.getByText('Adicionar Produto');
    fireEvent.click(addButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('produtos-count')).toHaveTextContent('4');
    });
    
    expect(screen.getByText('Teste')).toBeInTheDocument();
  });

  test('permite deletar produto', async () => {
    render(
      <EstoqueProvider>
        <TestComponent />
      </EstoqueProvider>
    );
    
    const deleteButton = screen.getByText('Deletar Produto');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('produtos-count')).toHaveTextContent('2');
    });
    
    expect(screen.queryByTestId('produto-1')).not.toBeInTheDocument();
  });

  test('salva dados no localStorage', async () => {
    render(
      <EstoqueProvider>
        <TestComponent />
      </EstoqueProvider>
    );
    
    const addButton = screen.getByText('Adicionar Produto');
    fireEvent.click(addButton);
    
    await waitFor(() => {
      const savedData = localStorage.getItem('estoqueData');
      expect(savedData).toBeTruthy();
      
      const parsedData = JSON.parse(savedData);
      expect(parsedData.produtos).toHaveLength(4);
    });
  });

  test('carrega dados do localStorage na inicialização', () => {
    // Simular dados salvos no localStorage
    const mockData = {
      produtos: [
        { id: 1, nome: 'Produto Teste', preco: 15 }
      ],
      categorias: [],
      fornecedores: []
    };
    localStorage.setItem('estoqueData', JSON.stringify(mockData));
    
    render(
      <EstoqueProvider>
        <TestComponent />
      </EstoqueProvider>
    );
    
    expect(screen.getByTestId('produtos-count')).toHaveTextContent('1');
    expect(screen.getByText('Produto Teste')).toBeInTheDocument();
  });
}); 