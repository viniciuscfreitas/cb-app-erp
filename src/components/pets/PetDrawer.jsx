import React from "react";

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

export function PetDrawer({ open, onClose, pet, onEdit, onDelete }) {
  return (
    <div className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-label="Fechar ficha do pet"
      />
      <aside
        className={`relative w-full max-w-xl bg-white dark:bg-gray-800 shadow-2xl h-full p-8 flex flex-col items-center transition-transform duration-300 transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ borderTopLeftRadius: 24, borderBottomLeftRadius: 24 }}
      >
        <button className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 text-2xl" onClick={onClose} aria-label="Fechar">
          <span className="material-icons">close</span>
        </button>
        <span className="material-icons text-blue-500 dark:text-blue-300 text-6xl mb-4">pets</span>
        {pet ? (
          <div className="w-full text-center">
            <h2 className="font-extrabold text-3xl text-blue-700 dark:text-blue-200 mb-4">Ficha do Pet</h2>
            <div className="mb-2 text-lg text-gray-900 dark:text-white"><span className="font-semibold text-gray-700 dark:text-gray-300">Nome:</span> {pet.nome}</div>
            <div className="mb-2 text-lg text-gray-900 dark:text-white"><span className="font-semibold text-gray-700 dark:text-gray-300">Espécie:</span> {pet.especie}</div>
            <div className="mb-2 text-lg text-gray-900 dark:text-white"><span className="font-semibold text-gray-700 dark:text-gray-300">Raça:</span> {pet.raca}</div>
            <div className="mb-2 text-lg text-gray-900 dark:text-white"><span className="font-semibold text-gray-700 dark:text-gray-300">Sexo:</span> {pet.sexo === 'M' ? 'Macho' : pet.sexo === 'F' ? 'Fêmea' : '-'}</div>
            <div className="mb-2 text-lg text-gray-900 dark:text-white"><span className="font-semibold text-gray-700 dark:text-gray-300">Cor:</span> {pet.cor || '-'}</div>
            <div className="mb-2 text-lg text-gray-900 dark:text-white"><span className="font-semibold text-gray-700 dark:text-gray-300">Nascimento:</span> {pet.nascimento || '-'}</div>
            <div className="mb-2 text-lg text-gray-900 dark:text-white"><span className="font-semibold text-gray-700 dark:text-gray-300">Idade:</span> {calcularIdade(pet.nascimento)}</div>
            <div className="mb-2 text-lg text-gray-900 dark:text-white"><span className="font-semibold text-gray-700 dark:text-gray-300">Observações:</span> {pet.observacoes || '-'}</div>
            <div className="mb-2 text-lg text-gray-900 dark:text-white">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Dono:</span> {pet.dono?.nome ? (
                <a href="#" className="text-blue-600 dark:text-blue-300 underline hover:text-blue-800 dark:hover:text-blue-200" tabIndex={0}>{pet.dono.nome}</a>
              ) : (
                <span className="text-gray-400">Sem dono</span>
              )}
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition" onClick={() => { onEdit?.(pet); onClose(); }}>Editar</button>
              <button className="px-4 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition" onClick={() => { onDelete?.(pet); onClose(); }}>Excluir</button>
            </div>
          </div>
        ) : (
          <div className="w-full text-center text-gray-400 py-16">
            <h2 className="font-extrabold text-2xl mb-2">Ficha do Pet</h2>
            <span className="material-icons text-5xl mb-2">pets</span>
            <div>Nenhum pet selecionado</div>
          </div>
        )}
      </aside>
    </div>
  );
}

export default PetDrawer; 