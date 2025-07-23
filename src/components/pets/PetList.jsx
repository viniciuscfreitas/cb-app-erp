import React from "react";
import { DataTable, DataTableHeader, DataTableBody, DataTableFooter } from "../ui/DataTable";

// Exemplo de dados de pets
// [{ nome, especie, raca, nascimento, dono: { nome } }]

function calcularIdade(nascimento) {
  if (!nascimento) return "-";
  const nasc = new Date(nascimento);
  const hoje = new Date();
  let anos = hoje.getFullYear() - nasc.getFullYear();
  let meses = hoje.getMonth() - nasc.getMonth();
  if (meses < 0) {
    anos--;
    meses += 12;
  }
  if (hoje.getDate() < nasc.getDate()) {
    meses--;
    if (meses < 0) {
      anos--;
      meses += 12;
    }
  }
  let texto = [];
  if (anos > 0) texto.push(anos + (anos === 1 ? " ano" : " anos"));
  if (meses > 0) texto.push(meses + (meses === 1 ? " mês" : " meses"));
  if (texto.length === 0) return "0 mês";
  return texto.join(" e ");
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 768);
  React.useEffect(() => {
    function onResize() {
      setIsDesktop(window.innerWidth >= 768);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isDesktop;
}

function PetTable({ pets = [], onEdit, onDelete, onEditClick, currentPage = 1, totalPages = 1, totalItems = 0 }) {
  const [sortCol, setSortCol] = React.useState("nome");
  const [sortDir, setSortDir] = React.useState("asc");

  function sortBy(col) {
    if (sortCol === col) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  }

  const sortedPets = [...pets].sort((a, b) => {
    let va, vb;
    if (sortCol === "idade") {
      va = a.nascimento || "";
      vb = b.nascimento || "";
    } else if (sortCol === "dono") {
      va = (a.dono?.nome || "").toLowerCase();
      vb = (b.dono?.nome || "").toLowerCase();
    } else {
      va = (a[sortCol] || "").toLowerCase();
      vb = (b[sortCol] || "").toLowerCase();
    }
    if (va < vb) return sortDir === "asc" ? -1 : 1;
    if (va > vb) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  if (!pets.length) {
    return <div className="text-gray-400 text-center py-8">Nenhum pet cadastrado.</div>;
  }

  // Calcular estatísticas
  const especies = pets.reduce((acc, pet) => {
    acc[pet.especie] = (acc[pet.especie] || 0) + 1;
    return acc;
  }, {});
  const especieMaisComum = Object.keys(especies).reduce((a, b) => especies[a] > especies[b] ? a : b, '');
  const petsComTutor = pets.filter(pet => pet.dono).length;

  return (
    <DataTable>
      <DataTableHeader>
        <tr>
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[160px] max-w-[220px] cursor-pointer select-none hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors" onClick={() => sortBy("nome")}>
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">pets</span>
              Pet {sortCol==="nome" && (sortDir==="asc"?"▲":"▼")}
            </div>
          </th>
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[120px] max-w-[140px] cursor-pointer select-none hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors" onClick={() => sortBy("especie")}>
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">category</span>
              Espécie {sortCol==="especie" && (sortDir==="asc"?"▲":"▼")}
            </div>
          </th>
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[120px] max-w-[140px] cursor-pointer select-none hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors" onClick={() => sortBy("raca")}>
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">pets</span>
              Raça {sortCol==="raca" && (sortDir==="asc"?"▲":"▼")}
            </div>
          </th>
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[120px] max-w-[140px] cursor-pointer select-none hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors" onClick={() => sortBy("idade")}>
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">cake</span>
              Idade {sortCol==="idade" && (sortDir==="asc"?"▲":"▼")}
            </div>
          </th>
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[160px] max-w-[200px] cursor-pointer select-none hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors" onClick={() => sortBy("dono")}>
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">person</span>
              Tutor {sortCol==="dono" && (sortDir==="asc"?"▲":"▼")}
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
        {sortedPets.map((pet, i) => (
          <tr
            key={pet.id || i}
            className={
              (i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-blue-50/50 dark:bg-gray-950/50") +
              " group hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-b-0"
            }
            onClick={e => {
              if (e.target.closest('button')) return;
              onEdit && onEdit(pet);
            }}
          >
            <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100 text-base truncate whitespace-nowrap min-w-[160px] max-w-[220px] group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">{pet.nome}</td>
            <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm truncate whitespace-nowrap min-w-[120px] max-w-[140px]">
              <span className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full text-xs">
                <span className="material-icons text-xs">{pet.especie === 'Cão' ? 'pets' : 'pets'}</span>
                {pet.especie}
              </span>
            </td>
            <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm truncate whitespace-nowrap min-w-[120px] max-w-[140px]">{pet.raca}</td>
            <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm min-w-[120px] max-w-[140px] whitespace-nowrap">{calcularIdade(pet.nascimento)}</td>
            <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm truncate whitespace-nowrap min-w-[160px] max-w-[200px]">
              {pet.dono?.nome ? (
                <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full text-xs">
                  <span className="material-icons text-xs">person</span>
                  {pet.dono.nome}
                </span>
              ) : (
                <span className="text-gray-400 italic">Sem tutor</span>
              )}
            </td>
            <td className="px-4 py-3 text-center min-w-[100px]">
              <div className="flex items-center justify-center gap-1">
                <button
                  aria-label="Editar"
                  className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-full transition-all duration-200 p-1 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                  onClick={e => { e.stopPropagation(); onEditClick ? onEditClick(pet) : onEdit && onEdit(pet); }}
                >
                  <span className="material-icons text-sm">edit</span>
                </button>
                <button
                  aria-label="Excluir"
                  className="text-red-600 hover:text-red-800 dark:hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded-full transition-all duration-200 p-1 hover:bg-red-100 dark:hover:bg-red-900/30"
                  onClick={e => { e.stopPropagation(); onDelete && onDelete(pet); }}
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
              <span className="material-icons text-xs text-blue-600 dark:text-blue-400">pets</span>
              <span className="text-blue-700 dark:text-blue-300 font-medium">Total: {totalItems}</span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
              <span className="material-icons text-xs text-green-600 dark:text-green-400">category</span>
              <span className="text-green-700 dark:text-green-300 font-medium">Mais comum: {especieMaisComum}</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
              <span className="material-icons text-xs text-purple-600 dark:text-purple-400">person</span>
              <span className="text-purple-700 dark:text-purple-300 font-medium">Com tutor: {petsComTutor}</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full">
              <span className="material-icons text-xs text-orange-600 dark:text-orange-400">trending_up</span>
              <span className="text-orange-700 dark:text-orange-300 font-medium">+8% este mês</span>
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

export function PetList({ pets = [], onEdit, onDelete, onEditClick, currentPage = 1, totalPages = 1, totalItems = 0 }) {
  const isDesktop = useIsDesktop();

  // Renderização condicional: tabela no desktop, cards no mobile
  if (isDesktop) {
    return <PetTable pets={pets} onEdit={onEdit} onDelete={onDelete} onEditClick={onEditClick} currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} />;
  }

  if (!pets.length) {
    return <div className="text-gray-400 text-center py-8">Nenhum pet cadastrado.</div>;
  }

  // Calcular estatísticas para mobile
  const especies = pets.reduce((acc, pet) => {
    acc[pet.especie] = (acc[pet.especie] || 0) + 1;
    return acc;
  }, {});
  const especieMaisComum = Object.keys(especies).reduce((a, b) => especies[a] > especies[b] ? a : b, '');
  const petsComTutor = pets.filter(pet => pet.dono).length;

  return (
    <div className="space-y-4 w-full max-w-md mx-auto p-2">
      {pets.map((pet, i) => (
        <div key={pet.id || i} className="transition-all duration-300 ease-in-out animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="material-icons text-blue-600 dark:text-blue-400 text-xl">
                    {pet.especie === 'Cão' ? 'pets' : 'pets'}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{pet.nome}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{pet.especie} • {pet.raca}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  aria-label="Editar"
                  className="text-blue-600 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-full transition-shadow duration-200 p-1"
                  onClick={() => onEditClick ? onEditClick(pet) : onEdit && onEdit(pet)}
                >
                  <span className="material-icons text-base">edit</span>
                </button>
                <button
                  aria-label="Excluir"
                  className="text-red-600 hover:text-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded-full transition-shadow duration-200 p-1"
                  onClick={() => onDelete && onDelete(pet)}
                >
                  <span className="material-icons text-base">delete</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Idade:</span>
                <p className="font-medium text-gray-900 dark:text-white">{calcularIdade(pet.nascimento)}</p>
              </div>
                             <div>
                 <span className="text-gray-600 dark:text-gray-400">Tutor:</span>
                 <p className="font-medium text-gray-900 dark:text-white">{pet.dono?.nome || 'Sem tutor'}</p>
               </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <button
                className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                onClick={() => onEdit && onEdit(pet)}
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
            <span>Mostrando {pets.length} de {totalItems} pets</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-center gap-1">
              <span className="material-icons text-xs">category</span>
              <span>{especieMaisComum}</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <span className="material-icons text-xs">person</span>
              <span>{petsComTutor} com tutor</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="material-icons text-xs">schedule</span>
            <span>Última atualização: {new Date().toLocaleTimeString('pt-BR')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetList; 