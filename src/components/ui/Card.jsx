import React from "react";

/**
 * Card DRY global, responsivo e moderno.
 * Props:
 * - title: string (opcional)
 * - icon: string (Material Icon, opcional)
 * - actions: ReactNode (opcional, ex: botão, ícone, texto ou ambos)
 * - variant: 'outlined' | 'filled' (default: 'outlined')
 * - children: conteúdo do card
 * - className: classes extras
 */
export function Card({
  title,
  icon,
  actions,
  variant = "outlined",
  children,
  className = "",
  ...props
}) {
  const base =
    "w-full rounded-2xl p-4 md:p-6 shadow-sm transition bg-white dark:bg-gray-900 flex flex-col gap-2";
  const outlined =
    "border border-gray-200 dark:border-gray-800";
  const filled =
    "bg-blue-50 dark:bg-gray-800 border-0";
  return (
    <div
      className={[
        base,
        variant === "outlined" ? outlined : filled,
        className,
      ].filter(Boolean).join(" ")}
      {...props}
    >
      {(title || icon || actions) && (
        <div className="flex items-center gap-2 mb-2 min-h-[32px]">
          {icon && (
            <span className="material-icons text-blue-500 dark:text-blue-300 text-2xl mr-1">{icon}</span>
          )}
          {title && (
            <h3 className="font-bold text-lg md:text-xl text-gray-900 dark:text-gray-100 flex-1 truncate">{title}</h3>
          )}
          {actions && <div className="flex-shrink-0 flex items-center gap-1">{actions}</div>}
        </div>
      )}
      <div className="flex-1 w-full">{children}</div>
    </div>
  );
} 