import { useContext } from 'react';
import { EstoqueContext } from './EstoqueContext';

export const useEstoque = () => {
  const context = useContext(EstoqueContext);
  if (!context) {
    throw new Error('useEstoque deve ser usado dentro de um EstoqueProvider');
  }
  return context;
}; 