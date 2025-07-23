import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../Button/Button';
import { Input } from '../ui/Input';

const FornecedorForm = ({ fornecedor, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: fornecedor?.nome || '',
    email: fornecedor?.email || '',
    telefone: fornecedor?.telefone || ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
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
      <Card className="w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {fornecedor ? 'Editar Fornecedor' : 'Novo Fornecedor'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Fornecedor
              </label>
              <Input
                value={formData.nome}
                onChange={(e) => handleChange('nome', e.target.value)}
                placeholder="Digite o nome do fornecedor"
                error={errors.nome}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="contato@fornecedor.com"
                error={errors.email}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefone
              </label>
              <Input
                value={formData.telefone}
                onChange={(e) => handleChange('telefone', e.target.value)}
                placeholder="(11) 99999-9999"
                error={errors.telefone}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit">
                {fornecedor ? 'Atualizar' : 'Criar'} Fornecedor
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default FornecedorForm; 