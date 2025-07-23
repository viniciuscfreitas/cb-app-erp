import React, { useState, useRef, useEffect } from "react";

export function OwnerAutocomplete({ clientes = [], value, onChange, label = "Dono", required = false, erro = "" }) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef();
  const listRef = useRef();

  // Atualiza input ao selecionar valor externo
  useEffect(() => {
    if (value && typeof value === "object") {
      setInput(value.nome);
    } else if (!value) {
      setInput("");
    }
  }, [value]);

  // Filtra clientes pelo input
  const sugestoes = clientes.filter(c =>
    c.nome.toLowerCase().includes(input.toLowerCase())
  );

  function handleSelect(cliente) {
    setInput(cliente.nome);
    setOpen(false);
    onChange?.(cliente);
  }

  function handleInput(e) {
    setInput(e.target.value);
    setOpen(true);
    onChange?.(null); // Limpa seleção ao digitar
  }

  function handleKeyDown(e) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      setHighlight(h => Math.min(h + 1, sugestoes.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlight(h => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      if (sugestoes[highlight]) handleSelect(sugestoes[highlight]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  useEffect(() => {
    if (open && listRef.current) {
      const el = listRef.current.children[highlight];
      if (el) el.scrollIntoView({ block: "nearest" });
    }
  }, [highlight, open]);

  return (
    <div className="relative">
      <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-200" id={`${label.toLowerCase()}-label`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        ref={inputRef}
        className={`w-full rounded-lg border px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 ${erro ? 'border-red-500 dark:border-red-400' : ''}`}
        value={input}
        onChange={handleInput}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={handleKeyDown}
        placeholder="Buscar cliente pelo nome..."
        aria-labelledby={`${label.toLowerCase()}-label`}
        aria-describedby={erro ? `${label.toLowerCase()}-error` : undefined}
        aria-invalid={!!erro}
        autoComplete="off"
        required={required}
      />
      {erro && <div id={`${label.toLowerCase()}-error`} className="text-red-600 dark:text-red-400 text-xs mt-1" role="alert">{erro}</div>}
      {open && sugestoes.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-56 overflow-auto text-sm"
          role="listbox"
        >
          {sugestoes.map((c, i) => (
            <li
              key={c.id}
              className={`px-4 py-2 cursor-pointer ${i === highlight ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-900 dark:text-gray-100'} hover:bg-blue-100 dark:hover:bg-blue-800 flex flex-col`}
              onMouseDown={() => handleSelect(c)}
              onMouseEnter={() => setHighlight(i)}
              role="option"
              aria-selected={i === highlight}
            >
              <span className="font-semibold truncate">{c.nome}</span>
              {c.email && <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{c.email}</span>}
              {c.telefone && <span className="text-xs text-gray-400 dark:text-gray-500 truncate">{c.telefone}</span>}
            </li>
          ))}
        </ul>
      )}
      {open && sugestoes.length === 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg px-4 py-2 text-gray-400 dark:text-gray-500 text-sm">
          Nenhum cliente encontrado
        </div>
      )}
    </div>
  );
}

export default OwnerAutocomplete; 