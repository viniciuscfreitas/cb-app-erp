import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PetList from "./PetList";
import PetForm from "./PetForm";
import { Pagination } from "../ui/Pagination";
import { usePetShop } from "../../contexts/usePetShop";

// Mock de clientes para select de tutor
const mockClientes = [
  { id: "1", nome: "Vinícius do Carmo", email: "vinicius@email.com", telefone: "(11) 99999-9999" },
  { id: "2", nome: "Ana Paula", email: "ana@email.com", telefone: "(11) 88888-8888" },
  { id: "3", nome: "Carlos Silva", email: "carlos@email.com", telefone: "(11) 77777-7777" },
];



// Modal de confirmação de exclusão
function ConfirmModal({ open, onConfirm, onCancel, pet }) {
  if (!open) return null;
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
      aria-describedby="confirm-delete-description"
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-xs text-center border border-gray-200 dark:border-gray-700">
        <div id="confirm-delete-title" className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Excluir pet?</div>
        <div id="confirm-delete-description" className="text-gray-700 dark:text-gray-300 mb-4">Tem certeza que deseja excluir <b>{pet?.nome}</b>?</div>
        <div className="flex gap-2 justify-center mt-4">
          <button 
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-bold" 
            onClick={onCancel}
            aria-label="Cancelar exclusão"
          >
            Cancelar
          </button>
          <button 
            className="px-4 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition" 
            onClick={onConfirm}
            aria-label="Confirmar exclusão do pet"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export function PetsPage() {
  const navigate = useNavigate();
  const { 
    pets, 
    addPet, 
    updatePet, 
    deletePet, 
    selectedPet, 
    openPetFicha, 
    openClientFicha,
    closeFichas,
    getClientByPet 
  } = usePetShop();
  
  const [busca, setBusca] = useState("");
  const [modalNovoPet, setModalNovoPet] = useState(false);
  const [editando, setEditando] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const [sucessoEdicao, setSucessoEdicao] = useState(false);
  const [confirmarExclusao, setConfirmarExclusao] = useState(null);
  const [pagina, setPagina] = useState(1);
  const formRef = useRef();

  const PETS_POR_PAGINA = 10;

  function handleSave(pet) {
    if (editando) {
      updatePet(editando.id, pet);
      setEditando(null);
      setSucessoEdicao(true);
      setTimeout(() => setSucessoEdicao(false), 2500);
    } else {
      addPet(pet);
      setSucesso(true);
      setTimeout(() => setSucesso(false), 2500);
    }
    setModalNovoPet(false);
    setTimeout(() => {
      if (formRef.current) formRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function handleDelete(pet) {
    setConfirmarExclusao(pet);
  }

  function confirmDelete() {
    deletePet(confirmarExclusao.id);
    setConfirmarExclusao(null);
    setEditando(editando === confirmarExclusao ? null : editando);
    closeFichas();
  }

  function cancelDelete() {
    setConfirmarExclusao(null);
    setEditando(null);
  }



  function handleEdit(pet) {
    setEditando(pet);
    setModalNovoPet(true);
  }

  // Filtro de pets pela busca
  const petsFiltrados = pets.filter(p => {
    const termo = busca.toLowerCase();
    return (
      p.nome?.toLowerCase().includes(termo) ||
      p.especie?.toLowerCase().includes(termo) ||
      p.raca?.toLowerCase().includes(termo) ||
      p.dono?.nome?.toLowerCase().includes(termo) ||
      p.cor?.toLowerCase().includes(termo)
    );
  });

  // Paginação
  const totalPaginas = Math.max(1, Math.ceil(petsFiltrados.length / PETS_POR_PAGINA));
  const inicio = (pagina - 1) * PETS_POR_PAGINA;
  const fim = inicio + PETS_POR_PAGINA;
  const petsPagina = petsFiltrados.slice(inicio, fim);

  // Resetar para página 1 ao buscar ou alterar lista
  React.useEffect(() => {
    setPagina(1);
  }, [busca, pets.length]);

  // Side panel/drawer para ficha do pet
  const SidePanel = ({ open, onClose, pet }) => {
    const [activeTab, setActiveTab] = useState('perfil');
    const [expandedVistorias, setExpandedVistorias] = useState([]);
    const [currentPageVistorias, setCurrentPageVistorias] = useState(1);
    const [currentPageHistorico, setCurrentPageHistorico] = useState(1);
    const [currentPageAgendamentos, setCurrentPageAgendamentos] = useState(1);
    const itemsPerPage = 5;
    
    // Buscar cliente do pet usando o contexto
    const clienteDoPet = pet ? getClientByPet(pet.id) : null;
    
    // Mock data para demonstração
    const mockHistorico = [
      { data: "15/12/2024", servico: "Banho e Tosa", valor: "R$ 45,00", status: "Concluído" },
      { data: "10/12/2024", servico: "Banho e Tosa", valor: "R$ 40,00", status: "Concluído" },
      { data: "05/12/2024", servico: "Produtos", valor: "R$ 35,00", status: "Concluído" },
      { data: "01/12/2024", servico: "Banho e Tosa", valor: "R$ 40,00", status: "Concluído" }
    ];
    
    const mockAgendamentos = [
      { data: "15/01/2025", horario: "14:00", servico: "Banho e Tosa", status: "Confirmado" },
      { data: "10/01/2025", horario: "10:00", servico: "Banho e Tosa", status: "Pendente" }
    ];
    
    const mockFinanceiro = [
      { data: "15/12/2024", descricao: "Banho e Tosa", valor: "R$ 45,00", status: "Pago" },
      { data: "10/12/2024", descricao: "Banho e Tosa", valor: "R$ 40,00", status: "Pago" },
      { data: "05/12/2024", descricao: "Produtos", valor: "R$ 35,00", status: "Pago" },
      { data: "01/12/2024", descricao: "Banho e Tosa", valor: "R$ 40,00", status: "Pendente" }
    ];

    const mockVistorias = [
      {
        tipo: "Entrada",
        data: "15/12/2024 09:30",
        status: "Aprovado",
        responsavel: "Maria Silva",
        servico: "Banho e Tosa",
        observacoes: "Pet em bom estado geral, sem feridas visíveis",
        anomalias: []
      },
      {
        tipo: "Saída",
        data: "15/12/2024 11:45",
        status: "Aprovado",
        responsavel: "João Santos",
        servico: "Banho e Tosa",
        observacoes: "Serviço concluído com sucesso, pet entregue ao tutor",
        anomalias: []
      },
      {
        tipo: "Entrada",
        data: "10/12/2024 14:15",
        status: "Atenção",
        responsavel: "Ana Costa",
        servico: "Banho e Tosa",
        observacoes: "Pet apresentou pequeno machucado na pata traseira",
        anomalias: ["Pequeno machucado na pata traseira direita", "Pelagem com nós"]
      },
      {
        tipo: "Saída",
        data: "10/12/2024 16:30",
        status: "Aprovado",
        responsavel: "Carlos Lima",
        servico: "Banho e Tosa",
        observacoes: "Machucado documentado na entrada, serviço realizado com cuidado",
        anomalias: []
      },
      {
        tipo: "Entrada",
        data: "05/12/2024 10:00",
        status: "Aprovado",
        responsavel: "Fernanda Oliveira",
        servico: "Produtos",
        observacoes: "Pet em excelente estado, sem problemas detectados",
        anomalias: []
      }
    ];

    return (
      <div className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${open ? '' : 'pointer-events-none'}`}>
        <div
          className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={onClose}
          aria-label="Fechar ficha do pet"
        />
        <aside
          className={`relative w-full max-w-lg bg-white dark:bg-gray-800 shadow-2xl h-full flex flex-col transition-transform duration-300 transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ borderTopLeftRadius: 24, borderBottomLeftRadius: 24 }}
          role="complementary"
          aria-label="Ficha detalhada do pet"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <span className="material-icons text-blue-500 dark:text-blue-300 text-2xl" aria-hidden="true">pets</span>
              <div>
                <h2 className="font-bold text-lg text-gray-900 dark:text-white" id="pet-ficha-title">Ficha do Pet</h2>
                {pet && <p className="text-xs text-gray-600 dark:text-gray-400" aria-describedby="pet-ficha-title">Pet desde 2022</p>}
              </div>
            </div>
            <div className="flex items-center gap-1">
              {pet && (
                <>
                  <button 
                    className="flex items-center gap-1 px-2 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 transition shadow-sm"
                    onClick={() => { setEditando(pet); onClose(); }}
                    aria-label="Editar pet"
                  >
                    <span className="material-icons text-sm">edit</span>
                    Editar
                  </button>
                  <button 
                    className="flex items-center gap-1 px-2 py-1.5 bg-orange-600 text-white text-xs font-semibold rounded-md hover:bg-orange-700 transition shadow-sm"
                    onClick={() => { /* Abrir modal de agendamento */ }}
                    aria-label="Agendar banho e tosa"
                  >
                    <span className="material-icons text-sm">event</span>
                    Agendar
                  </button>
                  <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                </>
              )}
              <button 
                className="text-gray-400 hover:text-blue-600 text-xl p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition" 
                onClick={onClose} 
                aria-label="Fechar ficha do pet"
              >
                <span className="material-icons" aria-hidden="true">close</span>
              </button>
            </div>
          </div>

          {pet ? (
            <>
              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700" role="tablist" aria-labelledby="pet-ficha-title">
                {[
                  { id: 'perfil', label: 'Perfil', icon: 'pets' },
                  { id: 'atividades', label: 'Atividades', icon: 'history' },
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
                    {/* Informações do Pet */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <h3 className="font-bold text-base text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
                        <span className="material-icons text-sm">pets</span>
                        Informações do Pet
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Nome</label>
                          <p className="text-sm text-gray-900 dark:text-white font-semibold">{pet.nome}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Espécie</label>
                          <p className="text-sm text-gray-900 dark:text-white">{pet.especie}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Raça</label>
                          <p className="text-sm text-gray-900 dark:text-white">{pet.raca}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Sexo</label>
                          <p className="text-sm text-gray-900 dark:text-white">{pet.sexo === 'M' ? 'Macho' : 'Fêmea'}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Cor</label>
                          <p className="text-sm text-gray-900 dark:text-white">{pet.cor}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Nascimento</label>
                          <p className="text-sm text-gray-900 dark:text-white">
                            {pet.nascimento ? new Date(pet.nascimento).toLocaleDateString('pt-BR') : 'Não informado'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Informações do Tutor */}
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <h3 className="font-bold text-base text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
                        <span className="material-icons text-sm">person</span>
                        Informações do Tutor
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-900 dark:text-white">
                          <span className="font-medium">Nome:</span> {clienteDoPet?.nome || pet.dono?.nome}
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          <span className="font-medium">Telefone:</span> {clienteDoPet?.telefone || pet.dono?.telefone || 'Não informado'}
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          <span className="font-medium">E-mail:</span> {clienteDoPet?.email || pet.dono?.email || 'Não informado'}
                        </p>
                      </div>
                      <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-700">
                        <button 
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-md hover:bg-green-700 transition shadow-sm"
                          onClick={() => {
                            if (clienteDoPet) {
                              openClientFicha(clienteDoPet);
                              onClose(); // Fecha a ficha do pet primeiro
                              navigate('/clientes');
                            }
                          }}
                          aria-label="Ver ficha do tutor"
                        >
                          <span className="material-icons text-sm">visibility</span>
                          Ver Ficha do Tutor
                        </button>
                      </div>
                    </div>

                    {/* Estatísticas */}
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                      <h3 className="font-bold text-base text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
                        <span className="material-icons text-sm">analytics</span>
                        Estatísticas
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
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
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            {pet.nascimento ? Math.floor((new Date() - new Date(pet.nascimento)) / (1000 * 60 * 60 * 24 * 365)) : 'N/A'}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Anos</div>
                        </div>
                      </div>
                    </div>

                    {/* Observações */}
                    {pet.observacoes && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                        <h3 className="font-bold text-base text-yellow-700 dark:text-yellow-300 mb-3 flex items-center gap-2">
                          <span className="material-icons text-sm">info</span>
                          Observações
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{pet.observacoes}</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'atividades' && (
                  <div className="space-y-6">
                    {/* Seção Check-in/out */}
                    <div className="space-y-4">
                                          <div>
                      <h3 className="font-bold text-base text-gray-900 dark:text-white">Check-in e Check-out</h3>
                    </div>

                      {/* Check-ins/outs Recentes */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Check-ins e Check-outs Recentes</h4>
                        {mockVistorias
                          .slice((currentPageVistorias - 1) * itemsPerPage, currentPageVistorias * itemsPerPage)
                          .map((vistoria, index) => (
                          <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                            {/* Resumo - Sempre Visível */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                                  vistoria.tipo === 'Entrada' 
                                    ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' 
                                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                }`}>
                                  {vistoria.tipo}
                                </span>
                                <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                  {vistoria.data} • {vistoria.responsavel} • {vistoria.servico}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                                  vistoria.status === 'Aprovado' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : vistoria.status === 'Atenção' 
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                }`}>
                                  {vistoria.status}
                                </span>
                                <button 
                                  onClick={() => {
                                    const newExpanded = [...(expandedVistorias || [])];
                                    newExpanded[index] = !newExpanded[index];
                                    setExpandedVistorias(newExpanded);
                                  }}
                                  className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition flex-shrink-0"
                                  aria-label={expandedVistorias?.[index] ? "Recolher detalhes" : "Expandir detalhes"}
                                >
                                  <span className="material-icons text-sm transition-transform duration-200">
                                    {expandedVistorias?.[index] ? 'expand_less' : 'expand_more'}
                                  </span>
                                </button>
                              </div>
                            </div>

                            {/* Detalhes Expandidos */}
                            {expandedVistorias?.[index] && (
                              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600 space-y-3">
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                  <div>
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Responsável:</span>
                                    <p className="text-gray-900 dark:text-white">{vistoria.responsavel}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Serviço:</span>
                                    <p className="text-gray-900 dark:text-white">{vistoria.servico}</p>
                                  </div>
                                </div>

                                {vistoria.observacoes && (
                                  <div>
                                    <span className="font-medium text-xs text-gray-700 dark:text-gray-300">Observações:</span>
                                    <p className="text-xs text-gray-900 dark:text-white mt-1">{vistoria.observacoes}</p>
                                  </div>
                                )}

                                {vistoria.anomalias && vistoria.anomalias.length > 0 && (
                                  <div>
                                    <span className="font-medium text-xs text-red-600 dark:text-red-400">Anomalias Detectadas:</span>
                                    <ul className="mt-1 space-y-1">
                                      {vistoria.anomalias.map((anomalia, idx) => (
                                        <li key={idx} className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                                          <span className="material-icons text-xs">warning</span>
                                          {anomalia}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* Botões de Ação */}
                                <div className="flex gap-2 pt-2">
                                  <button 
                                    className="flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition border border-blue-200 dark:border-blue-700"
                                    onClick={() => {/* Editar vistoria */}}
                                    aria-label="Editar vistoria"
                                  >
                                    <span className="material-icons text-xs">edit</span>
                                    Editar
                                  </button>
                                  <button 
                                    className="flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-medium rounded-md hover:bg-green-100 dark:hover:bg-green-900/50 transition border border-green-200 dark:border-green-700"
                                    onClick={() => {/* Imprimir relatório */}}
                                    aria-label="Imprimir relatório"
                                  >
                                    <span className="material-icons text-xs">print</span>
                                    Imprimir
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {/* Paginação Check-ins/outs */}
                        {mockVistorias.length > itemsPerPage && (
                          <div className="flex items-center justify-center gap-2 pt-3">
                            <button
                              onClick={() => setCurrentPageVistorias(prev => Math.max(1, prev - 1))}
                              disabled={currentPageVistorias === 1}
                              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                              <span className="material-icons text-sm">chevron_left</span>
                            </button>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Página {currentPageVistorias} de {Math.ceil(mockVistorias.length / itemsPerPage)}
                            </span>
                            <button
                              onClick={() => setCurrentPageVistorias(prev => Math.min(Math.ceil(mockVistorias.length / itemsPerPage), prev + 1))}
                              disabled={currentPageVistorias === Math.ceil(mockVistorias.length / itemsPerPage)}
                              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                              <span className="material-icons text-sm">chevron_right</span>
                            </button>
                          </div>
                        )}
                      </div>


                    </div>

                    {/* Seção Histórico */}
                    <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <h3 className="font-bold text-base text-gray-900 dark:text-white">Histórico de Serviços</h3>
                      {mockHistorico
                        .slice((currentPageHistorico - 1) * itemsPerPage, currentPageHistorico * itemsPerPage)
                        .map((item, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                          <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate">{item.servico}</h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400">{item.data}</p>
                            </div>
                            <div className="text-right flex-shrink-0 ml-2">
                              <p className="font-bold text-sm text-gray-900 dark:text-white whitespace-nowrap">{item.valor}</p>
                              <span className={`px-1.5 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap ${
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
                  </div>
                )}

                {activeTab === 'agendamentos' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-gray-900 dark:text-white">Agendamentos</h3>
                      <button 
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 transition shadow-sm"
                        onClick={() => { /* Abrir modal de agendamento */ }}
                        aria-label="Criar novo agendamento de banho e tosa"
                      >
                        <span className="material-icons text-sm">add</span>
                        Agendar Banho
                      </button>
                    </div>
                    {mockAgendamentos
                      .slice((currentPageAgendamentos - 1) * itemsPerPage, currentPageAgendamentos * itemsPerPage)
                      .map((item, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-between">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate">{item.servico}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{item.data} às {item.horario}</p>
                          </div>
                          <span className={`px-1.5 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0 ml-2 ${
                            item.status === 'Confirmado' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <button 
                            className="flex-1 px-2 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition shadow-sm"
                            onClick={() => { /* Confirmar agendamento */ }}
                            aria-label={`Confirmar agendamento de ${item.servico}`}
                          >
                            <span className="material-icons text-xs mr-1">check</span>
                            Confirmar
                          </button>
                          <button 
                            className="flex-1 px-2 py-1.5 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-xs font-medium rounded-md hover:bg-red-200 dark:hover:bg-red-800 transition shadow-sm"
                            onClick={() => { /* Cancelar agendamento */ }}
                            aria-label={`Cancelar agendamento de ${item.servico}`}
                          >
                            <span className="material-icons text-xs mr-1">close</span>
                            Cancelar
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

                {activeTab === 'financeiro' && (
                  <div className="space-y-3">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <h3 className="font-bold text-base text-blue-700 dark:text-blue-300 mb-3">Resumo Financeiro</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Total Gasto</p>
                          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            R$ {mockFinanceiro.reduce((sum, item) => sum + parseFloat(item.valor.replace('R$ ', '').replace(',', '.')), 0).toFixed(0)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Pendente</p>
                          <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                            R$ {mockFinanceiro.filter(item => item.status === 'Pendente').reduce((sum, item) => sum + parseFloat(item.valor.replace('R$ ', '').replace(',', '.')), 0).toFixed(0)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-base text-gray-900 dark:text-white">Histórico de Pagamentos</h3>
                    {mockFinanceiro.map((item, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-sm text-gray-900 dark:text-white">{item.descricao}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{item.data}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-sm text-gray-900 dark:text-white">{item.valor}</p>
                            <span className={`px-1.5 py-0.5 text-xs font-semibold rounded-full ${
                              item.status === 'Pago' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <span className="material-icons text-6xl mb-4">pets</span>
                <h2 className="font-bold text-2xl mb-2">Ficha do Pet</h2>
                <p>Nenhum pet selecionado</p>
              </div>
            </div>
          )}
        </aside>


      </div>
    );
  };

  // Modal para novo pet (ou edição)
  const ModalNovoPet = ({ open, onClose, editando }) => (
    !open ? null : (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <span className="material-icons">pets</span> {editando ? 'Editar Pet' : 'Novo Pet'}
            </h2>
            <button className="text-gray-400 hover:text-blue-600 text-2xl" onClick={onClose} aria-label="Fechar">
              <span className="material-icons">close</span>
            </button>
          </div>
          <PetForm onSave={handleSave} clientes={mockClientes} editando={editando} onCancel={onClose} />
        </div>
      </div>
    )
  );

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-950 flex flex-col" role="main" aria-label="Gerenciamento de pets">
      {/* Barra de busca + ação */}
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-md md:max-w-4xl mx-auto flex flex-col md:flex-row md:items-center gap-2 p-2 flex-shrink-0">
          <div className="flex-1">
            <input
              type="text"
              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Buscar pet por nome, espécie, raça, tutor..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
              aria-label="Buscar pet por nome, espécie, raça ou tutor"
            />
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition text-sm"
            onClick={() => setModalNovoPet(true)}
            aria-label="Criar novo pet"
          >
            <span className="material-icons text-base" aria-hidden="true">pets</span>
            Novo Pet
          </button>
        </div>
      </div>
      {/* Tabela de pets */}
      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col px-2 pb-2">
        <div className="w-full flex-1">
          <PetList 
            pets={petsPagina} 
            onEdit={openPetFicha} 
            onDelete={handleDelete} 
            onEditClick={handleEdit}
            currentPage={pagina}
            totalPages={totalPaginas}
            totalItems={petsFiltrados.length}
          />
        </div>
        {petsFiltrados.length > 0 && (
          <div className="flex justify-center mt-2 flex-shrink-0">
            <Pagination page={pagina} totalPages={totalPaginas} onPageChange={setPagina} />
          </div>
        )}
      </div>
      {/* Side panel/drawer para ficha do pet */}
      <SidePanel open={!!selectedPet} onClose={closeFichas} pet={selectedPet} />
      {/* Modal para novo pet */}
      <ModalNovoPet open={modalNovoPet} onClose={() => { setModalNovoPet(false); setEditando(null); }} editando={editando} />
      {/* Feedbacks e modal de confirmação */}
      {sucesso && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg font-semibold text-sm animate-fade-in-out">
          Pet salvo com sucesso!
        </div>
      )}
      {sucessoEdicao && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg font-semibold text-sm animate-fade-in-out">
          Pet atualizado com sucesso!
        </div>
      )}
      <ConfirmModal open={!!confirmarExclusao} onConfirm={confirmDelete} onCancel={cancelDelete} pet={confirmarExclusao} />
    </div>
  );
}

export default PetsPage; 