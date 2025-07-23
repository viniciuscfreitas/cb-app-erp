import React, { useState } from 'react';
import { PetShopContext } from './PetShopContext.js';

export function PetShopProvider({ children }) {
  // Estado para clientes
  const [clientes, setClientes] = useState([
    {
      id: '1',
      nome: 'João Silva',
      email: 'joao@email.com',
      telefone: '(11) 99999-9999',
      endereco: 'Rua das Flores, 123 - São Paulo, SP',
      cpf: '123.456.789-00',
      dataCadastro: '2024-01-15',
      observacoes: 'Cliente preferencial, sempre pontual',
      status: 'ativo'
    },
    {
      id: '2',
      nome: 'Maria Santos',
      email: 'maria@email.com',
      telefone: '(11) 88888-8888',
      endereco: 'Av. Paulista, 456 - São Paulo, SP',
      cpf: '987.654.321-00',
      dataCadastro: '2024-02-20',
      observacoes: 'Gosta de agendamentos pela manhã',
      status: 'ativo'
    },
    {
      id: '3',
      nome: 'Pedro Costa',
      email: 'pedro@email.com',
      telefone: '(11) 77777-7777',
      endereco: 'Rua Augusta, 789 - São Paulo, SP',
      cpf: '456.789.123-00',
      dataCadastro: '2024-03-10',
      observacoes: 'Primeira visita',
      status: 'ativo'
    },
    {
      id: '4',
      nome: 'Ana Oliveira',
      email: 'ana@email.com',
      telefone: '(11) 66666-6666',
      endereco: 'Rua Oscar Freire, 321 - São Paulo, SP',
      cpf: '789.123.456-00',
      dataCadastro: '2024-01-05',
      observacoes: 'Cliente VIP, sempre traz 2 pets',
      status: 'ativo'
    },
    {
      id: '5',
      nome: 'Carlos Ferreira',
      email: 'carlos@email.com',
      telefone: '(11) 55555-5555',
      endereco: 'Av. Brigadeiro Faria Lima, 654 - São Paulo, SP',
      cpf: '321.654.987-00',
      dataCadastro: '2024-02-15',
      observacoes: 'Prefere atendimento à tarde',
      status: 'ativo'
    },
    {
      id: '6',
      nome: 'Fernanda Lima',
      email: 'fernanda@email.com',
      telefone: '(11) 44444-4444',
      endereco: 'Rua Haddock Lobo, 987 - São Paulo, SP',
      cpf: '654.987.321-00',
      dataCadastro: '2024-03-01',
      observacoes: 'Nova cliente, muito atenciosa',
      status: 'ativo'
    },
    {
      id: '7',
      nome: 'Roberto Almeida',
      email: 'roberto@email.com',
      telefone: '(11) 33333-3333',
      endereco: 'Av. Jabaquara, 147 - São Paulo, SP',
      cpf: '987.321.654-00',
      dataCadastro: '2024-01-25',
      observacoes: 'Cliente recorrente, sempre satisfeito',
      status: 'ativo'
    },
    {
      id: '8',
      nome: 'Lucia Mendes',
      email: 'lucia@email.com',
      telefone: '(11) 22222-2222',
      endereco: 'Rua Teodoro Sampaio, 258 - São Paulo, SP',
      cpf: '321.987.654-00',
      dataCadastro: '2024-02-10',
      observacoes: 'Gosta de produtos premium',
      status: 'ativo'
    },
    {
      id: '9',
      nome: 'Antonio Rodrigues',
      email: 'antonio@email.com',
      telefone: '(11) 11111-1111',
      endereco: 'Av. Santo Amaro, 369 - São Paulo, SP',
      cpf: '654.321.987-00',
      dataCadastro: '2024-03-05',
      observacoes: 'Primeira visita, muito interessado',
      status: 'ativo'
    },
    {
      id: '10',
      nome: 'Sandra Costa',
      email: 'sandra@email.com',
      telefone: '(11) 00000-0000',
      endereco: 'Rua Cardeal Arcoverde, 741 - São Paulo, SP',
      cpf: '987.654.321-00',
      dataCadastro: '2024-01-30',
      observacoes: 'Cliente fiel há 3 anos',
      status: 'ativo'
    }
  ]);

  // Estado para pets
  const [pets, setPets] = useState([
    {
      id: '1',
      nome: 'Rex',
      especie: 'Cão',
      raca: 'Golden Retriever',
      idade: 3,
      peso: 25.5,
      cor: 'Dourado',
      sexo: 'Macho',
      donoId: '1',
      dono: { id: '1', nome: 'João Silva' },
      dataCadastro: '2024-01-15',
      observacoes: 'Muito dócil, adora crianças',
      status: 'ativo',
      fotoUrl: '/assets/pets/rex.jpg'
    },
    {
      id: '2',
      nome: 'Luna',
      especie: 'Gato',
      raca: 'Persa',
      idade: 2,
      peso: 4.2,
      cor: 'Branco',
      sexo: 'Fêmea',
      donoId: '2',
      dono: { id: '2', nome: 'Maria Santos' },
      dataCadastro: '2024-02-20',
      observacoes: 'Arredio, precisa de paciência',
      status: 'ativo',
      fotoUrl: '/assets/pets/luna.jpg'
    },
    {
      id: '3',
      nome: 'Thor',
      especie: 'Cão',
      raca: 'Husky Siberiano',
      idade: 4,
      peso: 28.0,
      cor: 'Cinza e Branco',
      sexo: 'Macho',
      donoId: '3',
      dono: { id: '3', nome: 'Pedro Costa' },
      dataCadastro: '2024-03-10',
      observacoes: 'Muito energético, precisa de exercício',
      status: 'ativo',
      fotoUrl: '/assets/pets/thor.jpg'
    },
    {
      id: '4',
      nome: 'Max',
      especie: 'Cão',
      raca: 'Labrador',
      idade: 5,
      peso: 30.0,
      cor: 'Preto',
      sexo: 'Macho',
      donoId: '4',
      dono: { id: '4', nome: 'Ana Oliveira' },
      dataCadastro: '2024-01-05',
      observacoes: 'Muito inteligente, adora nadar',
      status: 'ativo',
      fotoUrl: '/assets/pets/max.jpg'
    },
    {
      id: '5',
      nome: 'Bella',
      especie: 'Gato',
      raca: 'Siamês',
      idade: 1,
      peso: 3.8,
      cor: 'Bege e Marrom',
      sexo: 'Fêmea',
      donoId: '5',
      dono: { id: '5', nome: 'Carlos Ferreira' },
      dataCadastro: '2024-02-15',
      observacoes: 'Muito carinhosa, adora colo',
      status: 'ativo',
      fotoUrl: '/assets/pets/bella.jpg'
    },
    {
      id: '6',
      nome: 'Rocky',
      especie: 'Cão',
      raca: 'Bulldog Francês',
      idade: 2,
      peso: 12.5,
      cor: 'Tigrado',
      sexo: 'Macho',
      donoId: '6',
      dono: { id: '6', nome: 'Fernanda Lima' },
      dataCadastro: '2024-03-01',
      observacoes: 'Muito brincalhão, adora outros cães',
      status: 'ativo',
      fotoUrl: '/assets/pets/rocky.jpg'
    },
    {
      id: '7',
      nome: 'Zeus',
      especie: 'Cão',
      raca: 'Pastor Alemão',
      idade: 6,
      peso: 35.0,
      cor: 'Preto e Marrom',
      sexo: 'Macho',
      donoId: '7',
      dono: { id: '7', nome: 'Roberto Almeida' },
      dataCadastro: '2024-01-25',
      observacoes: 'Muito protetor, excelente guardião',
      status: 'ativo',
      fotoUrl: '/assets/pets/zeus.jpg'
    },
    {
      id: '8',
      nome: 'Nina',
      especie: 'Gato',
      raca: 'Maine Coon',
      idade: 3,
      peso: 6.2,
      cor: 'Laranja e Branco',
      sexo: 'Fêmea',
      donoId: '8',
      dono: { id: '8', nome: 'Lucia Mendes' },
      dataCadastro: '2024-02-10',
      observacoes: 'Muito elegante, adora janelas',
      status: 'ativo',
      fotoUrl: '/assets/pets/nina.jpg'
    },
    {
      id: '9',
      nome: 'Buddy',
      especie: 'Cão',
      raca: 'Beagle',
      idade: 4,
      peso: 15.0,
      cor: 'Tricolor',
      sexo: 'Macho',
      donoId: '9',
      dono: { id: '9', nome: 'Antonio Rodrigues' },
      dataCadastro: '2024-03-05',
      observacoes: 'Muito farejador, adora passeios',
      status: 'ativo',
      fotoUrl: '/assets/pets/buddy.jpg'
    },
    {
      id: '10',
      nome: 'Mia',
      especie: 'Gato',
      raca: 'Ragdoll',
      idade: 2,
      peso: 5.0,
      cor: 'Azul',
      sexo: 'Fêmea',
      donoId: '10',
      dono: { id: '10', nome: 'Sandra Costa' },
      dataCadastro: '2024-01-30',
      observacoes: 'Muito tranquila, adora carinho',
      status: 'ativo',
      fotoUrl: '/assets/pets/mia.jpg'
    }
  ]);

  // Estado para fichas selecionadas
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);

  // Funções para gerenciar clientes
  const addCliente = (cliente) => {
    const newCliente = { ...cliente, id: Math.random().toString(36).substr(2, 9) };
    setClientes(prev => [newCliente, ...prev]);
    return newCliente;
  };

  const updateCliente = (id, updates) => {
    setClientes(prev => prev.map(cliente => 
      cliente.id === id ? { ...cliente, ...updates } : cliente
    ));
  };

  const deleteCliente = (id) => {
    setClientes(prev => prev.filter(cliente => cliente.id !== id));
    // Também remove os pets do cliente
    setPets(prev => prev.filter(pet => pet.donoId !== id));
  };

  // Funções para gerenciar pets
  const addPet = (pet) => {
    const dono = clientes.find(c => c.id === pet.donoId);
    const newPet = { 
      ...pet, 
      id: Math.random().toString(36).substr(2, 9),
      dono: dono
    };
    setPets(prev => [newPet, ...prev]);
    return newPet;
  };

  const updatePet = (id, updates) => {
    setPets(prev => prev.map(pet => {
      if (pet.id === id) {
        const dono = updates.donoId ? clientes.find(c => c.id === updates.donoId) : pet.dono;
        return { ...pet, ...updates, dono };
      }
      return pet;
    }));
  };

  const deletePet = (id) => {
    setPets(prev => prev.filter(pet => pet.id !== id));
  };

  // Funções para navegação entre fichas
  const openClientFicha = (cliente) => {
    setSelectedClient(cliente);
    setSelectedPet(null);
  };

  const openPetFicha = (pet) => {
    setSelectedPet(pet);
    setSelectedClient(null);
  };

  const closeFichas = () => {
    setSelectedClient(null);
    setSelectedPet(null);
  };

  // Funções para buscar dados relacionados
  const getPetsByClient = (clientId) => {
    return pets.filter(pet => pet.donoId === clientId);
  };

  const getClientByPet = (petId) => {
    const pet = pets.find(p => p.id === petId);
    return pet ? clientes.find(c => c.id === pet.donoId) : null;
  };

  const value = {
    // Dados
    clientes,
    pets,
    selectedClient,
    selectedPet,
    
    // Funções de clientes
    addCliente,
    updateCliente,
    deleteCliente,
    
    // Funções de pets
    addPet,
    updatePet,
    deletePet,
    
    // Funções de navegação
    openClientFicha,
    openPetFicha,
    closeFichas,
    
    // Funções de busca
    getPetsByClient,
    getClientByPet
  };

  return (
    <PetShopContext.Provider value={value}>
      {children}
    </PetShopContext.Provider>
  );
} 