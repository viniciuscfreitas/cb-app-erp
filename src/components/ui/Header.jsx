import React, { useState, useEffect, useRef } from "react";

function Dropdown({ open, onClose, children, align = "right", labelId }) {
  const ref = useRef();
  useEffect(() => {
    if (!open) return;
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handle);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      ref={ref}
      role="menu"
      aria-labelledby={labelId}
      tabIndex={-1}
      className={`absolute z-50 mt-2 min-w-[260px] max-w-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 px-1 text-sm ${align === "right" ? "right-0" : "left-0"}`}
    >
      {children}
    </div>
  );
}

// SVGs animados para sol e lua
function SunIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" className="transition-colors duration-300 fill-yellow-400 dark:fill-transparent" />
      <g className="stroke-yellow-400 dark:stroke-gray-400">
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </g>
    </svg>
  );
}
function MoonIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" className="transition-colors duration-300 fill-blue-400/30 dark:fill-blue-300/80" />
    </svg>
  );
}

export function Header({
  user = { nome: "Dra. Ana Paula", cargo: "Veterinária", fotoUrl: "/assets/ana.jpg" },
  breadcrumbs = [ { label: "Dashboard", href: "/" }, { label: "Clientes", href: "/clientes" } ],
  notifications = [ { id: 1, title: "Novo agendamento", read: false, href: "/agendamentos/1" } ],
  datetime: datetimeProp = new Date(),
  onHelp = () => { alert('Ajuda/Suporte'); },
  onBreadcrumb = (bc) => { alert('Breadcrumb: ' + bc.label); },
  // Props para notificações de agendamentos
  calendarEvents = [],
}) {
  // Data/hora dinâmica (mock)
  const [datetime, setDatetime] = useState(datetimeProp);
  // Busca global funcional
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchActive, setSearchActive] = useState(0);
  const searchInputRef = useRef();
  // Mock de resultados
  const MOCK_RESULTS = React.useMemo(() => [
    { id: 1, label: "Cliente: Ana Paula", type: "cliente" },
    { id: 2, label: "Pet: Thor", type: "pet" },
    { id: 3, label: "Venda: #1234", type: "venda" },
    { id: 4, label: "Agendamento: Banho 10h", type: "agenda" },
    { id: 5, label: "Produto: Ração Golden", type: "estoque" },
  ], []);
  // Foco via atalho /
  useEffect(() => {
    function handleKey(e) {
      if ((e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") || (e.ctrlKey && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);
  // Filtrar resultados
  useEffect(() => {
    if (search.trim()) {
      const term = search.toLowerCase();
      setSearchResults(
        MOCK_RESULTS.filter(r => r.label.toLowerCase().includes(term))
      );
      setSearchOpen(true);
      setSearchActive(0);
    } else {
      setSearchResults([]);
      setSearchOpen(false);
    }
  }, [search, MOCK_RESULTS]);
  // Navegação por teclado
  function handleSearchKey(e) {
    if (!searchOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSearchActive(a => Math.min(a + 1, searchResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSearchActive(a => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (searchResults[searchActive]) {
        alert("Selecionado: " + searchResults[searchActive].label);
        setSearchOpen(false);
      }
    } else if (e.key === "Escape") {
      setSearchOpen(false);
    }
  }
  // Highlight termo
  function highlight(text, term) {
    if (!term) return text;
    const parts = text.split(new RegExp(`(${term})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === term.toLowerCase() ? <mark key={i} className="bg-blue-100 text-blue-700 rounded px-0.5">{part}</mark> : part
    );
  }
  // Fechar ao clicar fora
  const searchDropdownRef = useRef();
  useEffect(() => {
    if (!searchOpen) return;
    function handle(e) {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(e.target) &&
        !searchInputRef.current.contains(e.target)
      ) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [searchOpen]);
  useEffect(() => {
    const timer = setInterval(() => setDatetime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const formatDate = (date) =>
    date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) +
    " " +
    date.toLocaleDateString("pt-BR");
  // Verificar eventos próximos e criar notificações
  const [calendarNotifications, setCalendarNotifications] = useState([]);
  
  useEffect(() => {
    if (calendarEvents.length > 0) {
      const now = new Date();
      const upcomingEvents = calendarEvents.filter(event => {
        const eventStart = new Date(event.start);
        const timeDiff = eventStart.getTime() - now.getTime();
        const minutesDiff = timeDiff / (1000 * 60);
        
        // Eventos nos próximos 30 minutos
        return minutesDiff > 0 && minutesDiff <= 30;
      });

      const newCalendarNotifications = upcomingEvents.map(event => ({
        id: `calendar-${event.id}`,
        title: `Agendamento próximo: ${event.title}`,
        message: `${event.client?.name} • ${event.pet?.name} • ${event.service?.name}`,
        time: new Date(event.start).toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        eventId: event.id,
        read: false,
        type: 'calendar'
      }));

      setCalendarNotifications(prev => {
        const existingIds = prev.map(n => n.eventId);
        const uniqueNewNotifications = newCalendarNotifications.filter(n => !existingIds.includes(n.eventId));
        return [...prev, ...uniqueNewNotifications];
      });
    }
  }, [calendarEvents]);

  // Notificações não lidas (incluindo do calendário)
  const allNotifications = [...notifications, ...calendarNotifications];
  const unreadCount = allNotifications.filter((n) => !n.read).length;
  // Avatar
  const avatar = user.fotoUrl ? (
    <img src={user.fotoUrl} alt={user.nome} className="w-10 h-10 rounded-full object-cover border border-blue-200" />
  ) : (
    <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
      {user.nome?.[0] || "U"}
    </span>
  );
  // Sidebar: gap vertical entre topo e primeiro item = pt-14 (56px), item = h-12 (48px), logo deve alinhar com topo do primeiro item
  // Header: alinhar logo+nome com topo do conteúdo da Sidebar (usar mt-2 para compensar header de 64px vs sidebar de 56+48)
  // Dropdown de notificações
  const [notifOpen, setNotifOpen] = useState(false);
  const notifBtnId = "notif-btn";
  // Dropdown de usuário
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuBtnId = "user-menu-btn";
  // Alternância real de tema claro/escuro
  const [themeState, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });
  useEffect(() => {
    if (themeState === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', themeState);
  }, [themeState]);
  function handleThemeToggle() {
    setThemeState(t => t === 'dark' ? 'light' : 'dark');
  }
  return (
    <header className="md:static fixed top-0 left-0 right-0 flex items-center justify-between h-14 md:h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm z-50 w-full gap-2 md:gap-4 px-4 md:px-6" role="banner" aria-label="Cabeçalho principal">
      {/* Mobile: Header simplificado */}
      <div className="flex items-center w-full md:hidden justify-between">
        <div className="flex items-center gap-2">
          <span className="material-icons text-blue-600 dark:text-blue-400 text-2xl">pets</span>
          {/* Nome do sistema opcional no mobile */}
          <span className="font-extrabold text-blue-700 dark:text-blue-300 text-base tracking-tight whitespace-nowrap">Cisne Branco ERP</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Toggle de tema */}
          <button
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-500 text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${themeState === 'dark' ? 'rotate-180' : 'rotate-0'}`}
            title="Alternar tema claro/escuro"
            onClick={handleThemeToggle}
            type="button"
            aria-label="Alternar tema claro/escuro"
          >
            <span className="sr-only">Alternar tema</span>
            {themeState === 'dark' ? (
              <MoonIcon className="w-6 h-6" />
            ) : (
              <SunIcon className="w-6 h-6" />
            )}
          </button>
          {/* Avatar/menu de usuário */}
          <div className="relative">
            <div
              id={userMenuBtnId}
              className="flex items-center cursor-pointer select-none group"
              tabIndex={0}
              aria-haspopup="menu"
              aria-expanded={userMenuOpen}
              aria-controls="dropdown-user-menu"
              aria-label="Menu do usuário"
              onClick={() => setUserMenuOpen((v) => !v)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { setUserMenuOpen((v) => !v); } }}
            >
              {avatar}
            </div>
            <Dropdown open={userMenuOpen} onClose={() => setUserMenuOpen(false)} align="right" labelId={userMenuBtnId}>
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                {avatar}
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-100 text-sm leading-tight">{user.nome}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 leading-tight">{user.cargo}</div>
                </div>
              </div>
              <ul className="py-1">
                <li>
                  <button className="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition text-gray-700 dark:text-gray-200 flex items-center gap-2" tabIndex={0}>
                    <span className="material-icons text-base">person</span> Meu Perfil
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition text-gray-700 dark:text-gray-200 flex items-center gap-2" tabIndex={0}>
                    <span className="material-icons text-base">settings</span> Configurações
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition text-red-600 dark:text-red-400 flex items-center gap-2" tabIndex={0}>
                    <span className="material-icons text-base">logout</span> Sair
                  </button>
                </li>
              </ul>
            </Dropdown>
          </div>
        </div>
      </div>
      {/* Desktop: Header completo */}
      <div className="hidden md:flex items-center justify-between w-full">
        {/* Esquerda: Logo + Nome + Breadcrumbs */}
        <div className="flex items-center min-w-0 flex-shrink-0" style={{ marginLeft: '-1rem' }}>
          <div className="flex items-center gap-2 md:gap-4 pl-0">
            <span className="material-icons text-blue-600 dark:text-blue-400 text-3xl shrink-0">pets</span>
            <span className="font-extrabold text-blue-700 dark:text-blue-300 text-base md:text-lg tracking-tight whitespace-nowrap shrink-0">Cisne Branco ERP</span>
          </div>
          <nav className="flex items-center gap-1 md:gap-2 text-gray-500 dark:text-gray-300 text-xs md:text-sm truncate ml-4" aria-label="Breadcrumb">
            {breadcrumbs.map((bc, i) => (
              <span key={bc.href} className="flex items-center gap-1">
                {i > 0 && <span className="text-gray-300 dark:text-gray-600">&gt;</span>}
                <a
                  href={bc.href}
                  className={
                    i === breadcrumbs.length - 1
                      ? "text-blue-700 dark:text-blue-300 font-semibold truncate cursor-default"
                      : "hover:underline truncate cursor-pointer"
                  }
                  aria-current={i === breadcrumbs.length - 1 ? "page" : undefined}
                  tabIndex={i === breadcrumbs.length - 1 ? -1 : 0}
                  onClick={e => { e.preventDefault(); if (i !== breadcrumbs.length - 1) onBreadcrumb(bc); }}
                >
                  {bc.label}
                </a>
              </span>
            ))}
          </nav>
        </div>
        {/* Centro: Busca global + Favoritos */}
        <div className="flex items-center gap-2 md:gap-4 flex-1 justify-center min-w-0">
          <form className="relative w-40 md:w-64 max-w-full" onSubmit={e => { e.preventDefault(); }} autoComplete="off">
            <span className="material-icons absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-base pointer-events-none">search</span>
            <input
              ref={searchInputRef}
              className="w-full pl-8 pr-3 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition"
              placeholder="Buscar clientes, pets, vendas..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => search && setSearchOpen(true)}
              onKeyDown={handleSearchKey}
              aria-label="Buscar"
              autoComplete="off"
            />
            {searchOpen && (
              <div ref={searchDropdownRef} className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-auto">
                {searchResults.length === 0 ? (
                  <div className="px-4 py-3 text-gray-400 dark:text-gray-500">Nenhum resultado</div>
                ) : (
                  <ul>
                    {searchResults.map((r, i) => (
                      <li
                        key={r.id}
                        className={`px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition ${i === searchActive ? "bg-blue-50 dark:bg-blue-900" : ""}`}
                        onMouseDown={() => { alert("Selecionado: " + r.label); setSearchOpen(false); }}
                      >
                        <span className="material-icons text-base text-blue-400 dark:text-blue-300">{r.type === "cliente" ? "person" : r.type === "pet" ? "pets" : r.type === "venda" ? "point_of_sale" : r.type === "agenda" ? "event" : "inventory_2"}</span>
                        <span>{highlight(r.label, search)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </form>

        </div>
        {/* Direita: Data/hora, Tema, Ajuda, Notificações, Usuário */}
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          {/* Data/hora dinâmica */}
          <span className="text-xs md:text-sm text-gray-400 dark:text-gray-300 whitespace-nowrap font-mono tabular-nums">{formatDate(datetime)}</span>
          {/* Tema */}
          <button
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-500 text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${themeState === 'dark' ? 'rotate-180' : 'rotate-0'}`}
            title="Alternar tema claro/escuro"
            onClick={handleThemeToggle}
            type="button"
            aria-label="Alternar tema claro/escuro"
          >
            <span className="sr-only">Alternar tema</span>
            {themeState === 'dark' ? (
              <MoonIcon className="w-6 h-6" />
            ) : (
              <SunIcon className="w-6 h-6" />
            )}
          </button>
          {/* Ajuda */}
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            title="Ajuda / Suporte"
            onClick={onHelp}
            type="button"
          >
            <span className="material-icons text-lg">help_outline</span>
          </button>
          {/* Notificações */}
          <div className="relative">
            <button
              id={notifBtnId}
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition relative"
              title="Notificações"
              onClick={() => setNotifOpen((v) => !v)}
              type="button"
              aria-haspopup="menu"
              aria-expanded={notifOpen}
              aria-controls="dropdown-notif"
            >
              <span className="material-icons text-lg">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 dark:bg-blue-400 rounded-full border-2 border-white dark:border-gray-900"></span>
              )}
            </button>
            <Dropdown open={notifOpen} onClose={() => setNotifOpen(false)} align="right" labelId={notifBtnId}>
              <div className="font-bold text-gray-700 dark:text-gray-200 px-2 py-1">Notificações</div>
              <ul className="divide-y divide-gray-100 dark:divide-gray-700 max-h-64 overflow-auto">
                {allNotifications.length === 0 && (
                  <li className="px-4 py-3 text-gray-400 dark:text-gray-400">Nenhuma notificação</li>
                )}
                {allNotifications.map((n) => (
                  <li key={n.id} className="px-4 py-2 flex items-start gap-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-800 rounded transition">
                    <span className={`mt-1 material-icons text-base ${n.read ? "text-gray-300 dark:text-gray-700" : n.type === 'calendar' ? "text-green-500 dark:text-green-300" : "text-blue-500 dark:text-blue-300"}`}>
                      {n.type === 'calendar' ? 'event' : n.read ? "notifications_none" : "notifications_active"}
                    </span>
                    <div className="flex-1">
                      <div className={`text-sm ${n.read ? "text-gray-400 dark:text-gray-400" : "text-gray-800 dark:text-gray-100 font-semibold"}`}>{n.title}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-400">
                        {n.type === 'calendar' ? n.time : 'há 1h'}
                      </div>
                      {n.type === 'calendar' && n.message && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{n.message}</div>
                      )}
                    </div>
                    {!n.read && <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 border-2 border-white dark:border-gray-800" />}
                  </li>
                ))}
              </ul>
              <div className="text-right px-2 pt-2">
                <button className="text-xs text-blue-600 dark:text-blue-300 hover:underline" onClick={() => setNotifOpen(false)}>Ver todas</button>
              </div>
            </Dropdown>
          </div>
          {/* Usuário: nome, cargo, foto */}
          <div className="relative">
            <div
              id={userMenuBtnId}
              className="flex items-center gap-2 cursor-pointer select-none group max-w-[120px] md:max-w-xs overflow-hidden"
              tabIndex={0}
              aria-haspopup="menu"
              aria-expanded={userMenuOpen}
              aria-controls="dropdown-user-menu"
              aria-label="Menu do usuário"
              onClick={() => setUserMenuOpen((v) => !v)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { setUserMenuOpen((v) => !v); } }}
            >
              <div className="flex flex-col items-end mr-1 md:mr-2 overflow-hidden">
                <span className="font-semibold text-xs md:text-sm text-gray-800 dark:text-gray-100 leading-tight truncate max-w-[80px] md:max-w-[140px]">{user.nome}</span>
                <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 leading-tight truncate max-w-[80px] md:max-w-[140px]">{user.cargo}</span>
              </div>
              {avatar}
            </div>
            <Dropdown open={userMenuOpen} onClose={() => setUserMenuOpen(false)} align="right" labelId={userMenuBtnId}>
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                {avatar}
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-100 text-sm leading-tight">{user.nome}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 leading-tight">{user.cargo}</div>
                </div>
              </div>
              <ul className="py-1">
                <li>
                  <button className="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition text-gray-700 dark:text-gray-200 flex items-center gap-2" tabIndex={0}>
                    <span className="material-icons text-base">person</span> Meu Perfil
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition text-gray-700 dark:text-gray-200 flex items-center gap-2" tabIndex={0}>
                    <span className="material-icons text-base">settings</span> Configurações
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition text-red-600 dark:text-red-400 flex items-center gap-2" tabIndex={0}>
                    <span className="material-icons text-base">logout</span> Sair
                  </button>
                </li>
              </ul>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
} 