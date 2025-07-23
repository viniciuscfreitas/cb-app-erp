import React from "react";

/**
 * Componente DRY de paginação para listas grandes.
 * Props:
 * - page: página atual (1-based)
 * - totalPages: total de páginas
 * - onPageChange: função(page) => void
 * - className: classes extras
 * - variant: "default" | "compact" (opcional)
 */
export function Pagination({ page = 1, totalPages = 1, onPageChange, className = "", variant = "default" }) {
  if (totalPages <= 1) return null;

  // Gera lista de páginas (máximo 5 visíveis, com ... se necessário)
  function getPages() {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (page >= totalPages - 2) return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  }
  const pages = getPages();

  function handlePageClick(p) {
    if (p === "..." || p === page) return;
    if (onPageChange) onPageChange(p);
  }

  return (
    <nav
      className={`flex items-center justify-center gap-1 select-none ${variant === "compact" ? "text-xs" : "text-sm"} ${className}`}
      role="navigation"
      aria-label="Paginação"
    >
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Página anterior"
        onClick={() => onPageChange && page > 1 && onPageChange(page - 1)}
        disabled={page === 1}
        type="button"
      >
        <span className="material-icons text-base" aria-hidden="true">chevron_left</span>
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={"ellipsis-" + i} className="px-1 text-gray-400">...</span>
        ) : (
          <button
            key={p}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 font-bold
              ${p === page ? "bg-blue-600 text-white shadow" : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-700"}
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400`}
            aria-label={`Página ${p}`}
            aria-current={p === page ? "page" : undefined}
            onClick={() => handlePageClick(p)}
            type="button"
          >
            {p}
          </button>
        )
      )}
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Próxima página"
        onClick={() => onPageChange && page < totalPages && onPageChange(page + 1)}
        disabled={page === totalPages}
        type="button"
      >
        <span className="material-icons text-base" aria-hidden="true">chevron_right</span>
      </button>
    </nav>
  );
} 