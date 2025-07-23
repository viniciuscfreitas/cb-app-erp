import React, { createContext, useReducer, useEffect } from 'react';

const EstoqueContext = createContext();

const initialState = {
  produtos: [
    {
      id: 1,
      codigo: 'RACAO001',
      nome: 'Ração Premium Cães',
      categoriaId: 1,
      subcategoria: 'Ração Seca',
      fornecedorId: 1,
      quantidade: 50,
      estoqueMinimo: 10,
      estoqueMaximo: 100,
      preco: 89.90,
      precoCusto: 65.00,
      dataValidade: '2025-12-31',
      localizacao: 'Prateleira A1',
      unidade: 'kg',
      peso: 15,
      marca: 'PremiumPet',
      descricao: 'Ração premium para cães adultos, rica em proteínas',
      status: 'ativo',
      dataCadastro: '2024-01-15',
      ultimaMovimentacao: '2024-12-19',
      giroEstoque: 4.2,
      margemLucro: 27.7
    },
    {
      id: 2,
      codigo: 'SHAMP002',
      nome: 'Shampoo para Gatos',
      categoriaId: 2,
      subcategoria: 'Shampoo',
      fornecedorId: 2,
      quantidade: 25,
      estoqueMinimo: 5,
      estoqueMaximo: 50,
      preco: 45.50,
      precoCusto: 32.00,
      dataValidade: '2026-06-30',
      localizacao: 'Prateleira B2',
      unidade: 'ml',
      peso: 500,
      marca: 'PetCare',
      descricao: 'Shampoo hipoalergênico para gatos',
      status: 'ativo',
      dataCadastro: '2024-02-10',
      ultimaMovimentacao: '2024-12-18',
      giroEstoque: 3.8,
      margemLucro: 29.7
    },
    {
      id: 3,
      codigo: 'BRINQ003',
      nome: 'Brinquedo Interativo',
      categoriaId: 3,
      subcategoria: 'Interativos',
      fornecedorId: 1,
      quantidade: 15,
      estoqueMinimo: 8,
      estoqueMaximo: 30,
      preco: 32.00,
      precoCusto: 22.00,
      dataValidade: null,
      localizacao: 'Prateleira C3',
      unidade: 'un',
      peso: 0.5,
      marca: 'PetPlay',
      descricao: 'Brinquedo interativo para estimular cães',
      status: 'ativo',
      dataCadastro: '2024-03-05',
      ultimaMovimentacao: '2024-12-17',
      giroEstoque: 2.1,
      margemLucro: 31.3
    },
    {
      id: 4,
      codigo: 'COLEI004',
      nome: 'Coleira Ajustável',
      categoriaId: 5,
      subcategoria: 'Coleiras',
      fornecedorId: 3,
      quantidade: 8,
      estoqueMinimo: 10,
      estoqueMaximo: 25,
      preco: 28.50,
      precoCusto: 18.00,
      dataValidade: null,
      localizacao: 'Prateleira D4',
      unidade: 'un',
      peso: 0.3,
      marca: 'VetStyle',
      descricao: 'Coleira ajustável com fecho de segurança',
      status: 'ativo',
      dataCadastro: '2024-01-20',
      ultimaMovimentacao: '2024-12-16',
      giroEstoque: 1.8,
      margemLucro: 36.8
    },
    {
      id: 5,
      codigo: 'ANTIP005',
      nome: 'Anti-pulgas',
      categoriaId: 4,
      subcategoria: 'Parasitas',
      fornecedorId: 2,
      quantidade: 3,
      estoqueMinimo: 5,
      estoqueMaximo: 20,
      preco: 65.00,
      precoCusto: 45.00,
      dataValidade: '2025-08-15',
      localizacao: 'Geladeira E1',
      unidade: 'ml',
      peso: 30,
      marca: 'PetCare',
      descricao: 'Anti-pulgas e carrapatos para cães',
      status: 'ativo',
      dataCadastro: '2024-02-15',
      ultimaMovimentacao: '2024-12-15',
      giroEstoque: 2.5,
      margemLucro: 30.8
    },
    {
      id: 6,
      codigo: 'RACAO006',
      nome: 'Ração Premium Gatos',
      categoriaId: 1,
      subcategoria: 'Ração Seca',
      fornecedorId: 1,
      quantidade: 35,
      estoqueMinimo: 8,
      estoqueMaximo: 80,
      preco: 75.90,
      precoCusto: 55.00,
      dataValidade: '2025-11-30',
      localizacao: 'Prateleira A2',
      unidade: 'kg',
      peso: 10,
      marca: 'PremiumPet',
      descricao: 'Ração premium para gatos adultos',
      status: 'ativo',
      dataCadastro: '2024-01-25',
      ultimaMovimentacao: '2024-12-14',
      giroEstoque: 3.9,
      margemLucro: 27.5
    },
    {
      id: 7,
      codigo: 'ESCOV007',
      nome: 'Escova para Cães',
      categoriaId: 2,
      subcategoria: 'Escovas',
      fornecedorId: 2,
      quantidade: 12,
      estoqueMinimo: 5,
      estoqueMaximo: 25,
      preco: 18.50,
      precoCusto: 12.00,
      dataValidade: null,
      localizacao: 'Prateleira B3',
      unidade: 'un',
      peso: 0.2,
      marca: 'PetCare',
      descricao: 'Escova para pelagem de cães',
      status: 'ativo',
      dataCadastro: '2024-03-10',
      ultimaMovimentacao: '2024-12-13',
      giroEstoque: 2.8,
      margemLucro: 35.1
    },
    {
      id: 8,
      codigo: 'BOLIN008',
      nome: 'Bolinha de Borracha',
      categoriaId: 3,
      subcategoria: 'Bolas',
      fornecedorId: 4,
      quantidade: 20,
      estoqueMinimo: 10,
      estoqueMaximo: 40,
      preco: 15.00,
      precoCusto: 8.00,
      dataValidade: null,
      localizacao: 'Prateleira C4',
      unidade: 'un',
      peso: 0.1,
      marca: 'PetPlay',
      descricao: 'Bolinha de borracha resistente',
      status: 'ativo',
      dataCadastro: '2024-02-20',
      ultimaMovimentacao: '2024-12-12',
      giroEstoque: 4.1,
      margemLucro: 46.7
    },
    {
      id: 9,
      codigo: 'VERMI009',
      nome: 'Vermífugo',
      categoriaId: 4,
      subcategoria: 'Vermífugos',
      fornecedorId: 5,
      quantidade: 7,
      estoqueMinimo: 5,
      estoqueMaximo: 15,
      preco: 42.00,
      precoCusto: 28.00,
      dataValidade: '2025-09-20',
      localizacao: 'Geladeira E2',
      unidade: 'ml',
      peso: 50,
      marca: 'VetProd',
      descricao: 'Vermífugo para cães e gatos',
      status: 'ativo',
      dataCadastro: '2024-01-30',
      ultimaMovimentacao: '2024-12-11',
      giroEstoque: 2.2,
      margemLucro: 33.3
    },
    {
      id: 10,
      codigo: 'TAPET010',
      nome: 'Tapete Higiênico',
      categoriaId: 2,
      subcategoria: 'Tapetes',
      fornecedorId: 2,
      quantidade: 30,
      estoqueMinimo: 15,
      estoqueMaximo: 60,
      preco: 25.90,
      precoCusto: 18.00,
      dataValidade: null,
      localizacao: 'Prateleira B4',
      unidade: 'pacote',
      peso: 2,
      marca: 'PetCare',
      descricao: 'Tapete higiênico absorvente',
      status: 'ativo',
      dataCadastro: '2024-02-05',
      ultimaMovimentacao: '2024-12-10',
      giroEstoque: 3.2,
      margemLucro: 30.5
    }
  ],
  categorias: [
    { id: 1, nome: 'Alimentação', descricao: 'Produtos alimentícios' },
    { id: 2, nome: 'Higiene', descricao: 'Produtos de higiene' },
    { id: 3, nome: 'Brinquedos', descricao: 'Brinquedos para pets' },
    { id: 4, nome: 'Medicamentos', descricao: 'Medicamentos veterinários' },
    { id: 5, nome: 'Acessórios', descricao: 'Acessórios para pets' }
  ],
  fornecedores: [
    { id: 1, nome: 'PetFood Ltda', email: 'contato@petfood.com', telefone: '(11) 99999-9999' },
    { id: 2, nome: 'PetCare Brasil', email: 'vendas@petcare.com', telefone: '(11) 88888-8888' },
    { id: 3, nome: 'VetProdutos', email: 'contato@vetprodutos.com', telefone: '(11) 77777-7777' },
    { id: 4, nome: 'PetAcessórios', email: 'contato@petacessorios.com', telefone: '(11) 66666-6666' },
    { id: 5, nome: 'VetFarma', email: 'vendas@vetfarma.com', telefone: '(11) 55555-5555' }
  ]
};

const estoqueReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUTO':
      return {
        ...state,
        produtos: [...state.produtos, { ...action.payload, id: Date.now() }]
      };
    
    case 'UPDATE_PRODUTO':
      return {
        ...state,
        produtos: state.produtos.map(produto =>
          produto.id === action.payload.id ? action.payload : produto
        )
      };
    
    case 'DELETE_PRODUTO':
      return {
        ...state,
        produtos: state.produtos.filter(produto => produto.id !== action.payload)
      };
    
    case 'ADD_CATEGORIA':
      return {
        ...state,
        categorias: [...state.categorias, { ...action.payload, id: Date.now() }]
      };
    
    case 'UPDATE_CATEGORIA':
      return {
        ...state,
        categorias: state.categorias.map(categoria =>
          categoria.id === action.payload.id ? action.payload : categoria
        )
      };
    
    case 'DELETE_CATEGORIA':
      return {
        ...state,
        categorias: state.categorias.filter(categoria => categoria.id !== action.payload)
      };
    
    case 'ADD_FORNECEDOR':
      return {
        ...state,
        fornecedores: [...state.fornecedores, { ...action.payload, id: Date.now() }]
      };
    
    case 'UPDATE_FORNECEDOR':
      return {
        ...state,
        fornecedores: state.fornecedores.map(fornecedor =>
          fornecedor.id === action.payload.id ? action.payload : fornecedor
        )
      };
    
    case 'DELETE_FORNECEDOR':
      return {
        ...state,
        fornecedores: state.fornecedores.filter(fornecedor => fornecedor.id !== action.payload)
      };
    
    case 'UPDATE_ESTOQUE':
      return {
        ...state,
        produtos: state.produtos.map(produto =>
          produto.id === action.payload.id
            ? { ...produto, quantidade: action.payload.quantidade }
            : produto
        )
      };
    
    default:
      return state;
  }
};

