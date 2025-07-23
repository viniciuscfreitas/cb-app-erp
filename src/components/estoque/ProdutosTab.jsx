import React, { useState, useMemo } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../ui/Input';
import { DataTable, DataTableHeader, DataTableBody, DataTableFooter } from '../ui/DataTable';
import { Card } from '../ui/Card';
import { useEstoque } from '../../contexts/useEstoque';
import ProdutoForm from './ProdutoForm';

export const ProdutosTab = () => {
  const { 
    produtos, 
    categorias, 
    addProduto, 
    updateProduto, 
    deleteProduto,
    buscarProdutos
  } = useEstoque();

  const [showProdutoForm, setShowProdutoForm] = useState(false);
  const [editingProduto, setEditingProduto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('nome');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleEdit = (produto) => {
    setEditingProduto(produto);
    setShowProdutoForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      deleteProduto(id);
    }
  };

  const handleSaveProduto = (produto) => {
    if (editingProduto) {
      updateProduto(editingProduto.id, produto);
      setEditingProduto(null);
    } else {
      addProduto(produto);
    }
    setShowProdutoForm(false);
  };

  // Filtros e ordenação
  const filteredAndSortedProdutos = useMemo(() => {
    let filtered = produtos;

    // Busca por texto
    if (searchTerm) {
      filtered = buscarProdutos(searchTerm);
    }

    // Filtro por categoria
    if (selectedCategoria) {
      filtered = filtered.filter(produto => 
        categorias.find(cat => cat.id === produto.categoriaId)?.nome === selectedCategoria
      );
    }

    // Filtro por status
    if (selectedStatus) {
      if (selectedStatus === 'baixo-estoque') {
        filtered = filtered.filter(produto => produto.quantidade <= produto.estoqueMinimo);
      } else if (selectedStatus === 'vencendo') {
        const hoje = new Date();
        const trintaDias = new Date(hoje.getTime() + (30 * 24 * 60 * 60 * 1000));
        filtered = filtered.filter(produto => {
          if (!produto.dataValidade) return false;
          const dataValidade = new Date(produto.dataValidade);
          return dataValidade <= trintaDias && dataValidade >= hoje;
        });
      } else if (selectedStatus === 'vencido') {
        const hoje = new Date();
        filtered = filtered.filter(produto => {
          if (!produto.dataValidade) return false;
          const dataValidade = new Date(produto.dataValidade);
          return dataValidade < hoje;
        });
      }
    }

    // Ordenação
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'nome':
          aValue = a.nome.toLowerCase();
          bValue = b.nome.toLowerCase();
          break;
        case 'codigo':
          aValue = a.codigo.toLowerCase();
          bValue = b.codigo.toLowerCase();
          break;
        case 'quantidade':
          aValue = a.quantidade;
          bValue = b.quantidade;
          break;
        case 'preco':
          aValue = a.preco;
          bValue = b.preco;
          break;
        case 'validade':
          aValue = a.dataValidade ? new Date(a.dataValidade) : new Date('9999-12-31');
          bValue = b.dataValidade ? new Date(b.dataValidade) : new Date('9999-12-31');
          break;
        default:
          aValue = a.nome.toLowerCase();
          bValue = b.nome.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [produtos, searchTerm, selectedCategoria, selectedStatus, sortBy, sortOrder, categorias, buscarProdutos]);

  const columns = [
    { key: 'codigo', label: 'Código' },
    { key: 'nome', label: 'Nome' },
    { key: 'categoria', label: 'Categoria' },
    { key: 'quantidade', label: 'Estoque' },
    { key: 'preco', label: 'Preço' },
    { key: 'margem', label: 'Margem' },
    { key: 'validade', label: 'Validade' },
    { key: 'localizacao', label: 'Localização' },
    { key: 'actions', label: 'Ações' }
  ];

  const data = filteredAndSortedProdutos.map(produto => {
    const categoria = categorias.find(cat => cat.id === produto.categoriaId)?.nome || '-';
    const margem = produto.margemLucro ? `${produto.margemLucro}%` : '-';
    const validade = produto.dataValidade ? new Date(produto.dataValidade).toLocaleDateString('pt-BR') : 'N/A';
    
    return {
      ...produto,
      categoria,
      margem,
      validade,
      preco: `R$ ${produto.preco.toFixed(2)}`,
      actions: (
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button size="sm" variant="outline" onClick={() => handleEdit(produto)} className="flex items-center gap-1">
            <span className="material-icons text-sm">edit</span>
            Editar
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(produto.id)} className="flex items-center gap-1">
            <span className="material-icons text-sm">delete</span>
            Excluir
          </Button>
        </div>
      )
    };
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-3 h-full overflow-y-auto">
      {/* Header com ações */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie todos os produtos do estoque
          </p>
        </div>
        <Button onClick={() => setShowProdutoForm(true)} className="flex items-center gap-2">
          <span className="material-icons text-sm">add</span>
          Novo Produto
        </Button>
      </div>

      {/* Filtros e Busca */}
      <Card className="p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-icons text-gray-600 dark:text-gray-400">filter_list</span>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Filtros e Busca</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Busca */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Buscar
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 material-icons text-gray-400 text-sm">search</span>
              <Input
                type="text"
                placeholder="Código, nome, marca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
            </div>
          </div>

          {/* Filtro por Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Categoria
            </label>
            <select
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas as categorias</option>
              {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.nome}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos</option>
              <option value="baixo-estoque">Baixo Estoque</option>
              <option value="vencendo">Vencendo</option>
              <option value="vencido">Vencido</option>
            </select>
          </div>

          {/* Ordenação */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ordenar por
            </label>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [column, order] = e.target.value.split('-');
                setSortBy(column);
                setSortOrder(order);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="nome-asc">Nome (A-Z)</option>
              <option value="nome-desc">Nome (Z-A)</option>
              <option value="codigo-asc">Código (A-Z)</option>
              <option value="codigo-desc">Código (Z-A)</option>
              <option value="quantidade-asc">Quantidade (Menor)</option>
              <option value="quantidade-desc">Quantidade (Maior)</option>
              <option value="preco-asc">Preço (Menor)</option>
              <option value="preco-desc">Preço (Maior)</option>
              <option value="validade-asc">Validade (Próxima)</option>
              <option value="validade-desc">Validade (Distante)</option>
            </select>
          </div>
        </div>

        {/* Resultados da busca */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-2">
            <span className="material-icons text-base">inventory</span>
            {filteredAndSortedProdutos.length} de {produtos.length} produtos
          </span>
          {(searchTerm || selectedCategoria || selectedStatus) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategoria('');
                setSelectedStatus('');
              }}
              className="flex items-center gap-2"
            >
              <span className="material-icons text-sm">clear</span>
              Limpar Filtros
            </Button>
          )}
        </div>
      </Card>

      {/* Tabela de Produtos */}
      <Card className="overflow-hidden border border-gray-200 dark:border-gray-700">
        <DataTable className="w-full">
          <DataTableHeader>
            <tr className="text-left bg-gray-50 dark:bg-gray-800">
              {columns.map(column => (
                <th 
                  key={column.key} 
                  className="px-6 py-4 text-sm font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {sortBy === column.key && (
                      <span className="material-icons text-xs">
                        {sortOrder === 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </DataTableHeader>
          <DataTableBody>
            {data.map((produto, index) => (
              <tr key={produto.id} className={`border-b border-gray-100 dark:border-gray-800 group hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200 ${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-950/50'}`}>
                <td className="px-6 py-4 text-sm font-mono text-gray-600 dark:text-gray-300">{produto.codigo}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{produto.nome}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                    {produto.categoria}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex flex-col">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                      produto.quantidade <= produto.estoqueMinimo 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 ring-2 ring-red-200 dark:ring-red-800' 
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 ring-2 ring-green-200 dark:ring-green-800'
                    }`}>
                      {produto.quantidade}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Min: {produto.estoqueMinimo}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{produto.preco}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    parseFloat(produto.margem) > 30 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {produto.margem}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                  {produto.dataValidade ? (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      new Date(produto.dataValidade) < new Date() 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                        : new Date(produto.dataValidade) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {produto.validade}
                    </span>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 font-mono">
                  {produto.localizacao}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                  {produto.actions}
                </td>
              </tr>
            ))}
          </DataTableBody>
          <DataTableFooter totalItems={data.length} currentPage={1} totalPages={1} itemsPerPage={10}>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Mostrando {data.length} produtos
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total: {produtos.length} produtos cadastrados
              </div>
            </div>
          </DataTableFooter>
        </DataTable>
      </Card>

      {/* Modal de Produto */}
      {showProdutoForm && (
        <ProdutoForm
          produto={editingProduto}
          onSave={handleSaveProduto}
          onCancel={() => {
            setShowProdutoForm(false);
            setEditingProduto(null);
          }}
        />
      )}
    </div>
  );
}; 