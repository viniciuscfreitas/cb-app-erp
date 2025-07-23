import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../Button/Button";
import { DataTable, DataTableHeader, DataTableBody, DataTableFooter } from "../ui/DataTable";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  React.useEffect(() => {
    function onResize() {
      setIsDesktop(window.innerWidth >= 768);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isDesktop;
}

function ClientTable({ clients = [], onEdit, onDelete, onEditClick, currentPage = 1, totalPages = 1, totalItems = 0 }) {
  // Mock: última visita (será substituído por dados reais quando implementarmos histórico)
  const mockUltimaVisita = {
    "vinicius@email.com": "12/07/2024",
    "ana@email.com": "05/07/2024",
    "carlos@email.com": "15/07/2024",
    "maria@email.com": "10/07/2024",
    "joao@email.com": "08/07/2024",
    "fernanda@email.com": "20/07/2024",
    "roberto@email.com": "18/07/2024",
    "patricia@email.com": "22/07/2024",
    "lucas@email.com": "25/07/2024",
    "camila@email.com": "28/07/2024"
  };

  // Ordenação
  const [sortCol, setSortCol] = useState("nome");
  const [sortDir, setSortDir] = useState("asc");
  function sortBy(col) {
    if (sortCol === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  }
  const sortedClients = [...clients].sort((a, b) => {
    let va, vb;
    if (sortCol === "pets") {
      // Mock: número de pets por cliente (será substituído por dados reais)
      const mockPetsCount = {
        "vinicius@email.com": 2,
        "ana@email.com": 2,
        "carlos@email.com": 2,
        "maria@email.com": 2,
        "joao@email.com": 2,
        "fernanda@email.com": 1,
        "roberto@email.com": 1,
        "patricia@email.com": 1,
        "lucas@email.com": 1,
        "camila@email.com": 1
      };
      va = mockPetsCount[a.email] || 0;
      vb = mockPetsCount[b.email] || 0;
    } else if (sortCol === "ultimaVisita") {
      va = mockUltimaVisita[a.email] || "";
      vb = mockUltimaVisita[b.email] || "";
    } else if (sortCol === "aniversario") {
      va = a.aniversario || "";
      vb = b.aniversario || "";
    } else {
      va = (a[sortCol] || "").toLowerCase();
      vb = (b[sortCol] || "").toLowerCase();
    }
    if (va < vb) return sortDir === "asc" ? -1 : 1;
    if (va > vb) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  if (!clients.length) {
    return <div className="text-gray-400 text-center py-8">Nenhum cliente cadastrado.</div>;
  }
  
  return (
    <DataTable>
      <DataTableHeader>
        <tr>
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[160px] max-w-[220px] cursor-pointer select-none hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors" onClick={() => sortBy("nome")}>
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">person</span>
              Cliente {sortCol==="nome" && (sortDir==="asc"?"▲":"▼")}
            </div>
          </th>
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[120px] max-w-[140px] cursor-pointer select-none hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors" onClick={() => sortBy("telefone")}>
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">phone</span>
              Telefone {sortCol==="telefone" && (sortDir==="asc"?"▲":"▼")}
            </div>
          </th>
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[140px] max-w-[180px] cursor-pointer select-none hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors" onClick={() => sortBy("aniversario")}>
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">cake</span>
              Aniversário {sortCol==="aniversario" && (sortDir==="asc"?"▲":"▼")}
            </div>
          </th>
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[120px] max-w-[200px] cursor-pointer select-none hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors" onClick={() => sortBy("pets")}>
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">pets</span>
              Pets {sortCol==="pets" && (sortDir==="asc"?"▲":"▼")}
            </div>
          </th>
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[120px] max-w-[140px] cursor-pointer select-none hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors" onClick={() => sortBy("ultimaVisita")}>
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">schedule</span>
              Última visita {sortCol==="ultimaVisita" && (sortDir==="asc"?"▲":"▼")}
            </div>
          </th>
          <th className="px-4 py-3 text-center text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[100px]">
            <div className="flex items-center justify-center gap-2">
              <span className="material-icons text-sm">settings</span>
              Ações
            </div>
          </th>
        </tr>
      </DataTableHeader>
      <DataTableBody>
        {sortedClients.map((c, i) => (
          <tr
            key={c.id || i}
            className={
              (i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-blue-50/50 dark:bg-gray-950/50") +
              " group hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-b-0"
            }
            onClick={e => {
              if (e.target.closest('button')) return;
              onEdit && onEdit(c);
            }}
          >
            <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100 text-base truncate whitespace-nowrap min-w-[160px] max-w-[220px] group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">{c.nome}</td>
            <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm truncate whitespace-nowrap min-w-[120px] max-w-[140px]">{c.telefone || <span className="text-gray-400 italic">Não informado</span>}</td>
            <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm truncate whitespace-nowrap min-w-[140px] max-w-[180px]">
              {c.aniversario ? new Date(c.aniversario).toLocaleDateString('pt-BR') : <span className="text-gray-400 italic">Não informado</span>}
            </td>
            <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm break-words min-w-[120px] max-w-[200px]">
              {/* Mock: pets por cliente (será substituído por dados reais) */}
              {(() => {
                const mockPetsData = {
                  "vinicius@email.com": [
                    { nome: "Thor", tipo: "dog", info: "Golden Retriever, 6 anos" },
                    { nome: "Rex", tipo: "dog", info: "Labrador, 5 anos" }
                  ],
                  "ana@email.com": [
                    { nome: "Mimi", tipo: "cat", info: "Siamês, 4 anos" },
                    { nome: "Luna", tipo: "cat", info: "Persa, 3 anos" }
                  ],
                  "carlos@email.com": [
                    { nome: "Max", tipo: "dog", info: "Poodle, 4 anos" },
                    { nome: "Rocky", tipo: "dog", info: "Rottweiler, 6 anos" }
                  ],
                  "maria@email.com": [
                    { nome: "Nina", tipo: "cat", info: "SRD, 5 anos" },
                    { nome: "Mia", tipo: "cat", info: "Persa, 4 anos" }
                  ],
                  "joao@email.com": [
                    { nome: "Bob", tipo: "dog", info: "Bulldog, 7 anos" },
                    { nome: "Buddy", tipo: "dog", info: "Golden Retriever, 5 anos" }
                  ],
                  "fernanda@email.com": [
                    { nome: "Mel", tipo: "cat", info: "Maine Coon, 3 anos" }
                  ],
                  "roberto@email.com": [
                    { nome: "Simba", type: "dog", info: "Pastor Alemão, 6 anos" }
                  ],
                  "patricia@email.com": [
                    { nome: "Bidu", type: "dog", info: "Yorkshire, 4 anos" }
                  ],
                  "lucas@email.com": [
                    { nome: "Toby", type: "cat", info: "Siamês, 5 anos" }
                  ],
                  "camila@email.com": [
                    { nome: "Lola", type: "dog", info: "Shih Tzu, 3 anos" }
                  ]
                };
                const pets = mockPetsData[c.email] || [];
                return pets.length ? pets.map((pet) => (
                  <span key={pet.nome} className="inline-flex items-center gap-1 mr-2 mb-1 align-top bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full text-xs" title={pet.info} tabIndex={0} aria-label={`Pet: ${pet.nome}, ${pet.info}`}
                    style={{verticalAlign:'top'}}>
                    <span className="material-icons text-xs align-middle" aria-hidden="true">pets</span>
                    <span className="align-middle font-medium">{pet.nome}</span>
                  </span>
                )) : <span className="text-gray-400 italic">Nenhum</span>;
              })()}
            </td>
            <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm min-w-[120px] max-w-[140px] whitespace-nowrap">{mockUltimaVisita[c.email] || "-"}</td>
            <td className="px-4 py-3 text-center min-w-[100px]">
              <div className="flex items-center justify-center gap-1">
                <button
                  aria-label="Editar"
                  className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-full transition-all duration-200 p-1 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                  onClick={e => { e.stopPropagation(); onEditClick ? onEditClick(c) : onEdit && onEdit(c); }}
                >
                  <span className="material-icons text-sm">edit</span>
                </button>
                <button
                  aria-label="Excluir"
                  className="text-red-600 hover:text-red-800 dark:hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded-full transition-all duration-200 p-1 hover:bg-red-100 dark:hover:bg-red-900/30"
                  onClick={e => { e.stopPropagation(); onDelete && onDelete(c); }}
                >
                  <span className="material-icons text-sm">delete</span>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </DataTableBody>
      <DataTableFooter 
        totalItems={totalItems}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={10}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
              <span className="material-icons text-xs text-blue-600 dark:text-blue-400">people</span>
              <span className="text-blue-700 dark:text-blue-300 font-medium">Total: {totalItems}</span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
              <span className="material-icons text-xs text-green-600 dark:text-green-400">pets</span>
              <span className="text-green-700 dark:text-green-300 font-medium">Média: 1.5 pets/cliente</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
              <span className="material-icons text-xs text-purple-600 dark:text-purple-400">trending_up</span>
              <span className="text-purple-700 dark:text-purple-300 font-medium">+12% este mês</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <span className="material-icons text-xs">schedule</span>
            <span className="font-medium">Atualizado: {new Date().toLocaleTimeString('pt-BR')}</span>
          </div>
        </div>
      </DataTableFooter>
    </DataTable>
  );
}

export function ClientList({ clients = [], onEdit, onDelete, onEditClick, currentPage = 1, totalPages = 1, totalItems = 0 }) {
  const isDesktop = useIsDesktop();

  // Renderização condicional: tabela no desktop, cards no mobile
  if (isDesktop) {
    return <ClientTable clients={clients} onEdit={onEdit} onDelete={onDelete} onEditClick={onEditClick} currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} />;
  }

  if (!clients.length) {
    return <div className="text-gray-400 text-center py-8">Nenhum cliente cadastrado.</div>;
  }

  return (
    <div className="space-y-4 w-full max-w-md mx-auto p-2">
      {clients.map((c, i) => (
        <div key={c.id || i} className="transition-all duration-300 ease-in-out animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="material-icons text-blue-600 dark:text-blue-400 text-xl">person</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{c.nome}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{c.email}</p>
                </div>
              </div>
              <div className="flex gap-1">
                  <button
                    aria-label="Editar"
                  className="text-blue-600 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-full transition-shadow duration-200 p-1"
                  onClick={() => onEditClick ? onEditClick(c) : onEdit && onEdit(c)}
                  >
                  <span className="material-icons text-base">edit</span>
                  </button>
                  <button
                    aria-label="Excluir"
                  className="text-red-600 hover:text-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded-full transition-shadow duration-200 p-1"
                    onClick={() => onDelete && onDelete(c)}
                  >
                  <span className="material-icons text-base">delete</span>
                  </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Telefone:</span>
                <p className="font-medium text-gray-900 dark:text-white">{c.telefone || 'Não informado'}</p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Aniversário:</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {c.aniversario ? new Date(c.aniversario).toLocaleDateString('pt-BR') : 'Não informado'}
                </p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <button
                className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                onClick={() => onEdit && onEdit(c)}
              >
                Ver Detalhes
              </button>
            </div>
          </div>
                  </div>
      ))}
      {/* Footer para mobile */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="material-icons text-base">info</span>
            <span>Mostrando {clients.length} de {totalItems} clientes</span>
                </div>
          <div className="flex items-center justify-center gap-2">
            <span className="material-icons text-base">schedule</span>
            <span>Última atualização: {new Date().toLocaleTimeString('pt-BR')}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 