export const EstoqueProvider = ({ children }) => {
  const [state, dispatch] = useReducer(estoqueReducer, initialState);

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const savedData = localStorage.getItem('estoqueData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach(key => {
        if (parsedData[key]) {
          dispatch({ type: `LOAD_${key.toUpperCase()}`, payload: parsedData[key] });
        }
      });
    }
  }, []);

  // Salvar dados no localStorage quando houver mudanças
  useEffect(() => {
    localStorage.setItem('estoqueData', JSON.stringify(state));
  }, [state]);

  const addProduto = (produto) => {
    dispatch({ type: 'ADD_PRODUTO', payload: produto });
  };

  const updateProduto = (id, produto) => {
    dispatch({ type: 'UPDATE_PRODUTO', payload: { ...produto, id } });
  };

  const deleteProduto = (id) => {
    dispatch({ type: 'DELETE_PRODUTO', payload: id });
  };

  const addCategoria = (categoria) => {
    dispatch({ type: 'ADD_CATEGORIA', payload: categoria });
  };

  const updateCategoria = (id, categoria) => {
    dispatch({ type: 'UPDATE_CATEGORIA', payload: { ...categoria, id } });
  };

  const deleteCategoria = (id) => {
    dispatch({ type: 'DELETE_CATEGORIA', payload: id });
  };

  const addFornecedor = (fornecedor) => {
    dispatch({ type: 'ADD_FORNECEDOR', payload: fornecedor });
  };

  const updateFornecedor = (id, fornecedor) => {
    dispatch({ type: 'UPDATE_FORNECEDOR', payload: { ...fornecedor, id } });
  };

  const deleteFornecedor = (id) => {
    dispatch({ type: 'DELETE_FORNECEDOR', payload: id });
  };

  const updateEstoque = (id, quantidade) => {
    dispatch({ type: 'UPDATE_ESTOQUE', payload: { id, quantidade } });
  };

  const getProdutosBaixoEstoque = () => {
    return state.produtos.filter(produto => produto.quantidade <= produto.estoqueMinimo);
  };

  const getProdutosVencendo = () => {
    const hoje = new Date();
    const trintaDias = new Date(hoje.getTime() + (30 * 24 * 60 * 60 * 1000));
    
    return state.produtos.filter(produto => {
      if (!produto.dataValidade) return false;
      const dataValidade = new Date(produto.dataValidade);
      return dataValidade <= trintaDias && dataValidade >= hoje;
    });
  };

  const getProdutosVencidos = () => {
    const hoje = new Date();
    return state.produtos.filter(produto => {
      if (!produto.dataValidade) return false;
      const dataValidade = new Date(produto.dataValidade);
      return dataValidade < hoje;
    });
  };

  const getProdutosEstoqueMaximo = () => {
    return state.produtos.filter(produto => produto.quantidade >= produto.estoqueMaximo);
  };

  const getProdutosPorCategoria = (categoriaId) => {
    return state.produtos.filter(produto => produto.categoriaId === categoriaId);
  };

  const getProdutosPorFornecedor = (fornecedorId) => {
    return state.produtos.filter(produto => produto.fornecedorId === fornecedorId);
  };

  const calcularValorTotalEstoque = () => {
    return state.produtos.reduce((total, produto) => {
      return total + (produto.quantidade * produto.preco);
    }, 0);
  };

  const calcularValorCustoEstoque = () => {
    return state.produtos.reduce((total, produto) => {
      return total + (produto.quantidade * produto.precoCusto);
    }, 0);
  };

  const getProdutosPorGiroEstoque = (minGiro = 0) => {
    return state.produtos.filter(produto => produto.giroEstoque >= minGiro);
  };

  const buscarProdutos = (termo) => {
    const termoLower = termo.toLowerCase();
    return state.produtos.filter(produto => 
      produto.nome.toLowerCase().includes(termoLower) ||
      produto.codigo.toLowerCase().includes(termoLower) ||
      produto.marca.toLowerCase().includes(termoLower) ||
      produto.descricao.toLowerCase().includes(termoLower)
    );
  };

  const getIndicadoresEstoque = () => {
    const totalProdutos = state.produtos.length;
    const produtosBaixoEstoque = getProdutosBaixoEstoque().length;
    const produtosVencendo = getProdutosVencendo().length;
    const produtosVencidos = getProdutosVencidos().length;
    const valorTotal = calcularValorTotalEstoque();
    const valorCusto = calcularValorCustoEstoque();
    const margemTotal = ((valorTotal - valorCusto) / valorTotal) * 100;

    return {
      totalProdutos,
      produtosBaixoEstoque,
      produtosVencendo,
      produtosVencidos,
      valorTotal: valorTotal.toFixed(2),
      valorCusto: valorCusto.toFixed(2),
      margemTotal: margemTotal.toFixed(1)
    };
  };

  const value = {
    ...state,
    addProduto,
    updateProduto,
    deleteProduto,
    addCategoria,
    updateCategoria,
    deleteCategoria,
    addFornecedor,
    updateFornecedor,
    deleteFornecedor,
    updateEstoque,
    getProdutosBaixoEstoque,
    getProdutosVencendo,
    getProdutosVencidos,
    getProdutosEstoqueMaximo,
    getProdutosPorCategoria,
    getProdutosPorFornecedor,
    calcularValorTotalEstoque,
    calcularValorCustoEstoque,
    getProdutosPorGiroEstoque,
    buscarProdutos,
    getIndicadoresEstoque
  };

  return (
    <EstoqueContext.Provider value={value}>
      {children}
    </EstoqueContext.Provider>
  );
};

export { EstoqueContext }; 