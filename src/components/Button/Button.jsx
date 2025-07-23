import React from "react";

function Spinner() {
  return (
    <span className="inline-block w-5 h-5 mr-2 align-middle animate-spin border-2 border-white border-t-transparent rounded-full" />
  );
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  loading = false,
  fullWidth = false,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-bold rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed select-none";
  
  const color =
    variant === "primary"
      ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white"
      : variant === "outline"
      ? "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
      : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 active:bg-gray-400 dark:active:bg-gray-500 text-gray-800 dark:text-gray-200";
  
  const sizes =
    size === "sm"
      ? "text-sm px-3 py-1.5"
      : size === "lg"
      ? "text-lg px-6 py-3"
      : "text-base px-4 py-2";
  
  const width = fullWidth ? "w-full" : "";
  
  return (
    <button
      className={[base, color, sizes, width, className].filter(Boolean).join(" ")}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <span className="material-icons animate-spin mr-2 text-base">autorenew</span>}
      {children}
    </button>
  );
} 