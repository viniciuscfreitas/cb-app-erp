import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../Button/Button';
import { Input } from '../ui/Input';

const CategoriaForm = ({ categoria, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: categoria?.nome || '',
    descricao: categoria?.descricao || ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
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
            {categoria ? 'Editar Categoria' : 'Nova Categoria'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome da Categoria
              </label>
              <Input
                value={formData.nome}
                onChange={(e) => handleChange('nome', e.target.value)}
                placeholder="Digite o nome da categoria"
                error={errors.nome}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                value={formData.descricao}
                onChange={(e) => handleChange('descricao', e.target.value)}
                placeholder="Digite uma descrição da categoria"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit">
                {categoria ? 'Atualizar' : 'Criar'} Categoria
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default CategoriaForm; 