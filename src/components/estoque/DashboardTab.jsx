import React, { useMemo } from 'react';
import { Card } from '../ui/Card';
import { useEstoque } from '../../contexts/useEstoque';

export function DashboardTab() {
  const { 
    produtos, 
    categorias, 
    fornecedores,
    getProdutosBaixoEstoque,
    getProdutosVencendo,
    getProdutosVencidos,
    getProdutosEstoqueMaximo,
    calcularValorTotalEstoque,
    getProdutosPorCategoria,
    getProdutosPorFornecedor
  } = useEstoque();

  // Dados para cálculos
  const produtosBaixoEstoque = getProdutosBaixoEstoque();
  const produtosVencendo = getProdutosVencendo();
  const produtosVencidos = getProdutosVencidos();
  const produtosEstoqueMaximo = getProdutosEstoqueMaximo();

  // Funções auxiliares
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
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
      {/* KPIs Principais - 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Valor Total do Estoque */}
        <Card className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">Valor Total</p>
              <p className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mt-1">
                {formatarMoeda(calcularValorTotalEstoque())}
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                {produtos.length} produtos
              </p>
            </div>
            <div className="p-2 bg-emerald-200 dark:bg-emerald-800 rounded-lg">
              <span className="material-icons text-xl text-emerald-700 dark:text-emerald-300">inventory</span>
            </div>
          </div>
        </Card>

        {/* Produtos com Baixo Estoque */}
        <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-red-700 dark:text-red-300 uppercase tracking-wide">Baixo Estoque</p>
              <p className="text-xl font-bold text-red-800 dark:text-red-200 mt-1">
                {produtosBaixoEstoque.length}
              </p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                Precisam reposição
              </p>
            </div>
            <div className="p-2 bg-red-200 dark:bg-red-800 rounded-lg">
              <span className="material-icons text-xl text-red-700 dark:text-red-300">warning</span>
            </div>
          </div>
        </Card>

        {/* Produtos Vencendo */}
        <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border border-amber-200 dark:border-amber-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wide">Vencendo</p>
              <p className="text-xl font-bold text-amber-800 dark:text-amber-200 mt-1">
                {produtosVencendo.length}
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                Próximos 30 dias
              </p>
            </div>
            <div className="p-2 bg-amber-200 dark:bg-amber-800 rounded-lg">
              <span className="material-icons text-xl text-amber-700 dark:text-amber-300">schedule</span>
            </div>
          </div>
        </Card>

        {/* Giro de Estoque */}
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">Giro Médio</p>
              <p className="text-xl font-bold text-blue-800 dark:text-blue-200 mt-1">
                {calcularGiroMedio().toFixed(1)}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                Vezes/mês
              </p>
            </div>
            <div className="p-2 bg-blue-200 dark:bg-blue-800 rounded-lg">
              <span className="material-icons text-xl text-blue-700 dark:text-blue-300">refresh</span>
            </div>
          </div>
        </Card>

        {/* Produtos Vencidos */}
        <Card className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Vencidos</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-1">
                {produtosVencidos.length}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Descarte necessário
              </p>
            </div>
            <div className="p-2 bg-gray-200 dark:bg-gray-800 rounded-lg">
              <span className="material-icons text-xl text-gray-700 dark:text-gray-300">block</span>
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

      {/* Alertas e Notificações */}
      <Card className="p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-icons text-gray-600 dark:text-gray-400">notifications</span>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Alertas Ativos
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {produtosBaixoEstoque.length > 0 && (
            <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <span className="material-icons text-red-600 dark:text-red-400">warning</span>
              <div>
                <div className="text-sm font-medium text-red-800 dark:text-red-200">
                  {produtosBaixoEstoque.length} produtos com baixo estoque
                </div>
                <div className="text-xs text-red-600 dark:text-red-400">
                  Necessário reposição urgente
                </div>
              </div>
            </div>
          )}
          
          {produtosVencendo.length > 0 && (
            <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <span className="material-icons text-yellow-600 dark:text-yellow-400">schedule</span>
              <div>
                <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  {produtosVencendo.length} produtos vencendo
                </div>
                <div className="text-xs text-yellow-600 dark:text-yellow-400">
                  Vencem nos próximos 30 dias
                </div>
              </div>
            </div>
          )}
          
          {produtosVencidos.length > 0 && (
            <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <span className="material-icons text-red-600 dark:text-red-400">block</span>
              <div>
                <div className="text-sm font-medium text-red-800 dark:text-red-200">
                  {produtosVencidos.length} produtos vencidos
                </div>
                <div className="text-xs text-red-600 dark:text-red-400">
                  Descarte imediato necessário
                </div>
              </div>
            </div>
          )}
          
          {produtosEstoqueMaximo.length > 0 && (
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <span className="material-icons text-blue-600 dark:text-blue-400">inventory_2</span>
              <div>
                <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  {produtosEstoqueMaximo.length} produtos com estoque alto
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400">
                  Considere promoções
                </div>
              </div>
            </div>
          )}
          
          {produtosBaixoEstoque.length === 0 && produtosVencendo.length === 0 && 
           produtosVencidos.length === 0 && produtosEstoqueMaximo.length === 0 && (
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <span className="material-icons text-green-600 dark:text-green-400">check_circle</span>
              <div>
                <div className="text-sm font-medium text-green-800 dark:text-green-200">
                  Estoque em ordem
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">
                  Nenhum alerta ativo
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>


    </div>
  );
} 