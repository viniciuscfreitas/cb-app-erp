import React from 'react';
import { Card } from '../ui/Card';
import { useEstoque } from '../../contexts/useEstoque';

export const EstoqueDashboard = () => {
  const { getIndicadoresEstoque } = useEstoque();
  const indicadores = getIndicadoresEstoque();

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Valor Total do Estoque */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Valor Total</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatarMoeda(parseFloat(indicadores.valorTotal))}
            </p>
          </div>
          <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Margem: {indicadores.margemTotal}%
          </p>
        </div>
      </Card>

      {/* Produtos com Baixo Estoque */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Baixo Estoque</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {indicadores.produtosBaixoEstoque}
            </p>
          </div>
          <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Produtos precisando de reposição
          </p>
        </div>
      </Card>

      {/* Produtos Vencendo */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Vencendo</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {indicadores.produtosVencendo}
            </p>
          </div>
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
            <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Vencem em 30 dias
          </p>
        </div>
      </Card>

      {/* Total de Produtos */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Produtos</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {indicadores.totalProdutos}
            </p>
          </div>
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Produtos cadastrados
          </p>
        </div>
      </Card>
    </div>
  );
}; 