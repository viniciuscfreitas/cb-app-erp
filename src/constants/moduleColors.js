// Cores dos módulos do sistema
export const MODULE_COLORS = {
  Dashboard: {
    color: "#3B82F6", // Blue
    colorLight: "#DBEAFE",
    colorDark: "#1E3A8A",
    name: "Azul"
  },
  Clientes: {
    color: "#10B981", // Emerald
    colorLight: "#D1FAE5",
    colorDark: "#065F46",
    name: "Verde"
  },
  Pets: {
    color: "#F59E0B", // Amber
    colorLight: "#FEF3C7",
    colorDark: "#92400E",
    name: "Âmbar"
  },
  Agenda: {
    color: "#8B5CF6", // Violet
    colorLight: "#EDE9FE",
    colorDark: "#5B21B6",
    name: "Violeta"
  },
  Estoque: {
    color: "#EF4444", // Red
    colorLight: "#FEE2E2",
    colorDark: "#991B1B",
    name: "Vermelho"
  },
  Vendas: {
    color: "#06B6D4", // Cyan
    colorLight: "#CFFAFE",
    colorDark: "#0E7490",
    name: "Ciano"
  },
  Financeiro: {
    color: "#84CC16", // Lime
    colorLight: "#ECFCCB",
    colorDark: "#3F6212",
    name: "Lima"
  },
  Relatórios: {
    color: "#F97316", // Orange
    colorLight: "#FED7AA",
    colorDark: "#9A3412",
    name: "Laranja"
  }
};

// Array de itens de navegação com cores
export const NAV_ITEMS = [
  { label: "Dashboard", icon: "dashboard", ...MODULE_COLORS.Dashboard },
  { label: "Clientes", icon: "group", ...MODULE_COLORS.Clientes },
  { label: "Pets", icon: "pets", ...MODULE_COLORS.Pets },
  { label: "Agenda", icon: "event", ...MODULE_COLORS.Agenda },
  { label: "Estoque", icon: "inventory_2", ...MODULE_COLORS.Estoque },
  { label: "Vendas", icon: "point_of_sale", ...MODULE_COLORS.Vendas },
  { label: "Financeiro", icon: "account_balance_wallet", ...MODULE_COLORS.Financeiro },
  { label: "Relatórios", icon: "bar_chart", ...MODULE_COLORS.Relatórios },
];

// Função para obter cor de um módulo
export const getModuleColor = (moduleName) => {
  return MODULE_COLORS[moduleName] || MODULE_COLORS.Dashboard;
};

// Função para obter item de navegação
export const getNavItem = (label) => {
  return NAV_ITEMS.find(item => item.label === label) || NAV_ITEMS[0];
}; 