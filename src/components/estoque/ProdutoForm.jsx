import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../Button/Button';
import { Input } from '../ui/Input';
import { useEstoque } from '../../contexts/useEstoque';

const ProdutoForm = ({ produto, onSave, onCancel }) => {
  const { categorias, fornecedores } = useEstoque();
  const [formData, setFormData] = useState({
    nome: '',
    categoriaId: '',
    fornecedorId: '',
    quantidade: '',
    preco: '',
    estoqueMinimo: '',
    descricao: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (produto) {
      setFormData({
        nome: produto.nome || '',
        categoriaId: produto.categoriaId || '',
        fornecedorId: produto.fornecedorId || '',
        quantidade: produto.quantidade || '',
        preco: produto.preco || '',
        estoqueMinimo: produto.estoqueMinimo || '',
        descricao: produto.descricao || ''
      });
    }
  }, [produto]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.categoriaId) {
      newErrors.categoriaId = 'Categoria é obrigatória';
    }

    if (!formData.fornecedorId) {
      newErrors.fornecedorId = 'Fornecedor é obrigatório';
    }

    if (!formData.quantidade || formData.quantidade < 0) {
      newErrors.quantidade = 'Quantidade deve ser maior ou igual a 0';
    }

    if (!formData.preco || formData.preco <= 0) {
      newErrors.preco = 'Preço deve ser maior que 0';
    }

    if (!formData.estoqueMinimo || formData.estoqueMinimo < 0) {
      newErrors.estoqueMinimo = 'Estoque mínimo deve ser maior ou igual a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const produtoData = {
        ...formData,
        quantidade: parseInt(formData.quantidade),
        preco: parseFloat(formData.preco),
        estoqueMinimo: parseInt(formData.estoqueMinimo)
      };
      onSave(produtoData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {produto ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Produto
                </label>
                <Input
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  placeholder="Digite o nome do produto"
                  error={errors.nome}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  value={formData.categoriaId}
                  onChange={(e) => handleChange('categoriaId', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.categoriaId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map(categoria => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
                {errors.categoriaId && (
                  <p className="text-red-500 text-sm mt-1">{errors.categoriaId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fornecedor
                </label>
                <select
                  value={formData.fornecedorId}
                  onChange={(e) => handleChange('fornecedorId', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.fornecedorId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione um fornecedor</option>
                  {fornecedores.map(fornecedor => (
                    <option key={fornecedor.id} value={fornecedor.id}>
                      {fornecedor.nome}
                    </option>
                  ))}
                </select>
                {errors.fornecedorId && (
                  <p className="text-red-500 text-sm mt-1">{errors.fornecedorId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantidade em Estoque
                </label>
                <Input
                  type="number"
                  value={formData.quantidade}
                  onChange={(e) => handleChange('quantidade', e.target.value)}
                  placeholder="0"
                  error={errors.quantidade}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preço (R$)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.preco}
                  onChange={(e) => handleChange('preco', e.target.value)}
                  placeholder="0.00"
                  error={errors.preco}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estoque Mínimo
                </label>
                <Input
                  type="number"
                  value={formData.estoqueMinimo}
                  onChange={(e) => handleChange('estoqueMinimo', e.target.value)}
                  placeholder="0"
                  error={errors.estoqueMinimo}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                value={formData.descricao}
                onChange={(e) => handleChange('descricao', e.target.value)}
                placeholder="Digite uma descrição do produto"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit">
                {produto ? 'Atualizar' : 'Criar'} Produto
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ProdutoForm; 