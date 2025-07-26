import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useEstoque } from '../../contexts/useEstoque';
import { Button } from '../Button/Button';
import { Input } from '../ui/Input';
import ProdutoForm from './ProdutoForm';

export const ProdutosTab = () => {
  const { 
    produtos, 
    categorias, 
    fornecedores,
    addProduto, 
    updateProduto, 
    deleteProduto
  } = useEstoque();

  // Estados para o design simples
  const [showProdutoForm, setShowProdutoForm] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingProduto, setEditingProduto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedFornecedor, setSelectedFornecedor] = useState('');
  const [sortBy, setSortBy] = useState('nome');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('table'); // table, list, cards, kanban
  const [inlineEditing, setInlineEditing] = useState(null);
  
  // Refs para atalhos de teclado
  const searchRef = useRef(null);

  // Atalhos de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        handleNewProduto();
      }
      if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        setShowImportModal(true);
      }
      if (e.key === 'Escape') {
        setShowProdutoForm(false);
        setShowImportModal(false);
        setInlineEditing(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Funções de ação
  const handleNewProduto = () => {
    setEditingProduto(null);
    setShowProdutoForm(true);
  };

  const handleEdit = (produto) => {
    setEditingProduto(produto);
    setShowProdutoForm(true);
  };

  const handleDelete = (produto) => {
    if (window.confirm(`Tem certeza que deseja excluir "${produto.nome}"?`)) {
      deleteProduto(produto.id);
    }
  };

  const handleSaveProduto = (produtoData) => {
    if (editingProduto) {
      updateProduto(editingProduto.id, produtoData);
    } else {
      addProduto(produtoData);
    }
    setShowProdutoForm(false);
    setEditingProduto(null);
  };

  const handleInlineEdit = (produto, field) => {
    setInlineEditing({ id: produto.id, field, value: produto[field] });
  };

  const handleInlineSave = (produto, field, value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) return;
    
    updateProduto(produto.id, { ...produto, [field]: numValue });
    setInlineEditing(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategoria('');
    setSelectedStatus('');
    setSelectedFornecedor('');
    setSortBy('nome');
    setSortOrder('asc');
  };

  // Filtros e ordenação otimizados
  const filteredAndSortedProdutos = useMemo(() => {
    let filtered = produtos;

    // Busca por texto (múltiplos campos)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(produto => 
        produto.codigo?.toLowerCase().includes(term) ||
        produto.nome?.toLowerCase().includes(term) ||
        produto.marca?.toLowerCase().includes(term) ||
        categorias.find(cat => cat.id === produto.categoriaId)?.nome?.toLowerCase().includes(term) ||
        fornecedores.find(forn => forn.id === produto.fornecedorId)?.nome?.toLowerCase().includes(term)
      );
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

    // Filtro por fornecedor
    if (selectedFornecedor) {
      filtered = filtered.filter(produto => 
        fornecedores.find(forn => forn.id === produto.fornecedorId)?.nome === selectedFornecedor
      );
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
  }, [produtos, searchTerm, selectedCategoria, selectedStatus, selectedFornecedor, sortBy, sortOrder, categorias, fornecedores]);

  // Função para obter status visual
  const getStatusVisual = (produto) => {
    const hoje = new Date();
    const quantidade = produto.quantidade;
    const estoqueMinimo = produto.estoqueMinimo;
    
    // Verificar validade
    if (produto.dataValidade) {
      const dataValidade = new Date(produto.dataValidade);
      if (dataValidade < hoje) return { icon: 'error', text: 'Vencido', color: 'text-red-500' };
      if (dataValidade <= new Date(hoje.getTime() + (30 * 24 * 60 * 60 * 1000))) {
        return { icon: 'warning', text: 'Vencendo', color: 'text-yellow-500' };
      }
    }
    
    // Verificar estoque
    if (quantidade <= estoqueMinimo) return { icon: 'error', text: `${quantidade}/${estoqueMinimo}`, color: 'text-red-500' };
    if (quantidade <= estoqueMinimo * 1.5) return { icon: 'warning', text: `${quantidade}/${estoqueMinimo}`, color: 'text-yellow-500' };
    return { icon: 'check_circle', text: `${quantidade}/${estoqueMinimo}`, color: 'text-green-500' };
  };

  // Renderizar visualização de tabela
  const renderTableView = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left p-2 font-semibold text-gray-700 dark:text-gray-300">Código</th>
            <th className="text-left p-2 font-semibold text-gray-700 dark:text-gray-300">Nome</th>
            <th className="text-left p-2 font-semibold text-gray-700 dark:text-gray-300">Cat.</th>
            <th className="text-left p-2 font-semibold text-gray-700 dark:text-gray-300">Est.</th>
            <th className="text-left p-2 font-semibold text-gray-700 dark:text-gray-300">Preço</th>
            <th className="text-left p-2 font-semibold text-gray-700 dark:text-gray-300">Val.</th>
            <th className="text-left p-2 font-semibold text-gray-700 dark:text-gray-300">Ações</th>
          </tr>
        </thead>
        <tbody>
                     {filteredAndSortedProdutos.map(produto => {
             const status = getStatusVisual(produto);
             const categoria = categorias.find(cat => cat.id === produto.categoriaId);

  return (
              <tr key={produto.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-2 font-mono text-gray-900 dark:text-gray-100">{produto.codigo}</td>
                <td className="p-2 text-gray-900 dark:text-gray-100">
        <div>
                    <div className="font-medium">{produto.nome}</div>
                    {produto.marca && <div className="text-xs text-gray-500 dark:text-gray-400">{produto.marca}</div>}
                  </div>
                </td>
                <td className="p-2 text-gray-700 dark:text-gray-300">{categoria?.nome?.substring(0, 4)}</td>
                <td className="p-2">
                  {inlineEditing?.id === produto.id && inlineEditing.field === 'quantidade' ? (
                    <input
                      type="number"
                      value={inlineEditing.value}
                      onChange={(e) => setInlineEditing({...inlineEditing, value: e.target.value})}
                      onBlur={() => handleInlineSave(produto, 'quantidade', inlineEditing.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleInlineSave(produto, 'quantidade', inlineEditing.value)}
                      className="w-12 px-1 py-0.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      autoFocus
                    />
                  ) : (
                    <span 
                      className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-1 rounded flex items-center gap-1 ${status.color}`}
                      onClick={() => handleInlineEdit(produto, 'quantidade')}
                    >
                      <span className="material-icons text-sm">{status.icon}</span>
                      <span className="text-xs">{status.text}</span>
                    </span>
                  )}
                </td>
                <td className="p-2">
                  {inlineEditing?.id === produto.id && inlineEditing.field === 'preco' ? (
                    <input
                      type="number"
                      step="0.01"
                      value={inlineEditing.value}
                      onChange={(e) => setInlineEditing({...inlineEditing, value: e.target.value})}
                      onBlur={() => handleInlineSave(produto, 'preco', inlineEditing.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleInlineSave(produto, 'preco', inlineEditing.value)}
                      className="w-16 px-1 py-0.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      autoFocus
                    />
                  ) : (
                    <span 
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-1 rounded text-gray-900 dark:text-gray-100"
                      onClick={() => handleInlineEdit(produto, 'preco')}
                    >
                      R$ {produto.preco?.toFixed(2)}
                    </span>
                  )}
                </td>
                <td className="p-2 text-gray-600 dark:text-gray-400">
                  {produto.dataValidade ? new Date(produto.dataValidade).toLocaleDateString('pt-BR') : 'N/A'}
                </td>
                <td className="p-2">
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(produto)}
                      className="p-1 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      title="Editar"
                    >
                      <span className="material-icons text-sm">edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(produto)}
                      className="p-1 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                      title="Excluir"
                    >
                      <span className="material-icons text-sm">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  // Renderizar visualização de lista
  const renderListView = () => (
    <div className="space-y-1">
      {filteredAndSortedProdutos.map(produto => {
        const status = getStatusVisual(produto);
        const categoria = categorias.find(cat => cat.id === produto.categoriaId);
        
        return (
          <div key={produto.id} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-xs">
            <div className="flex items-center gap-4 flex-1">
              <span className="font-mono text-gray-900 dark:text-gray-100 w-20">{produto.codigo}</span>
              <span className="text-gray-900 dark:text-gray-100 flex-1">{produto.nome}</span>
              <span className="text-gray-700 dark:text-gray-300 w-16">{categoria?.nome}</span>
              <span className="text-gray-700 dark:text-gray-300 w-12">{status.icon} {status.text}</span>
              <span className="text-gray-900 dark:text-gray-100 w-16">R$ {produto.preco?.toFixed(2)}</span>
            </div>
                         <div className="flex gap-1">
               <button
                 onClick={() => handleEdit(produto)}
                 className="p-1 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                 title="Editar"
               >
                 <span className="material-icons text-sm">edit</span>
               </button>
               <button
                 onClick={() => handleDelete(produto)}
                 className="p-1 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                 title="Excluir"
               >
                 <span className="material-icons text-sm">delete</span>
               </button>
             </div>
          </div>
        );
      })}
    </div>
  );

  // Renderizar visualização de cards
  const renderCardsView = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
      {filteredAndSortedProdutos.map(produto => {
        const status = getStatusVisual(produto);
        
        return (
          <div key={produto.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-2 text-xs">
            <div className="font-mono text-gray-900 dark:text-gray-100 mb-1">{produto.codigo}</div>
            <div className="text-gray-900 dark:text-gray-100 font-medium mb-1 truncate" title={produto.nome}>
              {produto.nome}
            </div>
            <div className="text-gray-700 dark:text-gray-300 mb-1">{status.icon} {status.text}</div>
            <div className="text-gray-900 dark:text-gray-100 font-medium mb-2">R$ {produto.preco?.toFixed(2)}</div>
                         <div className="flex gap-1">
               <button
                 onClick={() => handleEdit(produto)}
                 className="flex-1 p-1 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 text-center"
                 title="Editar"
               >
                 <span className="material-icons text-sm">edit</span>
               </button>
               <button
                 onClick={() => handleDelete(produto)}
                 className="flex-1 p-1 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 text-center"
                 title="Excluir"
               >
                 <span className="material-icons text-sm">delete</span>
               </button>
             </div>
          </div>
        );
      })}
    </div>
  );

  // Renderizar visualização kanban
  const renderKanbanView = () => {
    const critical = filteredAndSortedProdutos.filter(p => getStatusVisual(p).icon === 'error');
    const warning = filteredAndSortedProdutos.filter(p => getStatusVisual(p).icon === 'warning');
    const ok = filteredAndSortedProdutos.filter(p => getStatusVisual(p).icon === 'check_circle');

    return (
      <div className="grid grid-cols-3 gap-4">
                 <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3">
           <div className="text-red-700 dark:text-red-300 font-semibold mb-2 flex items-center gap-1">
             <span className="material-icons text-sm">error</span>
             Crítico ({critical.length})
           </div>
          <div className="space-y-1">
            {critical.map(produto => (
                             <div key={produto.id} className="bg-white dark:bg-gray-800 p-2 rounded text-xs border border-red-200 dark:border-red-800">
                 <div className="font-mono text-gray-900 dark:text-gray-100">{produto.codigo}</div>
                 <div className="text-gray-900 dark:text-gray-100 truncate">{produto.nome}</div>
                 <div className="flex gap-1 mt-1">
                   <button
                     onClick={() => handleEdit(produto)}
                     className="p-1 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                   >
                     <span className="material-icons text-sm">edit</span>
                   </button>
                   <button
                     onClick={() => handleDelete(produto)}
                     className="p-1 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                   >
                     <span className="material-icons text-sm">delete</span>
                   </button>
                 </div>
               </div>
            ))}
          </div>
        </div>
        
                 <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-3">
           <div className="text-yellow-700 dark:text-yellow-300 font-semibold mb-2 flex items-center gap-1">
             <span className="material-icons text-sm">warning</span>
             Atenção ({warning.length})
           </div>
          <div className="space-y-1">
            {warning.map(produto => (
                             <div key={produto.id} className="bg-white dark:bg-gray-800 p-2 rounded text-xs border border-yellow-200 dark:border-yellow-800">
                 <div className="font-mono text-gray-900 dark:text-gray-100">{produto.codigo}</div>
                 <div className="text-gray-900 dark:text-gray-100 truncate">{produto.nome}</div>
                 <div className="flex gap-1 mt-1">
                   <button
                     onClick={() => handleEdit(produto)}
                     className="p-1 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                   >
                     <span className="material-icons text-sm">edit</span>
                   </button>
                   <button
                     onClick={() => handleDelete(produto)}
                     className="p-1 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                   >
                     <span className="material-icons text-sm">delete</span>
                   </button>
                 </div>
               </div>
            ))}
          </div>
        </div>
        
                 <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-3">
           <div className="text-green-700 dark:text-green-300 font-semibold mb-2 flex items-center gap-1">
             <span className="material-icons text-sm">check_circle</span>
             OK ({ok.length})
           </div>
          <div className="space-y-1">
            {ok.map(produto => (
                             <div key={produto.id} className="bg-white dark:bg-gray-800 p-2 rounded text-xs border border-green-200 dark:border-green-800">
                 <div className="font-mono text-gray-900 dark:text-gray-100">{produto.codigo}</div>
                 <div className="text-gray-900 dark:text-gray-100 truncate">{produto.nome}</div>
                 <div className="flex gap-1 mt-1">
                   <button
                     onClick={() => handleEdit(produto)}
                     className="p-1 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                   >
                     <span className="material-icons text-sm">edit</span>
                   </button>
                   <button
                     onClick={() => handleDelete(produto)}
                     className="p-1 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                   >
                     <span className="material-icons text-sm">delete</span>
                   </button>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-950">
            {/* Header Compacto */}
      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="material-icons text-red-600 dark:text-red-400 text-xl">inventory_2</span>
          <h1 className="font-semibold text-red-700 dark:text-red-300 text-sm">Produtos ({produtos.length})</h1>
        </div>
        
        <div className="flex items-center gap-2">
            <div className="relative">
            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm">search</span>
            <input
              ref={searchRef}
                type="text"
              placeholder="Buscar produtos... (/)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 text-xs border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400"
            />
          </div>
          <Button onClick={handleNewProduto} size="sm" className="text-xs">
            <span className="material-icons text-sm mr-1">add</span>
            Novo
          </Button>
          <Button onClick={() => setShowImportModal(true)} variant="outline" size="sm" className="text-xs">
            <span className="material-icons text-sm mr-1">upload_file</span>
            Importar
          </Button>
            </div>
          </div>

      {/* Filtros Integrados */}
      <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <select
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
          className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
          <option value="">Categoria</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.nome}>{cat.nome}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
          className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
          <option value="">Status</option>
              <option value="baixo-estoque">Baixo Estoque</option>
              <option value="vencendo">Vencendo</option>
              <option value="vencido">Vencido</option>
            </select>

        <select
          value={selectedFornecedor}
          onChange={(e) => setSelectedFornecedor(e.target.value)}
          className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="">Fornecedor</option>
          {fornecedores.map(forn => (
            <option key={forn.id} value={forn.nome}>{forn.nome}</option>
          ))}
        </select>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
            const [field, order] = e.target.value.split('-');
            setSortBy(field);
                setSortOrder(order);
              }}
          className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
          <option value="nome-asc">Nome A-Z</option>
          <option value="nome-desc">Nome Z-A</option>
          <option value="preco-asc">Preço Menor</option>
          <option value="preco-desc">Preço Maior</option>
          <option value="quantidade-asc">Estoque Menor</option>
            </select>

        <Button onClick={clearFilters} variant="outline" size="sm" className="text-xs">
          Limpar
            </Button>

                 <div className="flex gap-1 ml-auto">
           <button
             onClick={() => setViewMode('table')}
             className={`p-1 rounded text-xs ${viewMode === 'table' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : 'text-gray-600 dark:text-gray-400'}`}
             title="Tabela"
           >
             <span className="material-icons text-sm">table_chart</span>
           </button>
           <button
             onClick={() => setViewMode('list')}
             className={`p-1 rounded text-xs ${viewMode === 'list' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : 'text-gray-600 dark:text-gray-400'}`}
             title="Lista"
           >
             <span className="material-icons text-sm">format_list_bulleted</span>
           </button>
           <button
             onClick={() => setViewMode('cards')}
             className={`p-1 rounded text-xs ${viewMode === 'cards' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : 'text-gray-600 dark:text-gray-400'}`}
             title="Cards"
           >
             <span className="material-icons text-sm">grid_view</span>
           </button>
           <button
             onClick={() => setViewMode('kanban')}
             className={`p-1 rounded text-xs ${viewMode === 'kanban' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : 'text-gray-600 dark:text-gray-400'}`}
             title="Kanban"
           >
             <span className="material-icons text-sm">dashboard</span>
           </button>
         </div>
                  </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 overflow-auto p-3">
        {filteredAndSortedProdutos.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <div className="text-4xl mb-4">📦</div>
            <div className="text-lg font-medium mb-2">Nenhum produto encontrado</div>
            <div className="text-sm">Tente ajustar os filtros ou adicionar um novo produto</div>
                  </div>
        ) : (
          <>
            {viewMode === 'table' && renderTableView()}
            {viewMode === 'list' && renderListView()}
            {viewMode === 'cards' && renderCardsView()}
            {viewMode === 'kanban' && renderKanbanView()}
          </>
        )}
            </div>

      {/* Modal de Cadastro */}
      {showProdutoForm && (
        <ProdutoForm
          produto={editingProduto}
          onSave={handleSaveProduto}
          onCancel={() => setShowProdutoForm(false)}
        />
      )}

             {/* Modal de Importação */}
       {showImportModal && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
             <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
               <div className="flex items-center gap-3">
                 <span className="material-icons text-red-600 dark:text-red-400 text-2xl">upload_file</span>
                 <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                   Importar Produtos
                 </h2>
               </div>
               <button
                 onClick={() => setShowImportModal(false)}
                 className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
               >
                 <span className="material-icons text-xl">close</span>
               </button>
             </div>
             
             <div className="p-6 space-y-6">
               {/* Métodos de Importação */}
               <div>
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                   <span className="material-icons text-red-600 dark:text-red-400">receipt</span>
                   Métodos de Importação
                 </h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {/* Nota Fiscal XML */}
                   <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-red-300 dark:hover:border-red-600 transition-colors">
                     <div className="flex items-center gap-3 mb-3">
                       <span className="material-icons text-red-600 dark:text-red-400 text-2xl">receipt_long</span>
                       <div>
                         <h4 className="font-semibold text-gray-900 dark:text-gray-100">Nota Fiscal XML</h4>
                         <p className="text-sm text-gray-600 dark:text-gray-400">Importe produtos via NFe</p>
                       </div>
                     </div>
                     <div className="space-y-2">
                       <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                         <span className="material-icons text-sm">check_circle</span>
                         <span>Formato padrão brasileiro</span>
                       </div>
                       <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                         <span className="material-icons text-sm">check_circle</span>
                         <span>Extração automática de dados</span>
                       </div>
                       <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                         <span className="material-icons text-sm">check_circle</span>
                         <span>Códigos de barras EAN-13</span>
                       </div>
                     </div>
                     <Button variant="outline" size="sm" className="w-full mt-3">
                       <span className="material-icons text-sm mr-1">file_upload</span>
                       Selecionar XML
                     </Button>
                   </div>

                   {/* CSV/Excel */}
                   <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-red-300 dark:hover:border-red-600 transition-colors">
                     <div className="flex items-center gap-3 mb-3">
                       <span className="material-icons text-red-600 dark:text-red-400 text-2xl">table_chart</span>
                       <div>
                         <h4 className="font-semibold text-gray-900 dark:text-gray-100">CSV/Excel</h4>
                         <p className="text-sm text-gray-600 dark:text-gray-400">Importe via planilha</p>
                       </div>
                     </div>
                     <div className="space-y-2">
                       <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                         <span className="material-icons text-sm">check_circle</span>
                         <span>Formato personalizado</span>
                       </div>
                       <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                         <span className="material-icons text-sm">check_circle</span>
                         <span>Múltiplos produtos</span>
                       </div>
                       <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                         <span className="material-icons text-sm">check_circle</span>
                         <span>Template disponível</span>
                       </div>
                     </div>
                     <Button variant="outline" size="sm" className="w-full mt-3">
                       <span className="material-icons text-sm mr-1">file_upload</span>
                       Selecionar CSV/Excel
                     </Button>
                   </div>
                 </div>
               </div>

               {/* Área de Upload */}
               <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                 <div className="text-2xl mb-3">
                   <span className="material-icons text-4xl text-gray-400 dark:text-gray-500">cloud_upload</span>
                 </div>
                 <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                   Arraste o arquivo aqui ou clique para selecionar
                 </div>
                 <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                   Formatos aceitos: .xml (NFe), .csv, .xlsx, .xls
                 </div>
                 <input type="file" accept=".xml,.csv,.xlsx,.xls" className="hidden" />
                 <Button variant="outline" size="sm">
                   <span className="material-icons text-sm mr-1">file_upload</span>
                   Selecionar Arquivo
                 </Button>
               </div>

               {/* Ações */}
               <div className="flex gap-3">
                 <Button variant="outline" className="flex-1">
                   <span className="material-icons text-sm mr-1">description</span>
                   Baixar Template CSV
                 </Button>
                 <Button variant="outline" className="flex-1">
                   <span className="material-icons text-sm mr-1">help</span>
                   Ver Instruções
                 </Button>
               </div>

               {/* Botões */}
               <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                 <Button 
                   onClick={() => setShowImportModal(false)} 
                   variant="outline" 
                   className="flex-1"
                 >
                   <span className="material-icons text-sm mr-1">close</span>
                   Cancelar
                 </Button>
                 <Button className="flex-1">
                   <span className="material-icons text-sm mr-1">upload</span>
                   Importar Produtos
                 </Button>
               </div>
             </div>
           </div>
         </div>
      )}
    </div>
  );
}; 