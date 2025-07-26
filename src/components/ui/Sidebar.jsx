import React, { useEffect, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/moduleColors';

export function Sidebar({ open = false, onClose, active: activeProp = "Dashboard", expanded: expandedProp, setExpanded: setExpandedProp }) {
  const location = useLocation();
  // Determinar ativo pela rota
  const pathToLabel = {
    "/clientes": "Clientes",
    "/pets": "Pets",
    "/agendamentos": "Agenda",
    "/estoque": "Estoque",
    "/": "Dashboard",
  };
  const active = pathToLabel[location.pathname] || activeProp;
  const navRef = useRef(null);
  const [internalExpanded, setInternalExpanded] = React.useState(true);
  const expanded = expandedProp !== undefined ? expandedProp : internalExpanded;
  const setExpanded = setExpandedProp || setInternalExpanded;

  useEffect(() => {
    if (open && navRef.current) {
      navRef.current.focus();
    }
  }, [open]);

  // Sidebar width
  const sidebarWidth = expanded ? "w-[200px]" : "w-16";

  return (
    <>
      {/* Overlay só no mobile quando open */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity md:hidden"
          onClick={onClose}
          aria-label="Fechar menu"
        />
      )}
      {/* Sidebar: fixa no desktop, drawer no mobile */}
      <nav
        ref={navRef}
        tabIndex={-1}
        className={`
          fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 flex flex-col items-stretch overflow-hidden
          pt-14 md:pt-0
          ${sidebarWidth}
          transition-[width] duration-300 ease-in-out
          // Drawer no mobile: só aparece se open, senão fica fora da tela
          ${open ? "shadow-lg translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:shadow-none md:block
        `}
        aria-label="Menu principal"
        role="navigation"
        style={{ outline: "none" }}
      >
        <ul className="flex flex-col gap-2 mt-2 flex-1 mb-4 px-1 justify-start" role="menubar">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.label;
            return (
              <li key={item.label}>
                <Link
                  to={item.label === "Clientes" ? "/clientes" : item.label === "Pets" ? "/pets" : item.label === "Agenda" ? "/agendamentos" : item.label === "Estoque" ? "/estoque" : "/"}
                  className={[
                    "flex items-center font-medium text-base transition-all duration-300 ease-in-out h-12",
                    expanded
                      ? "gap-4 justify-start px-2 rounded-lg w-full"
                      : "justify-center px-2 rounded-lg w-12 mx-auto",
                    isActive
                      ? "text-white dark:text-white"
                      : "text-gray-700 dark:text-gray-200 hover:text-white dark:hover:text-white",
                  ].filter(Boolean).join(" ")}
                  style={{
                    transition: 'padding 0.3s, margin 0.3s, width 0.3s',
                    backgroundColor: isActive 
                      ? item.color 
                      : 'transparent',
                    '--hover-bg': item.color,
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
                  tabIndex={open || window.innerWidth >= 768 ? 0 : -1}
                  aria-current={isActive ? "page" : undefined}
                  role="menuitem"
                  aria-label={expanded ? item.label : `${item.label} - ${expanded ? 'Expandido' : 'Recolhido'}`}
                  onClick={onClose}
                >
                  <span
                    className={[
                      "material-icons text-2xl flex-shrink-0 transition-colors duration-300",
                      expanded ? "mx-auto md:mx-0" : "mx-auto",
                      isActive
                        ? "text-white"
                        : "",
                    ].filter(Boolean).join(" ")}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  {expanded && (
                    <span 
                      className={[
                        "transition-all duration-300 ease-in-out",
                        isActive ? "text-white" : "text-gray-700 dark:text-gray-200"
                      ].filter(Boolean).join(" ")}
                      style={{
                        opacity: expanded ? 1 : 0,
                        transform: expanded ? 'translateX(0)' : 'translateX(-10px)',
                        width: expanded ? 'auto' : '0',
                        overflow: 'hidden'
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* Botão de expandir/recolher (desktop) - agora no rodapé, centralizado */}
        <button
          className={`hidden md:flex items-center justify-center w-8 h-8 mb-4 mx-auto rounded-full transition-colors focus:outline-none
            text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-300`}
          style={{ background: "none", border: "none" }}
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? "Recolher menu" : "Expandir menu"}
        >
          <span className="material-icons text-lg">
            {expanded ? "chevron_left" : "chevron_right"}
          </span>
        </button>
      </nav>
    </>
  );
} 