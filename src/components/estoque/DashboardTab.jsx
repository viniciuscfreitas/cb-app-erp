import React, { useMemo, useState } from 'react';
import { Card } from '../ui/Card';
import { useEstoque } from '../../contexts/useEstoque';
import { EstoqueModal } from './EstoqueModal';

export function DashboardTab() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState([]);

  const { 
    produtos, 
    categorias, 
    fornecedores,
    getProdutosBaixoEstoque,
    getProdutosVencendo,
    getProdutosVencidos,
    calcularValorTotalEstoque,
    getProdutosPorCategoria,
    getProdutosPorFornecedor
  } = useEstoque();

  // Dados para cálculos
  const produtosBaixoEstoque = getProdutosBaixoEstoque();
  const produtosVencendo = getProdutosVencendo();
  const produtosVencidos = getProdutosVencidos();

  // Funções auxiliares
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const openModal = (type, title, data) => {
    setModalType(type);
    setModalTitle(title);
    setModalData(data);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };



  const calcularGiroMedio = () => {
    if (produtos.length === 0) return 0;
    const giroTotal = produtos.reduce((acc, produto) => acc + (produto.giroEstoque || 0), 0);
    return giroTotal / produtos.length;
  };



  // Dados para gráficos
  const dadosCategorias = useMemo(() => {
    return categorias.map(categoria => {
      const produtosCategoria = getProdutosPorCategoria(categoria.id);
      const valorTotal = produtosCategoria.reduce((acc, p) => acc + (p.preco * p.quantidade), 0);
      return {
        nome: categoria.nome,
        quantidade: produtosCategoria.length,
        valor: valorTotal,
        cor: ['blue', 'green', 'yellow', 'red', 'purple', 'indigo'][categoria.id % 6]
      };
    });
  }, [categorias, getProdutosPorCategoria]);

  const dadosFornecedores = useMemo(() => {
    return fornecedores.slice(0, 5).map(fornecedor => {
      const produtosFornecedor = getProdutosPorFornecedor(fornecedor.id);
      const valorTotal = produtosFornecedor.reduce((acc, p) => acc + (p.preco * p.quantidade), 0);
      return {
        nome: fornecedor.nome,
        quantidade: produtosFornecedor.length,
        valor: valorTotal
      };
    }).sort((a, b) => b.valor - a.valor);
  }, [fornecedores, getProdutosPorFornecedor]);

  const produtosMaisVendidos = useMemo(() => {
    return [...produtos]
      .sort((a, b) => (b.giroEstoque || 0) - (a.giroEstoque || 0))
      .slice(0, 5);
  }, [produtos]);

  const produtosMenosVendidos = useMemo(() => {
    return [...produtos]
      .filter(p => p.giroEstoque < 1)
      .sort((a, b) => (a.giroEstoque || 0) - (b.giroEstoque || 0))
      .slice(0, 5);
  }, [produtos]);

  return (
    <div className="space-y-4 h-full overflow-y-auto p-1">
      {/* KPIs Principais - 5 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Valor Total do Estoque */}
        <Card 
          className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-800 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => openModal('info', 'Valor Total do Estoque', produtos)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">Valor Total</p>
              <p className="text-lg font-bold text-emerald-800 dark:text-emerald-200 mt-1">
                {formatarMoeda(calcularValorTotalEstoque())}
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                {produtos.length} produtos
              </p>
            </div>
            <div className="p-1.5 bg-emerald-200 dark:bg-emerald-800 rounded-lg">
              <span className="material-icons text-lg text-emerald-700 dark:text-emerald-300">inventory</span>
            </div>
          </div>
        </Card>

        {/* Produtos com Baixo Estoque */}
        <Card 
          className="p-3 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => openModal('warning', 'Produtos com Baixo Estoque', produtosBaixoEstoque)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-red-700 dark:text-red-300 uppercase tracking-wide">Baixo Estoque</p>
              <p className="text-lg font-bold text-red-800 dark:text-red-200 mt-1">
                {produtosBaixoEstoque.length}
              </p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                Precisam reposição
              </p>
            </div>
            <div className="p-1.5 bg-red-200 dark:bg-red-800 rounded-lg">
              <span className="material-icons text-lg text-red-700 dark:text-red-300">warning</span>
            </div>
          </div>
        </Card>

        {/* Produtos Vencendo */}
        <Card 
          className="p-3 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border border-amber-200 dark:border-amber-800 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => openModal('alert', 'Produtos Vencendo', produtosVencendo)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wide">Vencendo</p>
              <p className="text-lg font-bold text-amber-800 dark:text-amber-200 mt-1">
                {produtosVencendo.length}
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                Próximos 30 dias
              </p>
            </div>
            <div className="p-1.5 bg-amber-200 dark:bg-amber-800 rounded-lg">
              <span className="material-icons text-lg text-amber-700 dark:text-amber-300">schedule</span>
            </div>
          </div>
        </Card>

        {/* Giro de Estoque */}
        <Card 
          className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => openModal('info', 'Giro de Estoque', produtos)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">Giro Médio</p>
              <p className="text-lg font-bold text-blue-800 dark:text-blue-200 mt-1">
                {calcularGiroMedio().toFixed(1)}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                Vezes/mês
              </p>
            </div>
            <div className="p-1.5 bg-blue-200 dark:bg-blue-800 rounded-lg">
              <span className="material-icons text-lg text-blue-700 dark:text-blue-300">refresh</span>
            </div>
          </div>
        </Card>

        {/* Produtos Vencidos */}
        <Card 
          className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border border-gray-200 dark:border-gray-800 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => openModal('warning', 'Produtos Vencidos', produtosVencidos)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Vencidos</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200 mt-1">
                {produtosVencidos.length}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Descarte necessário
              </p>
            </div>
            <div className="p-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg">
              <span className="material-icons text-lg text-gray-700 dark:text-gray-300">block</span>
            </div>
          </div>
        </Card>
      </div>



      {/* Gráficos e Análises */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Distribuição por Categoria */}
        <Card className="p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-icons text-gray-600 dark:text-gray-400">pie_chart</span>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Distribuição por Categoria
            </h3>
          </div>
          <div className="space-y-3">
            {dadosCategorias.map((categoria, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-${categoria.cor}-500`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {categoria.nome}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {categoria.quantidade} produtos
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {formatarMoeda(categoria.valor)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {((categoria.valor / calcularValorTotalEstoque()) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Fornecedores */}
        <Card className="p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-icons text-gray-600 dark:text-gray-400">business</span>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Top Fornecedores
            </h3>
          </div>
          <div className="space-y-3">
            {dadosFornecedores.map((fornecedor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {fornecedor.nome}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {fornecedor.quantidade} produtos
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {formatarMoeda(fornecedor.valor)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Produtos Mais e Menos Vendidos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Produtos Mais Vendidos */}
        <Card className="p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-icons text-green-600 dark:text-green-400">trending_up</span>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Mais Vendidos
            </h3>
          </div>
          <div className="space-y-3">
                         {produtosMaisVendidos.map((produto, index) => (
               <div key={produto.id} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                     <span className="text-sm font-semibold text-green-600 dark:text-green-300">
                       {index + 1}
                     </span>
                   </div>
                   <div>
                     <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                       {produto.nome}
                     </p>
                     <p className="text-xs text-gray-500 dark:text-gray-400">
                       Giro: {produto.giroEstoque?.toFixed(1) || 0}/mês
                     </p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                     {produto.quantidade} un
                   </p>
                   <p className="text-xs text-gray-500 dark:text-gray-400">
                     {formatarMoeda(produto.preco)}
                   </p>
                 </div>
               </div>
             ))}
          </div>
        </Card>

        {/* Produtos Menos Vendidos */}
        <Card className="p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-icons text-red-600 dark:text-red-400">trending_down</span>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Menos Vendidos
            </h3>
          </div>
          <div className="space-y-3">
                         {produtosMenosVendidos.map((produto, index) => (
               <div key={produto.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                   <span className="text-sm font-semibold text-red-600 dark:text-red-300">
                     {index + 1}
                   </span>
                 </div>
                 <div>
                   <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                     {produto.nome}
                   </p>
                   <p className="text-xs text-gray-500 dark:text-gray-400">
                     Giro: {produto.giroEstoque?.toFixed(1) || 0}/mês
                   </p>
                 </div>
               </div>
               <div className="text-right">
                 <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                   {produto.quantidade} un
                 </p>
                 <p className="text-xs text-gray-500 dark:text-gray-400">
                   {formatarMoeda(produto.preco)}
                 </p>
               </div>
             </div>
           ))}
          </div>
        </Card>
      </div>

      {/* Modal para exibir detalhes */}
      <EstoqueModal
        isOpen={modalOpen}
        onClose={closeModal}
        title={modalTitle}
        type={modalType}
      >
        {modalData.length > 0 ? (
          <div className="space-y-3">
            {modalData.map((produto) => (
              <div key={produto.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center border border-blue-200 dark:border-blue-800">
                    <span className="material-icons text-blue-600 dark:text-blue-400">inventory_2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{produto.nome}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{produto.codigo}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {produto.quantidade} {produto.unidade}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatarMoeda(produto.preco)}
                  </p>
                  {produto.giroEstoque && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      Giro: {produto.giroEstoque.toFixed(1)}/mês
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-2xl text-gray-400 dark:text-gray-500">inventory</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Nenhum item encontrado</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Não há produtos para exibir nesta categoria</p>
          </div>
        )}
      </EstoqueModal>

    </div>
  );
} 