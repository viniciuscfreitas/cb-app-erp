import React, { useState } from "react";
import OwnerAutocomplete from "./OwnerAutocomplete";

export function PetForm({ onSave, clientes = [], editando = null, onCancel }) {
  const [pet, setPet] = useState(
    editando || {
      nome: "",
      especie: "",
      raca: "",
      sexo: "",
      cor: "",
      nascimento: "",
      observacoes: "",
      dono: null,
      foto: "",
    }
  );
  const [erros, setErros] = useState({});
  const [preview, setPreview] = useState(editando?.foto || "");

  function handleChange(e) {
    const { name, value } = e.target;
    setPet((prev) => ({ ...prev, [name]: value }));
  }

  function handleDonoChange(cliente) {
    setPet((prev) => ({ ...prev, dono: cliente }));
  }

  function handleFotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPet((prev) => ({ ...prev, foto: ev.target.result }));
        setPreview(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const novosErros = {};
    if (!pet.nome.trim()) novosErros.nome = "Nome do pet é obrigatório";
    if (!pet.especie.trim()) novosErros.especie = "Espécie é obrigatória";
    if (!pet.dono) novosErros.dono = "Selecione o dono do pet";
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;
    onSave?.(pet);
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit} role="form" aria-labelledby="pet-form-title">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-3 w-full md:w-auto">
          <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-200">Foto</label>
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden border-4 border-blue-200 dark:border-blue-700 shadow-md mb-2">
            {preview ? (
              <img src={preview} alt="Foto do pet" className="object-cover w-full h-full" />
            ) : (
              <span className="material-icons text-5xl text-gray-400" aria-hidden="true">pets</span>
            )}
          </div>
          <label className="relative inline-block cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white font-bold text-xs shadow hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400">
            Selecionar foto
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFotoChange}
              aria-label="Selecionar foto do pet"
            />
          </label>
        </div>
        <div className="flex-1 w-full flex flex-col gap-3">
          <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-200">Nome *</label>
          <input
            className={`w-full rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-base bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none transition ${erros.nome ? 'border-red-500 dark:border-red-400' : ''}`}
            name="nome"
            value={pet.nome}
            onChange={handleChange}
            required
            autoFocus
          />
          {erros.nome && <div className="text-red-600 dark:text-red-400 text-xs mt-1">{erros.nome}</div>}
        </div>
        <div className="flex-1 w-full flex flex-col gap-3">
          <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-200">Espécie *</label>
          <input
            className={`w-full rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-base bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none transition ${erros.especie ? 'border-red-500 dark:border-red-400' : ''}`}
            name="especie"
            value={pet.especie}
            onChange={handleChange}
            required
          />
          {erros.especie && <div className="text-red-600 dark:text-red-400 text-xs mt-1">{erros.especie}</div>}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-200">Raça</label>
          <input
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-base bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none transition"
            name="raca"
            value={pet.raca}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-200">Sexo</label>
          <select
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-base bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none transition"
            name="sexo"
            value={pet.sexo}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="M">Macho</option>
            <option value="F">Fêmea</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-200">Cor</label>
          <input
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-base bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none transition"
            name="cor"
            value={pet.cor}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-200">Nascimento</label>
          <input
            type="date"
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-base bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none transition"
            name="nascimento"
            value={pet.nascimento}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-200">Observações</label>
        <textarea
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-base bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none transition"
          name="observacoes"
          value={pet.observacoes}
          onChange={handleChange}
          rows={2}
        />
      </div>
      <div>
        <OwnerAutocomplete
          clientes={clientes}
          value={pet.dono}
          onChange={handleDonoChange}
          label="Dono"
          required
          erro={erros.dono}
        />
      </div>
      <div className="flex gap-2 justify-end mt-4">
        <button type="button" className="px-5 py-2.5 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-bold shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition">Salvar</button>
      </div>
    </form>
  );
}

export default PetForm; 