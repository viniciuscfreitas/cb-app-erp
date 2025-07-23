import { BottomNav } from "./BottomNav";

export default {
  title: "Layout/BottomNav",
  component: BottomNav,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  argTypes: {
    active: {
      control: { type: "select" },
      options: [
        "Dashboard",
        "Clientes",
        "Pets",
        "Agenda",
        "Estoque",
        "Vendas",
        "Financeiro",
        "Relatórios",
      ],
    },
  },
};

export const MobileDashboard = {
  args: {
    active: "Dashboard",
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

export const MobileClientes = {
  args: {
    active: "Clientes",
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

export const TabletDashboard = {
  args: {
    active: "Dashboard",
  },
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
}; 