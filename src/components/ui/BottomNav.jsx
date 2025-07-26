import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/moduleColors';

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
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.label;
          return (
            <li key={item.label}>
              <button
                className={`flex flex-col items-center justify-center flex-1 h-full min-w-[48px] min-h-[48px] px-1 py-1 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 rounded-md
                  ${isActive ? "text-white" : "text-gray-500 dark:text-gray-300 hover:text-white"}
                `}
                style={{
                  backgroundColor: isActive ? item.color : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = item.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
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