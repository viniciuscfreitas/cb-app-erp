import { AppLayout } from "./AppLayout";

export default {
  title: "Layout/AppLayout",
  component: AppLayout,
  argTypes: {
    user: { control: "text" },
    active: {
      control: "select",
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

export const Desktop = {
  args: {
    user: "Dra. Ana Paula",
    active: "Dashboard",
    children: <div className="text-xl font-bold text-blue-700">Conteúdo principal do ERP (Desktop)</div>,
  },
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
};

export const Tablet = {
  args: {
    user: "Dra. Ana Paula",
    active: "Clientes",
    children: <div className="text-lg font-bold text-blue-700">Conteúdo principal do ERP (Tablet)</div>,
  },
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
};

export const Mobile = {
  args: {
    user: "Dra. Ana Paula",
    active: "Pets",
    children: <div className="text-base font-bold text-blue-700">Conteúdo principal do ERP (Mobile)</div>,
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
}; 