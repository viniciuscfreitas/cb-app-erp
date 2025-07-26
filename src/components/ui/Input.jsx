import React, { forwardRef } from "react";

/**
 * Componente Input DRY global, responsivo e acessível.
 * Props:
 * - label: string (opcional)
 * - placeholder: string (opcional)
 * - value: string
 * - onChange: function
 * - error: string (opcional)
 * - icon: string (Material Icon, opcional)
 * - type: string (default: text)
 * - disabled: boolean
 * - helpText: string (opcional)
 * - id: string (opcional)
 */
export const Input = forwardRef(({
  label,
  placeholder,
  value,
  onChange,
  error,
  icon,
  type = "text",
  disabled = false,
  helpText,
  id,
  floatingLabel = true,
  onClear,
  ...props
}, ref) => {
  const inputId = id || `input-${label?.replace(/\s+/g, "-").toLowerCase() || Math.random().toString(36).slice(2, 8)}`;
  const isFloating = floatingLabel && !!label;
  const isFilled = value && value.length > 0;
  const showClear = isFilled && !disabled && typeof onChange === 'function';
  return (
    <div className="w-full max-w-full">
      <div className="relative flex items-center">
        {icon && (
          <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg pointer-events-none">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`w-full rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-transparent px-4 py-3 text-sm shadow-sm
            ${icon ? 'pl-12' : 'pl-4'}
            ${showClear ? 'pr-12' : 'pr-4'}
            ${error ? 'border-red-400 focus:ring-red-100 dark:focus:ring-red-900/30' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 focus:border-blue-500 dark:focus:border-blue-400'}
            ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-50 dark:bg-gray-800' : ''}
          `}
          placeholder={isFloating ? label : placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={helpText ? `${inputId}-help` : error ? `${inputId}-error` : undefined}
          {...props}
        />
        {isFloating && (
          <label
            htmlFor={inputId}
            className={`absolute pointer-events-none transition-all duration-200 origin-left
              bg-white dark:bg-gray-900 px-2
              ${icon ? 'left-12' : 'left-4'}
              ${isFilled || document.activeElement?.id === inputId ? 'text-xs text-blue-700 dark:text-blue-300 font-semibold' : 'text-sm text-gray-500 dark:text-gray-400'}
            `}
            style={{
              zIndex: 2,
              top: (isFilled || document.activeElement?.id === inputId) ? '0.75rem' : '50%',
              transform: (isFilled || document.activeElement?.id === inputId)
                ? 'translateY(-50%) scale(0.85)'
                : 'translateY(-50%) scale(1)'
            }}
          >
            {label}
          </label>
        )}
        {showClear && (
          <button
            type="button"
            tabIndex={0}
            aria-label="Limpar campo"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors duration-200"
            onClick={e => {
              if (onClear) onClear(e);
              else onChange({ target: { value: "" } });
            }}
          >
            <span className="material-icons text-base">close</span>
          </button>
        )}
      </div>
      {helpText && !error && (
        <div id={`${inputId}-help`} className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helpText}</div>
      )}
      {error && (
        <div id={`${inputId}-error`} className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</div>
      )}
    </div>
  );
}); 