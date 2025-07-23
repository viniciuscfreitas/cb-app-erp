import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { label: "Dashboard", icon: "dashboard" },
  { label: "Clientes", icon: "group" },
  { label: "Pets", icon: "pets" },
  { label: "Agenda", icon: "event" },
  { label: "Estoque", icon: "inventory_2" },
  { label: "Vendas", icon: "point_of_sale" },
  { label: "Financeiro", icon: "account_balance_wallet" },
  { label: "Relatórios", icon: "bar_chart" },
];

export function BottomNav({ active: activeProp = "Dashboard", onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathToLabel = {
    "/clientes": "Clientes",
    "/pets": "Pets",
    "/agendamentos": "Agenda",
    "/estoque": "Estoque",
    "/": "Dashboard",
  };
  const active = pathToLabel[location.pathname] || activeProp;
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center h-16 shadow-t md:hidden"
      role="navigation"
      aria-label="Navegação inferior"
    >
      <ul className="flex justify-around items-center w-full h-full" role="menubar">
        {navItems.map((item) => {
          const isActive = active === item.label;
          return (
            <li key={item.label}>
              <button
                className={`flex flex-col items-center justify-center flex-1 h-full min-w-[48px] min-h-[48px] px-1 py-1 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 rounded-md
                  ${isActive ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-gray-800" : "text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-gray-800"}
                `}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                role="menuitem"
                onClick={() => {
                  if (item.label === "Clientes") navigate("/clientes");
                  else if (item.label === "Pets") navigate("/pets");
                  else if (item.label === "Agenda") navigate("/agendamentos");
                  else if (item.label === "Estoque") navigate("/estoque");
                  else if (item.label === "Dashboard") navigate("/");
                  // outros módulos podem ser adicionados depois
                  if (onNavigate) onNavigate(item.label);
                }}
                tabIndex={0}
                type="button"
              >
                <span className="material-icons text-2xl mb-0.5" aria-hidden="true">{item.icon}</span>
                <span className="text-xs leading-tight font-medium">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
} 