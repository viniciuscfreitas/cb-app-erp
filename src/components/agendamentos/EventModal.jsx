import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';

const EventModal = ({ event, timeSlot, onClose, onSave, onDelete, professionals }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    client: '',
    pet: '',
    service: '',
    professional: '',
    isRecurring: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [conflicts, setConflicts] = useState([]);

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        start: new Date(event.start).toISOString().slice(0, 16),
        end: new Date(event.end).toISOString().slice(0, 16),
        client: event.client?.name || '',
        pet: event.pet?.name || '',
        service: event.service?.id || '',
        professional: event.professional?.id || '',
        isRecurring: event.isRecurring || false
      });
    } else if (timeSlot) {
      setFormData(prev => ({
        ...prev,
        title: timeSlot.title || '',
        description: timeSlot.description || '',
        start: timeSlot.start,
        end: timeSlot.end,
        service: timeSlot.service || '',
        client: timeSlot.client || '',
        pet: timeSlot.pet || '',
        professional: timeSlot.professional || '',
        isRecurring: timeSlot.isRecurring || false
      }));
    }
  }, [event, timeSlot]);

  // Validação em tempo real
  useEffect(() => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }
    
    if (!formData.client.trim()) {
      newErrors.client = 'Cliente é obrigatório';
    }
    
    if (!formData.pet.trim()) {
      newErrors.pet = 'Pet é obrigatório';
    }
    
    if (!formData.service) {
      newErrors.service = 'Serviço é obrigatório';
    }
    
    if (formData.start && formData.end) {
      const start = new Date(formData.start);
      const end = new Date(formData.end);
      
      if (start >= end) {
        newErrors.end = 'Horário de fim deve ser posterior ao início';
      }
      
      if (start < new Date()) {
        newErrors.start = 'Não é possível agendar no passado';
      }
    }

    setErrors(newErrors);
  }, [formData]);

  // Verificar conflitos
  useEffect(() => {
    if (formData.start && formData.end && formData.professional) {
      // Mock de verificação de conflitos - será substituído por verificação real
      const start = new Date(formData.start);
      
      // Simular conflitos para demonstração
      const mockConflicts = [];
      if (start.getHours() === 9 && start.getMinutes() === 0) {
        mockConflicts.push({
          id: 'conflict-1',
          title: 'Banho e Tosa - Rex',
          start: '09:00',
          end: '10:30',
          client: 'João Santos',
          pet: 'Rex'
        });
      }
      
      setConflicts(mockConflicts);
    }
  }, [formData.start, formData.end, formData.professional]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const eventData = {
        id: event?.id || Date.now().toString(),
        title: formData.title,
        description: formData.description,
        start: new Date(formData.start),
        end: new Date(formData.end),
        client: { id: '1', name: formData.client },
        pet: { id: '1', name: formData.pet },
        service: services.find(s => s.id === formData.service),
        professional: professionals.find(p => p.id === formData.professional),
        isRecurring: formData.isRecurring
      };

      onSave(eventData);
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
    }
  };

  const handleDurationChange = (duration) => {
    if (formData.start) {
      const start = new Date(formData.start);
      const end = new Date(start);
      end.setMinutes(start.getMinutes() + duration);
      setFormData(prev => ({
        ...prev,
        end: end.toISOString().slice(0, 16)
      }));
    }
  };

  // Mock data - será substituído por dados reais
  const services = [
    { id: '1', name: 'Banho e Tosa', color: '#4285F4', duration: 90 },
    { id: '2', name: 'Banho Completo', color: '#34A853', duration: 60 },
    { id: '3', name: 'Tosa Higiênica', color: '#FBBC04', duration: 30 }
  ];

  const clients = [
    { id: '1', name: 'João Santos' },
    { id: '2', name: 'Maria Silva' },
    { id: '3', name: 'Pedro Costa' },
    { id: '4', name: 'Ana Oliveira' },
    { id: '5', name: 'Carlos Ferreira' }
  ];

  const pets = [
    { id: '1', name: 'Rex' },
    { id: '2', name: 'Luna' },
    { id: '3', name: 'Thor' },
    { id: '4', name: 'Max' },
    { id: '5', name: 'Bella' }
  ];

  const durations = [
    { label: '30 min', value: 30 },
    { label: '45 min', value: 45 },
    { label: '1 hora', value: 60 },
    { label: '1h 30min', value: 90 },
    { label: '2 horas', value: 120 }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
      aria-describedby="event-modal-description"
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 id="event-modal-title" className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {event ? 'Editar Agendamento' : 'Novo Agendamento'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Fechar modal"
            >
              <span className="material-icons" aria-hidden="true">close</span>
            </button>
          </div>
          <div id="event-modal-description" className="sr-only">
            {event ? 'Editar detalhes do agendamento existente' : 'Criar novo agendamento'}
          </div>

          {/* Alertas de conflito */}
          {conflicts.length > 0 && (
            <div 
              className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-center">
                <span className="material-icons text-yellow-600 dark:text-yellow-400 mr-2" aria-hidden="true">warning</span>
                <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Conflito de horário detectado
                </span>
              </div>
              <div className="mt-2 text-xs text-yellow-700 dark:text-yellow-300">
                {conflicts.map(conflict => (
                  <div key={conflict.id} className="mb-1">
                    {conflict.title} ({conflict.start}-{conflict.end}) - {conflict.client} • {conflict.pet}
                  </div>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" role="form" aria-labelledby="event-modal-title">
            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Título *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 ${
                  errors.title ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Ex: Banho e Tosa - Rex"
                required
                aria-describedby={errors.title ? "title-error" : undefined}
                aria-invalid={!!errors.title}
              />
              {errors.title && (
                <p id="title-error" className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert">{errors.title}</p>
              )}
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Descrição
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                placeholder="Observações sobre o serviço..."
              />
            </div>

            {/* Data e Hora */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Início *
                </label>
                <input
                  type="datetime-local"
                  value={formData.start}
                  onChange={(e) => setFormData(prev => ({ ...prev, start: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 ${
                    errors.start ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                />
                {errors.start && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.start}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fim *
                </label>
                <input
                  type="datetime-local"
                  value={formData.end}
                  onChange={(e) => setFormData(prev => ({ ...prev, end: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 ${
                    errors.end ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                />
                {errors.end && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.end}</p>
                )}
              </div>
            </div>

            {/* Duração rápida */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Duração Rápida
              </label>
              <div className="flex space-x-2">
                {durations.map(duration => (
                  <button
                    key={duration.value}
                    type="button"
                    onClick={() => handleDurationChange(duration.value)}
                    className="px-3 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {duration.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cliente e Pet */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cliente *
                </label>
                <select
                  value={formData.client}
                  onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 ${
                    errors.client ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                >
                  <option value="">Selecione um cliente</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.name}>{client.name}</option>
                  ))}
                </select>
                {errors.client && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.client}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Pet *
                </label>
                <select
                  value={formData.pet}
                  onChange={(e) => setFormData(prev => ({ ...prev, pet: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 ${
                    errors.pet ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                >
                  <option value="">Selecione um pet</option>
                  {pets.map(pet => (
                    <option key={pet.id} value={pet.name}>{pet.name}</option>
                  ))}
                </select>
                {errors.pet && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.pet}</p>
                )}
              </div>
            </div>

            {/* Serviço e Profissional */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Serviço *
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 ${
                    errors.service ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                >
                  <option value="">Selecione um serviço</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>{service.name} ({service.duration}min)</option>
                  ))}
                </select>
                {errors.service && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.service}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Profissional
                </label>
                <select
                  value={formData.professional}
                  onChange={(e) => setFormData(prev => ({ ...prev, professional: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                >
                  <option value="">Sem profissional (definir na hora)</option>
                  {professionals.filter(p => p.id !== 'all').map(professional => (
                    <option key={professional.id} value={professional.id}>{professional.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Evento Recorrente */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="recurring"
                checked={formData.isRecurring}
                onChange={(e) => setFormData(prev => ({ ...prev, isRecurring: e.target.checked }))}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="recurring" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Evento recorrente
              </label>
            </div>

            {/* Botões */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Salvando...' : (event ? 'Salvar' : 'Criar')}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancelar
                </button>
              </div>
              
              {event && onDelete && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Excluir
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventModal; 