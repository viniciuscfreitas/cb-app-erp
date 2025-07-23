import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PetShopProvider } from './PetShopContext.jsx';
import { usePetShop } from './usePetShop';

// Componente de teste para acessar o contexto
function TestComponent() {
  const { clientes, pets, addCliente, addPet } = usePetShop();
  
  return (
    <div>
      <div data-testid="clientes-count">{clientes.length}</div>
      <div data-testid="pets-count">{pets.length}</div>
      <button onClick={() => addCliente({ nome: 'Teste', email: 'teste@teste.com' })}>
        Adicionar Cliente
      </button>
      <button onClick={() => addPet({ nome: 'Pet Teste', donoId: '1' })}>
        Adicionar Pet
      </button>
    </div>
  );
}

describe('PetShopContext', () => {
  it('fornece dados iniciais de clientes e pets', () => {
    render(
      <PetShopProvider>
        <TestComponent />
      </PetShopProvider>
    );
    
    expect(screen.getByTestId('clientes-count')).toHaveTextContent('10');
    expect(screen.getByTestId('pets-count')).toHaveTextContent('10');
  });

  it('renderiza sem erros', () => {
    expect(() => {
      render(
        <PetShopProvider>
          <div>Teste</div>
        </PetShopProvider>
      );
    }).not.toThrow();
  });

  it('fornece funções do contexto', () => {
    render(
      <PetShopProvider>
        <TestComponent />
      </PetShopProvider>
    );
    
    expect(screen.getByText('Adicionar Cliente')).toBeInTheDocument();
    expect(screen.getByText('Adicionar Pet')).toBeInTheDocument();
  });
});

describe('usePetShop', () => {
  it('lança erro quando usado fora do provider', () => {
    // Suprime o console.error para este teste
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('usePetShop must be used within a PetShopProvider');
    
    consoleSpy.mockRestore();
  });
}); 