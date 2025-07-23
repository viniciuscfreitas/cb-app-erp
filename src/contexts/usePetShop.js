import { useContext } from 'react';
import { PetShopContext } from './PetShopContext.js';

export function usePetShop() {
  const context = useContext(PetShopContext);
  if (!context) {
    throw new Error('usePetShop must be used within a PetShopProvider');
  }
  return context;
} 