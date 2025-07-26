import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { Tabs } from '../ui/Tabs';
import { DashboardTab } from './DashboardTab';
import { ProdutosTab } from './ProdutosTab';
import CategoriaForm from './CategoriaForm';
import FornecedorForm from './FornecedorForm';
import { useEstoque } from '../../contexts/useEstoque';

const EstoquePage = () => {
  const { 
    getProdutosBaixoEstoque,
    addCategoria,
    addFornecedor
  } = useEstoque();
  
  const [showCategoriaForm, setShowCategoriaForm] = useState(false);
  const [showFornecedorForm, setShowFornecedorForm] = useState(false);

  const produtosBaixoEstoque = getProdutosBaixoEstoque();

  const tabs = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      badge: produtosBaixoEstoque.length > 0 ? produtosBaixoEstoque.length : null,
      content: <DashboardTab />
    },
    {
      label: 'Produtos',
      icon: 'inventory',
      content: <ProdutosTab />
    },
    {
      label: 'Movimentação',
      icon: 'swap_horiz',
      content: <div className="text-center py-12 text-gray-500">Sistema de movimentação em desenvolvimento...</div>
    },
    {
      label: 'Relatórios',
      icon: 'analytics',
      content: <div className="text-center py-12 text-gray-500">Relatórios em desenvolvimento...</div>
    }
  ];

    return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-950" role="main" aria-label="Gerenciamento de estoque">
      {/* Conteúdo principal com abas */}
      <div className="flex-1 overflow-hidden p-4">
        <div className="h-full">
          <Tabs tabs={tabs} defaultTab={0} />
        </div>
      </div>

      {showCategoriaForm && (
        <CategoriaForm
          onSave={(categoria) => {
            addCategoria(categoria);
            setShowCategoriaForm(false);
          }}
          onCancel={() => setShowCategoriaForm(false)}
        />
      )}

      {showFornecedorForm && (
        <FornecedorForm
          onSave={(fornecedor) => {
            addFornecedor(fornecedor);
            setShowFornecedorForm(false);
          }}
          onCancel={() => setShowFornecedorForm(false)}
        />
      )}
    </div>
  );
};

export default EstoquePage; 