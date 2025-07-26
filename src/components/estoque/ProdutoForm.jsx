import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../Button/Button';
import { Input } from '../ui/Input';
import { useEstoque } from '../../contexts/useEstoque';

const ProdutoForm = ({ produto, onSave, onCancel }) => {
  const { categorias, fornecedores } = useEstoque();
  const [formData, setFormData] = useState({
    codigo: '',
    nome: '',
    marca: '',
    categoriaId: '',
    fornecedorId: '',
    quantidade: '',
    estoqueMinimo: '',
    preco: '',
    precoCusto: '',
    precoVendaMinimo: '',
    precoVendaMaximo: '',
    descricao: '',
    unidade: 'un',
    peso: '',
    localizacao: '',
    dataValidade: '',
    ncm: '',
    cest: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (produto) {
      setFormData({
        codigo: produto.codigo || '',
        nome: produto.nome || '',
        marca: produto.marca || '',
        categoriaId: produto.categoriaId || '',
        fornecedorId: produto.fornecedorId || '',
        quantidade: produto.quantidade || '',
        estoqueMinimo: produto.estoqueMinimo || '',
        preco: produto.preco || '',
        precoCusto: produto.precoCusto || '',
        precoVendaMinimo: produto.precoVendaMinimo || '',
        precoVendaMaximo: produto.precoVendaMaximo || '',
        descricao: produto.descricao || '',
        unidade: produto.unidade || 'un',
        peso: produto.peso || '',
        localizacao: produto.localizacao || '',
        dataValidade: produto.dataValidade || '',
        ncm: produto.ncm || '',
        cest: produto.cest || ''
      });
    } else {
      // Gerar código EAN-13 para novo produto
      const generateEAN13 = () => {
        const prefix = '789'; // Código do Brasil
        const random = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
        // Calcular dígito verificador para um EAN-13 válido (simplificado para mock)
        let sum = 0;
        for (let i = 0; i < prefix.length; i++) {
            sum += parseInt(prefix[i]) * (i % 2 === 0 ? 1 : 3);
        }
        for (let i = 0; i < random.length; i++) {
            sum += parseInt(random[i]) * ((i + prefix.length) % 2 === 0 ? 1 : 3);
        }
        const checkDigit = (10 - (sum % 10)) % 10;
        return prefix + random + checkDigit;
      };
      setFormData(prev => ({ ...prev, codigo: generateEAN13() }));
    }
  }, [produto]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.codigo.trim()) {
      newErrors.codigo = 'Código é obrigatório';
    } else if (!/^[0-9]{13}$/.test(formData.codigo)) {
      newErrors.codigo = 'Código deve ter 13 dígitos numéricos (EAN-13)';
    }

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.categoriaId) {
      newErrors.categoriaId = 'Categoria é obrigatória';
    }

    if (!formData.fornecedorId) {
      newErrors.fornecedorId = 'Fornecedor é obrigatório';
    }

    if (formData.quantidade === '' || formData.quantidade < 0) {
      newErrors.quantidade = 'Quantidade deve ser maior ou igual a 0';
    }

    if (formData.estoqueMinimo === '' || formData.estoqueMinimo < 0) {
      newErrors.estoqueMinimo = 'Estoque mínimo deve ser maior ou igual a 0';
    }

    if (formData.preco === '' || formData.preco <= 0) {
      newErrors.preco = 'Preço de venda deve ser maior que 0';
    }

    if (formData.precoCusto === '' || formData.precoCusto <= 0) {
      newErrors.precoCusto = 'Preço de custo deve ser maior que 0';
    }

    if (formData.dataValidade && new Date(formData.dataValidade) < new Date()) {
      newErrors.dataValidade = 'Data de validade não pode ser no passado';
    }

    if (!formData.ncm.trim()) {
      newErrors.ncm = 'NCM é obrigatório';
    } else if (!/^[0-9]{8}$/.test(formData.ncm)) {
      newErrors.ncm = 'NCM deve ter 8 dígitos numéricos';
    }

    if (!formData.cest.trim()) {
      newErrors.cest = 'CEST é obrigatório';
    } else if (!/^[0-9]{7}$/.test(formData.cest)) {
      newErrors.cest = 'CEST deve ter 7 dígitos numéricos';
    }

    if (formData.precoVendaMinimo !== '' && parseFloat(formData.precoVendaMinimo) < 0) {
      newErrors.precoVendaMinimo = 'Preço mínimo não pode ser negativo';
    }

    if (formData.precoVendaMaximo !== '' && parseFloat(formData.precoVendaMaximo) < 0) {
      newErrors.precoVendaMaximo = 'Preço máximo não pode ser negativo';
    }

    const precoMin = parseFloat(formData.precoVendaMinimo);
    const precoMax = parseFloat(formData.precoVendaMaximo);
    const precoVenda = parseFloat(formData.preco);

    if (!isNaN(precoMin) && !isNaN(precoMax) && precoMin > precoMax) {
      newErrors.precoVendaMaximo = 'Preço máximo deve ser maior ou igual ao preço mínimo';
    }

    if (!isNaN(precoVenda) && !isNaN(precoMin) && precoVenda < precoMin) {
      newErrors.preco = 'Preço de venda não pode ser menor que o preço mínimo';
    }

    if (!isNaN(precoVenda) && !isNaN(precoMax) && precoVenda > precoMax) {
      newErrors.preco = 'Preço de venda não pode ser maior que o preço máximo';
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
        estoqueMinimo: parseInt(formData.estoqueMinimo),
        preco: parseFloat(formData.preco),
        precoCusto: parseFloat(formData.precoCusto),
        precoVendaMinimo: parseFloat(formData.precoVendaMinimo) || 0,
        precoVendaMaximo: parseFloat(formData.precoVendaMaximo) || 0,
        peso: parseFloat(formData.peso) || 0,
        status: 'ativo',
        dataCadastro: produto ? produto.dataCadastro : new Date().toISOString().split('T')[0],
        ultimaMovimentacao: new Date().toISOString().split('T')[0]
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <span className="material-icons text-red-600 dark:text-red-400 text-2xl">inventory_2</span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {produto ? 'Editar Produto' : 'Novo Produto'}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <span className="material-icons text-xl">close</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-10">
          {/* Informações Básicas */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-red-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                <span className="material-icons text-white text-xl">info</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Informações Básicas</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Dados essenciais do produto</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5 items-end">
              <div className="flex flex-col">
                <Input
                  label="Código de Barras (EAN-13) *"
                  value={formData.codigo}
                  onChange={(e) => handleChange('codigo', e.target.value)}
                  placeholder="7891234567890"
                  icon="qr_code"
                  error={errors.codigo}
                  helpText={errors.codigo}
                  disabled={!!produto}
                  maxLength={13}
                />
              </div>
              <div className="flex flex-col">
                <Input
                  label="Nome do Produto *"
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  placeholder="Digite o nome do produto"
                  icon="inventory_2"
                  error={errors.nome}
                  helpText={errors.nome}
                />
              </div>
              <div className="flex flex-col">
                <Input
                  label="Marca"
                  value={formData.marca}
                  onChange={(e) => handleChange('marca', e.target.value)}
                  placeholder="Digite a marca"
                  icon="label"
                />
              </div>
              <div className="flex flex-col">
                <Input
                  label="Data de Validade"
                  type="date"
                  value={formData.dataValidade}
                  onChange={(e) => handleChange('dataValidade', e.target.value)}
                  icon="event"
                  error={errors.dataValidade}
                  helpText={errors.dataValidade}
                />
              </div>
              <div className="flex flex-col lg:col-span-2">
                <div className="overflow-hidden max-w-full min-w-0">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 truncate whitespace-nowrap" title="Categoria *">Categoria *</label>
                </div>
                <select
                  value={formData.categoriaId}
                  onChange={(e) => handleChange('categoriaId', e.target.value)}
                  className={`w-full h-12 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 ${errors.categoriaId ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'}`}
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map(categoria => (
                    <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                  ))}
                </select>
                {errors.categoriaId && <p className="text-red-500 text-sm mt-1">{errors.categoriaId}</p>}
              </div>
              <div className="flex flex-col lg:col-span-2">
                <div className="overflow-hidden max-w-full min-w-0">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 truncate whitespace-nowrap" title="Fornecedor *">Fornecedor *</label>
                </div>
                <select
                  value={formData.fornecedorId}
                  onChange={(e) => handleChange('fornecedorId', e.target.value)}
                  className={`w-full h-12 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 ${errors.fornecedorId ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'}`}
                >
                  <option value="">Selecione um fornecedor</option>
                  {fornecedores.map(fornecedor => (
                    <option key={fornecedor.id} value={fornecedor.id}>{fornecedor.nome}</option>
                  ))}
                </select>
                {errors.fornecedorId && <p className="text-red-500 text-sm mt-1">{errors.fornecedorId}</p>}
              </div>
            </div>
          </div>

          {/* Estoque e Preços */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-red-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                <span className="material-icons text-white text-xl">inventory</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Estoque e Preços</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Controle de inventário e valores</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5 items-end">
              <div className="flex flex-col">
                <Input
                  label="Quantidade Atual *"
                  type="number"
                  value={formData.quantidade}
                  onChange={(e) => handleChange('quantidade', e.target.value)}
                  placeholder="0"
                  icon="format_list_numbered"
                  error={errors.quantidade}
                  helpText={errors.quantidade}
                />
              </div>
              <div className="flex flex-col">
                <Input
                  label="Estoque Mínimo *"
                  type="number"
                  value={formData.estoqueMinimo}
                  onChange={(e) => handleChange('estoqueMinimo', e.target.value)}
                  placeholder="0"
                  icon="bar_chart"
                  error={errors.estoqueMinimo}
                  helpText={errors.estoqueMinimo}
                />
              </div>
              <div className="flex flex-col">
                <Input
                  label="Preço de Venda (R$) *"
                  type="number"
                  step="0.01"
                  value={formData.preco}
                  onChange={(e) => handleChange('preco', e.target.value)}
                  placeholder="0.00"
                  icon="attach_money"
                  error={errors.preco}
                  helpText={errors.preco}
                />
              </div>
              <div className="flex flex-col">
                <Input
                  label="Preço de Custo (R$) *"
                  type="number"
                  step="0.01"
                  value={formData.precoCusto}
                  onChange={(e) => handleChange('precoCusto', e.target.value)}
                  placeholder="0.00"
                  icon="money_off"
                  error={errors.precoCusto}
                  helpText={errors.precoCusto}
                />
              </div>
              <div className="flex flex-col">
                <Input
                  label="Preço Venda Mínimo (R$)"
                  type="number"
                  step="0.01"
                  value={formData.precoVendaMinimo}
                  onChange={(e) => handleChange('precoVendaMinimo', e.target.value)}
                  placeholder="0.00"
                  icon="price_check"
                  error={errors.precoVendaMinimo}
                  helpText={errors.precoVendaMinimo}
                />
              </div>
              <div className="flex flex-col">
                <Input
                  label="Preço Venda Máximo (R$)"
                  type="number"
                  step="0.01"
                  value={formData.precoVendaMaximo}
                  onChange={(e) => handleChange('precoVendaMaximo', e.target.value)}
                  placeholder="0.00"
                  icon="price_change"
                  error={errors.precoVendaMaximo}
                  helpText={errors.precoVendaMaximo}
                />
              </div>
            </div>
          </div>

          {/* Informações Fiscais */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-red-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                <span className="material-icons text-white text-xl">description</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Informações Fiscais</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Dados fiscais para emissão de NF-e</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 items-end">
              <div className="flex flex-col">
                <Input
                  label="NCM *"
                  value={formData.ncm}
                  onChange={(e) => handleChange('ncm', e.target.value)}
                  placeholder="Ex: 12345678"
                  icon="article"
                  error={errors.ncm}
                  helpText={errors.ncm}
                  maxLength={8}
                />
              </div>
              <div className="flex flex-col">
                <Input
                  label="CEST *"
                  value={formData.cest}
                  onChange={(e) => handleChange('cest', e.target.value)}
                  placeholder="Ex: 1234567"
                  icon="receipt_long"
                  error={errors.cest}
                  helpText={errors.cest}
                  maxLength={7}
                />
              </div>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-red-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                <span className="material-icons text-white text-xl">add_circle</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Informações Adicionais</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Detalhes complementares do produto</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5 items-end">
              <div className="flex flex-col">
                <div className="overflow-hidden max-w-full min-w-0">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 truncate whitespace-nowrap" title="Unidade de Medida">Unidade de Medida</label>
                </div>
                <select
                  value={formData.unidade}
                  onChange={(e) => handleChange('unidade', e.target.value)}
                  className="w-full h-12 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                >
                  <option value="un">Unidade</option>
                  <option value="kg">Quilograma</option>
                  <option value="g">Grama</option>
                  <option value="l">Litro</option>
                  <option value="ml">Mililitro</option>
                  <option value="m">Metro</option>
                  <option value="cm">Centímetro</option>
                </select>
              </div>
              <div className="flex flex-col">
                <Input
                  label="Peso (kg)"
                  type="number"
                  step="0.01"
                  value={formData.peso}
                  onChange={(e) => handleChange('peso', e.target.value)}
                  placeholder="0.00"
                  icon="scale"
                />
              </div>
              <div className="flex flex-col">
                <Input
                  label="Localização"
                  value={formData.localizacao}
                  onChange={(e) => handleChange('localizacao', e.target.value)}
                  placeholder="Ex: Prateleira A1"
                  icon="place"
                />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col">
                <div className="overflow-hidden max-w-full min-w-0">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 truncate whitespace-nowrap" title="Descrição">Descrição</label>
                </div>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => handleChange('descricao', e.target.value)}
                  placeholder="Digite uma descrição detalhada do produto..."
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex items-center justify-center px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 border border-gray-200 dark:border-gray-600"
            >
              <span className="material-icons text-lg">close</span>
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-icons text-lg">save</span>
              {produto ? 'Atualizar' : 'Cadastrar'} Produto
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProdutoForm; 