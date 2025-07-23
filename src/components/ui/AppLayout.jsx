import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  useEffect(() => {
    function onResize() {
      setIsDesktop(window.innerWidth >= 768);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isDesktop;
}

export function AppLayout({ user = "Usuário", active: activeProp = "Dashboard", children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [active, setActive] = useState(activeProp);
  const isDesktop = useIsDesktop();

  return (
    <div className={`bg-gray-100 dark:bg-gray-950 ${isDesktop ? 'h-screen flex flex-col overflow-hidden' : 'min-h-screen'}`}>
      {/* Header fixo apenas no mobile */}
      <Header user={user} onMenuClick={() => setSidebarOpen((v) => !v)} active={active} />
      <div className={`${isDesktop ? 'flex flex-1 overflow-hidden' : 'flex pt-14'}`}>
        {/* Sidebar só no desktop (renderização condicional) */}
        {isDesktop && (
          <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            active={active}
            expanded={sidebarExpanded}
            setExpanded={setSidebarExpanded}
            setActive={setActive}
          />
        )}
        {/* Conteúdo principal */}
        <main
          className={
            `bg-white dark:bg-gray-900 transition-all duration-300 ` +
            (isDesktop
              ? 'flex-1 overflow-hidden'
              : 'flex-1 w-full')
          }
        >
          {children}
        </main>
      </div>
      {/* BottomNav só em mobile/tablet (renderização condicional) */}
      {!isDesktop && (
        <BottomNav active={active} onNavigate={setActive} />
      )}
    </div>
  );
}

export default AppLayout; 