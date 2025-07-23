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
    getProdutosVencendo,
    getProdutosVencidos,
    addCategoria,
    addFornecedor
  } = useEstoque();
  
  const [showCategoriaForm, setShowCategoriaForm] = useState(false);
  const [showFornecedorForm, setShowFornecedorForm] = useState(false);

  const produtosBaixoEstoque = getProdutosBaixoEstoque();
  const produtosVencendo = getProdutosVencendo();
  const produtosVencidos = getProdutosVencidos();

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
      {/* Header da página */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Estoque</h1>
            <div className="flex gap-3 text-sm">
              {produtosBaixoEstoque.length > 0 && (
                <span className="flex items-center gap-1 px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md">
                  <span className="material-icons text-sm">warning</span>
                  {produtosBaixoEstoque.length}
                </span>
              )}
              {produtosVencendo.length > 0 && (
                <span className="flex items-center gap-1 px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-md">
                  <span className="material-icons text-sm">schedule</span>
                  {produtosVencendo.length}
                </span>
              )}
              {produtosVencidos.length > 0 && (
                <span className="flex items-center gap-1 px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md">
                  <span className="material-icons text-sm">block</span>
                  {produtosVencidos.length}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowCategoriaForm(true)} 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
            >
              <span className="material-icons text-sm">category</span>
              Categoria
            </Button>
            <Button 
              onClick={() => setShowFornecedorForm(true)} 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
            >
              <span className="material-icons text-sm">business</span>
              Fornecedor
            </Button>
          </div>
        </div>
      </div>

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