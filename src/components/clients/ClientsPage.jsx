import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ClientForm } from "./ClientForm";
import { ClientList } from "./ClientList";
import { Pagination } from "../ui/Pagination";
import { usePetShop } from "../../contexts/usePetShop";

function ConfirmModal({ open, onConfirm, onCancel, cliente }) {
  if (!open) return null;
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
      aria-describedby="confirm-delete-description"
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-xs text-center">
        <div id="confirm-delete-title" className="text-xl font-bold mb-2">Excluir cliente?</div>
        <div id="confirm-delete-description" className="text-gray-700 dark:text-gray-200 mb-4">Tem certeza que deseja excluir <b>{cliente?.nome}</b>?</div>
        <div className="flex gap-2 justify-center mt-4">
          <button 
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-bold" 
            onClick={onCancel}
            aria-label="Cancelar exclusão"
          >
            Cancelar
          </button>
          <button 
            className="px-4 py-2 rounded-lg bg-red-600 text-white font-bold" 
            onClick={onConfirm}
            aria-label="Confirmar exclusão do cliente"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

const CLIENTES_POR_PAGINA = 10;

export function ClientsPage() {
  const navigate = useNavigate();
  const { 
    clientes, 
    addCliente, 
    updateCliente, 
    deleteCliente, 
    selectedClient, 
    openClientFicha, 
    openPetFicha,
    closeFichas,
    getPetsByClient 
  } = usePetShop();
  
  const [editando, setEditando] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const [sucessoEdicao, setSucessoEdicao] = useState(false);
  const [confirmarExclusao, setConfirmarExclusao] = useState(null);
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [modalNovoCliente, setModalNovoCliente] = useState(false);
  const [modalNovoPet, setModalNovoPet] = useState(false);
  const [modalAgendamento, setModalAgendamento] = useState(false);
  const [modalDetalhesPet, setModalDetalhesPet] = useState(false);
  const [petSelecionado, setPetSelecionado] = useState(null);
  const formRef = useRef();

  function handleSave(cliente) {
    
    if (editando) {
      updateCliente(editando.id, cliente);
      setEditando(null);
      setSucessoEdicao(true);
      setTimeout(() => setSucessoEdicao(false), 2500);
    } else {
      addCliente(cliente);
      setSucesso(true);
      setTimeout(() => setSucesso(false), 2500);
    }
    setModalNovoCliente(false);
    setTimeout(() => {
      if (formRef.current) formRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function handleDelete(cliente) {
    setConfirmarExclusao(cliente);
  }

  function confirmDelete() {
    deleteCliente(confirmarExclusao.id);
    setConfirmarExclusao(null);
    setEditando(editando === confirmarExclusao ? null : editando);
    closeFichas();
  }

  function cancelDelete() {
    setConfirmarExclusao(null);
    setEditando(null);
  }



  function handleEdit(cliente) {
    setEditando(cliente);
    setModalNovoCliente(true);
  }

  // Funções para os botões da ficha
  function handleNovoPet() {
    setModalNovoPet(true);
  }

  function handleAgendar() {
    setModalAgendamento(true);
  }



  function handleAgendarPet(pet) {
    setPetSelecionado(pet);
    setModalAgendamento(true);
  }

  function handleConfirmarAgendamento(agendamento) {
    // Aqui você implementaria a lógica de confirmação
    console.log('Confirmando agendamento:', agendamento);
  }

  function handleCancelarAgendamento(agendamento) {
    // Aqui você implementaria a lógica de cancelamento
    console.log('Cancelando agendamento:', agendamento);
  }

  // Filtro de clientes pela busca
  const clientesFiltrados = clientes.filter(c => {
    const termo = busca.toLowerCase();
    return (
      c.nome?.toLowerCase().includes(termo) ||
      c.telefone?.toLowerCase().includes(termo) ||
      c.cpf?.toLowerCase().includes(termo) ||
      c.aniversario?.toLowerCase().includes(termo)
    );
  });
  
  // Paginação
  const totalPaginas = Math.max(1, Math.ceil(clientesFiltrados.length / CLIENTES_POR_PAGINA));
  const inicio = (pagina - 1) * CLIENTES_POR_PAGINA;
  const fim = inicio + CLIENTES_POR_PAGINA;
  const clientesPagina = clientesFiltrados.slice(inicio, fim);

  // Resetar para página 1 ao buscar ou alterar lista
  React.useEffect(() => {
    setPagina(1);
  }, [busca, clientes.length]);

  // Side panel/drawer para ficha do cliente
  const SidePanel = ({ open, onClose, cliente }) => {
    const [activeTab, setActiveTab] = useState('perfil');
    const [currentPageHistorico, setCurrentPageHistorico] = useState(1);
    const [currentPageAgendamentos, setCurrentPageAgendamentos] = useState(1);
    const [currentPageFinanceiro, setCurrentPageFinanceiro] = useState(1);
    const itemsPerPage = 5;
    
    // Buscar pets do cliente usando o contexto
    const petsDoCliente = cliente ? getPetsByClient(cliente.id) : [];
    
    const mockHistorico = [
      { data: "15/12/2024", servico: "Banho e Tosa", pet: "Rex", valor: "R$ 45,00", status: "Concluído" },
      { data: "10/12/2024", servico: "Banho e Tosa", pet: "Luna", valor: "R$ 40,00", status: "Concluído" },
      { data: "05/12/2024", servico: "Produtos", pet: "Rex", valor: "R$ 35,00", status: "Concluído" },
      { data: "01/12/2024", servico: "Banho e Tosa", pet: "Luna", valor: "R$ 40,00", status: "Concluído" }
    ];
    
    const mockAgendamentos = [
      { data: "15/01/2025", horario: "14:00", servico: "Banho e Tosa", pet: "Rex", status: "Confirmado" },
      { data: "10/01/2025", horario: "10:00", servico: "Banho e Tosa", pet: "Luna", status: "Pendente" }
    ];
    
    const mockFinanceiro = [
      { data: "15/12/2024", descricao: "Banho e Tosa - Rex", valor: "R$ 45,00", status: "Pago" },
      { data: "10/12/2024", descricao: "Banho e Tosa - Luna", valor: "R$ 40,00", status: "Pago" },
      { data: "05/12/2024", descricao: "Produtos - Rex", valor: "R$ 35,00", status: "Pago" },
      { data: "01/12/2024", descricao: "Banho e Tosa - Luna", valor: "R$ 40,00", status: "Pendente" }
    ];

    return (
      <div className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${open ? '' : 'pointer-events-none'}`}>
        <div
          className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={onClose}
          aria-label="Fechar ficha do cliente"
        />
        <aside
          className={`relative w-full max-w-lg bg-white dark:bg-gray-800 shadow-2xl h-full flex flex-col transition-transform duration-300 transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ borderTopLeftRadius: 24, borderBottomLeftRadius: 24 }}
          role="complementary"
          aria-label="Ficha detalhada do cliente"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <span className="material-icons text-blue-500 dark:text-blue-300 text-2xl" aria-hidden="true">person</span>
              <div>
                <h2 className="font-bold text-lg text-gray-900 dark:text-white" id="client-ficha-title">Ficha do Cliente</h2>
                {cliente && (
                  <div className="flex flex-col gap-1 mt-1">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Cliente desde 2022</p>
                    <div className="flex flex-wrap items-center gap-1">
                      {/* Etiqueta de Resumo */}
                      <div className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <span className="material-icons text-blue-600 dark:text-blue-400 text-xs">pets</span>
                        <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                          {petsDoCliente.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <span className="material-icons text-green-600 dark:text-green-400 text-xs">event</span>
                        <span className="text-xs font-semibold text-green-700 dark:text-green-300">
                          {mockAgendamentos.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                        <span className="material-icons text-purple-600 dark:text-purple-400 text-xs">account_balance_wallet</span>
                        <span className="text-xs font-semibold text-purple-700 dark:text-purple-300">
                          R$ {mockFinanceiro.reduce((sum, item) => sum + parseFloat(item.valor.replace('R$ ', '').replace(',', '.')), 0).toFixed(0)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 px-1.5 py-0.5 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                        <span className="material-icons text-orange-600 dark:text-orange-400 text-xs">schedule</span>
                        <span className="text-xs font-semibold text-orange-700 dark:text-orange-300">
                          {cliente.aniversario ? `${new Date().getFullYear() - new Date(cliente.aniversario).getFullYear()}` : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              {cliente && (
                <>
                  <button 
                    className="flex items-center gap-1 px-1.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition shadow-sm border border-blue-200 dark:border-blue-700"
                    onClick={() => { setEditando(cliente); onClose(); }}
                    aria-label="Editar cliente"
                  >
                    <span className="material-icons text-xs">edit</span>
                    Editar
                  </button>
                  <button 
                    className="flex items-center gap-1 px-1.5 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-medium rounded-md hover:bg-green-100 dark:hover:bg-green-900/50 transition shadow-sm border border-green-200 dark:border-green-700"
                    onClick={handleNovoPet}
                    aria-label="Adicionar novo pet"
                  >
                    <span className="material-icons text-xs">add</span>
                    Pet
                  </button>
                  <button 
                    className="flex items-center gap-1 px-1.5 py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-medium rounded-md hover:bg-orange-100 dark:hover:bg-orange-900/50 transition shadow-sm border border-orange-200 dark:border-orange-700"
                    onClick={handleAgendar}
                    aria-label="Agendar banho e tosa"
                  >
                    <span className="material-icons text-xs">event</span>
                    Agendar
                  </button>
                  <button 
                    className="flex items-center gap-1 px-1.5 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-md hover:bg-purple-100 dark:hover:bg-purple-900/50 transition shadow-sm border border-purple-200 dark:border-purple-700 whitespace-nowrap"
                    onClick={() => navigate('/pets')}
                    aria-label="Ver todos os pets"
                  >
                    <span className="material-icons text-xs">pets</span>
                    Pets
                  </button>
                  <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                </>
              )}
              <button 
                className="text-gray-400 hover:text-blue-600 text-xl p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition" 
                onClick={onClose} 
                aria-label="Fechar ficha do cliente"
              >
                <span className="material-icons" aria-hidden="true">close</span>
              </button>
            </div>
          </div>

          {cliente ? (
            <>
              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700" role="tablist" aria-labelledby="client-ficha-title">
                {[
                  { id: 'perfil', label: 'Perfil', icon: 'person' },
                  { id: 'pets', label: 'Pets', icon: 'pets' },
                  { id: 'historico', label: 'Histórico', icon: 'history' },
                  { id: 'agendamentos', label: 'Agendamentos', icon: 'event' },
                  { id: 'financeiro', label: 'Financeiro', icon: 'account_balance_wallet' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1 px-3 py-2 text-xs font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`tabpanel-${tab.id}`}
                  >
                    <span className="material-icons text-sm" aria-hidden="true">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'perfil' && (
                  <div className="space-y-4">
                    {/* Informações Pessoais */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <h3 className="font-bold text-base text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
                        <span className="material-icons text-sm">person</span>
                        Informações Pessoais
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
                            <p className="text-sm text-gray-900 dark:text-white font-semibold">{cliente.nome}</p>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">CPF</label>
                            <p className="text-sm text-gray-900 dark:text-white">{cliente.cpf || 'Não informado'}</p>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Telefone</label>
                            <p className="text-sm text-gray-900 dark:text-white">{cliente.telefone || 'Não informado'}</p>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">E-mail</label>
                            <p className="text-sm text-gray-900 dark:text-white">{cliente.email || 'Não informado'}</p>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Aniversário</label>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {cliente.aniversario ? new Date(cliente.aniversario).toLocaleDateString('pt-BR') : 'Não informado'}
                            </p>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Idade</label>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {cliente.aniversario ? `${new Date().getFullYear() - new Date(cliente.aniversario).getFullYear()} anos` : 'Não informado'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Endereço */}
                    {(cliente.cep || cliente.logradouro || cliente.bairro || cliente.cidade || cliente.uf) && (
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                        <h3 className="font-bold text-base text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
                          <span className="material-icons text-sm">location_on</span>
                          Endereço
                        </h3>
                        <div className="space-y-1 text-sm">
                          {cliente.cep && <p className="text-gray-900 dark:text-white"><span className="font-medium">CEP:</span> {cliente.cep}</p>}
                          {cliente.logradouro && (
                            <p className="text-gray-900 dark:text-white">
                              <span className="font-medium">Endereço:</span> {cliente.logradouro}
                              {cliente.numero && `, ${cliente.numero}`}
                              {cliente.complemento && ` - ${cliente.complemento}`}
                            </p>
                          )}
                          {cliente.bairro && <p className="text-gray-900 dark:text-white"><span className="font-medium">Bairro:</span> {cliente.bairro}</p>}
                          {(cliente.cidade || cliente.uf) && (
                            <p className="text-gray-900 dark:text-white">
                              <span className="font-medium">Cidade/UF:</span> {cliente.cidade}{cliente.uf && ` - ${cliente.uf}`}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Estatísticas */}
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                      <h3 className="font-bold text-base text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
                        <span className="material-icons text-sm">analytics</span>
                        Estatísticas
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            {petsDoCliente.length}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Pets</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            {mockHistorico.length}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Visitas</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            R$ {mockFinanceiro.reduce((sum, item) => sum + parseFloat(item.valor.replace('R$ ', '').replace(',', '.')), 0).toFixed(0)}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Total Gasto</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            {mockAgendamentos.length}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Agendamentos</div>
                        </div>
                      </div>
                    </div>

                                         {/* Informações Adicionais */}
                     <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                       <h3 className="font-bold text-base text-yellow-700 dark:text-yellow-300 mb-3 flex items-center gap-2">
                         <span className="material-icons text-sm">info</span>
                         Informações Importantes
                       </h3>
                       <div className="space-y-1 text-xs">
                         <p className="text-gray-700 dark:text-gray-300">
                           <span className="font-medium">Última atualização:</span> {new Date().toLocaleDateString('pt-BR')}
                         </p>
                         <p className="text-gray-700 dark:text-gray-300">
                           <span className="font-medium">Status do cliente:</span> 
                           <span className="ml-2 px-1.5 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-semibold rounded-full">
                             Ativo
                           </span>
                         </p>
                         <p className="text-gray-700 dark:text-gray-300">
                           <span className="font-medium">Preferências:</span> Banho a cada 15 dias
                         </p>
                       </div>
                     </div>
                  </div>
                )}

                                {activeTab === 'pets' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-gray-900 dark:text-white">Pets do Cliente</h3>
                      <button 
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 transition shadow-sm"
                        onClick={handleNovoPet}
                        aria-label="Adicionar novo pet ao cliente"
                      >
                        <span className="material-icons text-sm">add</span>
                        Adicionar Pet
                      </button>
                    </div>
                                        {petsDoCliente.map((pet, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                              <span className="material-icons text-blue-600 dark:text-blue-400 text-sm">
                                {pet.especie === 'Cão' ? 'pets' : 'pets'}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate">{pet.nome}</h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400">{pet.raca} • {pet.especie}</p>
                            </div>
                          </div>
                          <span className={`px-1.5 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0 ml-2 ${
                            pet.nascimento ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                          }`}>
                            {pet.nascimento ? 'Ativo' : 'Sem dados'}
                          </span>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Nascimento:</span>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {pet.nascimento ? new Date(pet.nascimento).toLocaleDateString('pt-BR') : 'Não informado'}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Cor:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{pet.cor || 'Não informado'}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <button 
                            className="flex-1 px-2 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition shadow-sm"
                            onClick={() => {
                              openPetFicha(pet);
                              onClose(); // Fecha a ficha do cliente primeiro
                              navigate('/pets');
                            }}
                            aria-label={`Ver detalhes do pet ${pet.nome}`}
                          >
                            <span className="material-icons text-xs mr-1">visibility</span>
                            Ver Detalhes
                          </button>
                          <button 
                            className="flex-1 px-2 py-1.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium rounded-md hover:bg-green-200 dark:hover:bg-green-800 transition shadow-sm"
                            onClick={() => handleAgendarPet(pet)}
                            aria-label={`Agendar banho para ${pet.nome}`}
                          >
                            <span className="material-icons text-xs mr-1">event</span>
                            Agendar Banho
                          </button>
                                                 </div>
                       </div>
                     ))}
                     
                     {/* Paginação Agendamentos */}
                     {mockAgendamentos.length > itemsPerPage && (
                       <div className="flex items-center justify-center gap-2 pt-3">
                         <button
                           onClick={() => setCurrentPageAgendamentos(prev => Math.max(1, prev - 1))}
                           disabled={currentPageAgendamentos === 1}
                           className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                         >
                           <span className="material-icons text-sm">chevron_left</span>
                         </button>
                         <span className="text-xs text-gray-600 dark:text-gray-400">
                           Página {currentPageAgendamentos} de {Math.ceil(mockAgendamentos.length / itemsPerPage)}
                         </span>
                         <button
                           onClick={() => setCurrentPageAgendamentos(prev => Math.min(Math.ceil(mockAgendamentos.length / itemsPerPage), prev + 1))}
                           disabled={currentPageAgendamentos === Math.ceil(mockAgendamentos.length / itemsPerPage)}
                           className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                         >
                           <span className="material-icons text-sm">chevron_right</span>
                         </button>
                       </div>
                     )}
                   </div>
                 )}

                                 {activeTab === 'historico' && (
                   <div className="space-y-4">
                     <h3 className="font-bold text-lg text-gray-900 dark:text-white">Histórico de Serviços</h3>
                    {mockHistorico
                      .slice((currentPageHistorico - 1) * itemsPerPage, currentPageHistorico * itemsPerPage)
                      .map((item, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-between">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-gray-900 dark:text-white truncate">{item.servico}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Pet: {item.pet} • {item.data}</p>
                          </div>
                          <div className="text-right flex-shrink-0 ml-2">
                            <p className="font-bold text-gray-900 dark:text-white whitespace-nowrap">{item.valor}</p>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                              item.status === 'Concluído' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Paginação Histórico */}
                    {mockHistorico.length > itemsPerPage && (
                      <div className="flex items-center justify-center gap-2 pt-3">
                        <button
                          onClick={() => setCurrentPageHistorico(prev => Math.max(1, prev - 1))}
                          disabled={currentPageHistorico === 1}
                          className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                          <span className="material-icons text-sm">chevron_left</span>
                        </button>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          Página {currentPageHistorico} de {Math.ceil(mockHistorico.length / itemsPerPage)}
                        </span>
                        <button
                          onClick={() => setCurrentPageHistorico(prev => Math.min(Math.ceil(mockHistorico.length / itemsPerPage), prev + 1))}
                          disabled={currentPageHistorico === Math.ceil(mockHistorico.length / itemsPerPage)}
                          className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                          <span className="material-icons text-sm">chevron_right</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'agendamentos' && (
                  <div className="space-y-4">
                                         <div className="flex items-center justify-between">
                       <h3 className="font-bold text-lg text-gray-900 dark:text-white">Agendamentos</h3>
                       <button 
                         className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm"
                         onClick={handleAgendar}
                         aria-label="Criar novo agendamento de banho e tosa"
                       >
                         <span className="material-icons text-base">add</span>
                         Agendar Banho
                       </button>
                     </div>
                    {mockAgendamentos
                      .slice((currentPageAgendamentos - 1) * itemsPerPage, currentPageAgendamentos * itemsPerPage)
                      .map((item, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-between">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-gray-900 dark:text-white truncate">{item.servico}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Pet: {item.pet} • {item.data} às {item.horario}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0 ml-2 ${
                            item.status === 'Confirmado' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                                                 <div className="mt-3 flex gap-2">
                           <button 
                             className="flex-1 px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition shadow-sm"
                             onClick={() => handleConfirmarAgendamento(item)}
                             aria-label={`Confirmar agendamento de ${item.servico} para ${item.pet}`}
                           >
                             <span className="material-icons text-sm mr-1">check</span>
                             Confirmar
                           </button>
                           <button 
                             className="flex-1 px-3 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-sm font-medium rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition shadow-sm"
                             onClick={() => handleCancelarAgendamento(item)}
                             aria-label={`Cancelar agendamento de ${item.servico} para ${item.pet}`}
                           >
                             <span className="material-icons text-sm mr-1">close</span>
                             Cancelar
                           </button>
                         </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'financeiro' && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                      <h3 className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-4">Resumo Financeiro</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total Gasto</p>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            R$ {mockFinanceiro.reduce((sum, item) => sum + parseFloat(item.valor.replace('R$ ', '').replace(',', '.')), 0).toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Pendente</p>
                          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            R$ {mockFinanceiro.filter(item => item.status === 'Pendente').reduce((sum, item) => sum + parseFloat(item.valor.replace('R$ ', '').replace(',', '.')), 0).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Histórico de Pagamentos</h3>
                    {mockFinanceiro
                      .slice((currentPageFinanceiro - 1) * itemsPerPage, currentPageFinanceiro * itemsPerPage)
                      .map((item, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-between">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-gray-900 dark:text-white truncate">{item.descricao}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.data}</p>
                          </div>
                          <div className="text-right flex-shrink-0 ml-2">
                            <p className="font-bold text-gray-900 dark:text-white whitespace-nowrap">{item.valor}</p>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                              item.status === 'Pago' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Paginação Financeiro */}
                    {mockFinanceiro.length > itemsPerPage && (
                      <div className="flex items-center justify-center gap-2 pt-3">
                        <button
                          onClick={() => setCurrentPageFinanceiro(prev => Math.max(1, prev - 1))}
                          disabled={currentPageFinanceiro === 1}
                          className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                          <span className="material-icons text-sm">chevron_left</span>
                        </button>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          Página {currentPageFinanceiro} de {Math.ceil(mockFinanceiro.length / itemsPerPage)}
                        </span>
                        <button
                          onClick={() => setCurrentPageFinanceiro(prev => Math.min(Math.ceil(mockFinanceiro.length / itemsPerPage), prev + 1))}
                          disabled={currentPageFinanceiro === Math.ceil(mockFinanceiro.length / itemsPerPage)}
                          className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                          <span className="material-icons text-sm">chevron_right</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <span className="material-icons text-6xl mb-4">person_outline</span>
                <h2 className="font-bold text-2xl mb-2">Ficha do Cliente</h2>
                <p>Nenhum cliente selecionado</p>
              </div>
            </div>
          )}
        </aside>
      </div>
    );
  };

  // Modal para novo cliente (ou edição)
  const ModalNovoCliente = ({ open, onClose, editando }) => (
    !open ? null : (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <span className="material-icons">person_add</span> {editando ? 'Editar Cliente' : 'Novo Cliente'}
            </h2>
            <button className="text-gray-400 hover:text-blue-600 text-2xl" onClick={onClose} aria-label="Fechar">
              <span className="material-icons">close</span>
            </button>
          </div>
          <ClientForm onSave={handleSave} clientes={clientes} editando={editando} onCancel={onClose} />
        </div>
      </div>
    )
  );

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-950 flex flex-col" role="main" aria-label="Gerenciamento de clientes">
      {/* Barra de busca + ação */}
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-md md:max-w-4xl mx-auto flex flex-col md:flex-row md:items-center gap-2 p-2 flex-shrink-0">
          <div className="flex-1">
            <input
              type="text"
              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Buscar cliente por nome, telefone, CPF ou aniversário..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
              aria-label="Buscar cliente por nome, telefone, CPF ou aniversário"
            />
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition text-sm"
            onClick={() => setModalNovoCliente(true)}
            aria-label="Criar novo cliente"
          >
            <span className="material-icons text-base" aria-hidden="true">person_add</span>
            Novo Cliente
          </button>
        </div>
      </div>
      {/* Tabela de clientes */}
      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col px-2 pb-2">
        <div className="w-full flex-1">
          <ClientList 
            clients={clientesPagina} 
            onEdit={openClientFicha} 
            onDelete={handleDelete} 
            onEditClick={handleEdit}
            currentPage={pagina}
            totalPages={totalPaginas}
            totalItems={clientesFiltrados.length}
          />
        </div>
        {clientesFiltrados.length > 0 && (
          <div className="flex justify-center mt-2 flex-shrink-0">
            <Pagination page={pagina} totalPages={totalPaginas} onPageChange={setPagina} />
          </div>
        )}
      </div>
      {/* Side panel/drawer para ficha do cliente */}
      <SidePanel open={!!selectedClient} onClose={closeFichas} cliente={selectedClient} />
      {/* Modal para novo cliente */}
      <ModalNovoCliente open={modalNovoCliente} onClose={() => { setModalNovoCliente(false); setEditando(null); }} editando={editando} />
      
      {/* Modal para novo pet */}
      {modalNovoPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg text-blue-700 dark:text-blue-300 flex items-center gap-2">
                <span className="material-icons">pets</span>
                Novo Pet
              </h2>
              <button className="text-gray-400 hover:text-blue-600 text-xl" onClick={() => setModalNovoPet(false)} aria-label="Fechar">
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              <span className="material-icons text-4xl mb-2">pets</span>
              <p>Funcionalidade de cadastro de pet será implementada aqui</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal para agendamento */}
      {modalAgendamento && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg text-orange-700 dark:text-orange-300 flex items-center gap-2">
                <span className="material-icons">event</span>
                Agendar Banho
              </h2>
              <button className="text-gray-400 hover:text-blue-600 text-xl" onClick={() => setModalAgendamento(false)} aria-label="Fechar">
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              <span className="material-icons text-4xl mb-2">event</span>
              <p>Funcionalidade de agendamento será implementada aqui</p>
              {petSelecionado && <p className="text-sm mt-2">Pet selecionado: {petSelecionado.nome}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Modal para detalhes do pet */}
      {modalDetalhesPet && petSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg text-blue-700 dark:text-blue-300 flex items-center gap-2">
                <span className="material-icons">pets</span>
                Detalhes do Pet
              </h2>
              <button className="text-gray-400 hover:text-blue-600 text-xl" onClick={() => { setModalDetalhesPet(false); setPetSelecionado(null); }} aria-label="Fechar">
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label>
                <p className="text-gray-900 dark:text-white font-semibold">{petSelecionado.nome}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Espécie</label>
                <p className="text-gray-900 dark:text-white">{petSelecionado.especie}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Raça</label>
                <p className="text-gray-900 dark:text-white">{petSelecionado.raca}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Idade</label>
                <p className="text-gray-900 dark:text-white">{petSelecionado.idade}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Última Visita</label>
                <p className="text-gray-900 dark:text-white">{petSelecionado.ultimaVisita}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Próxima Visita</label>
                <p className="text-gray-900 dark:text-white">{petSelecionado.proximaVisita}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedbacks e modal de confirmação */}
      {sucesso && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg font-semibold text-sm animate-fade-in-out">
          Cliente salvo com sucesso!
        </div>
      )}
      {sucessoEdicao && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg font-semibold text-sm animate-fade-in-out">
          Cliente atualizado com sucesso!
        </div>
      )}
      <ConfirmModal open={!!confirmarExclusao} onConfirm={confirmDelete} onCancel={cancelDelete} cliente={confirmarExclusao} />
    </div>
  );
}

export default ClientsPage; 