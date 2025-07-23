import { Button } from "./Button";

const CheckIcon = (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 10.5L9 14.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default {
  title: "ERP/Componentes/Botão",
  component: Button,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    children: { control: "text" },
    loading: { control: "boolean" },
    iconPosition: { control: { type: "select" }, options: ["start", "end"] },
  },
};

export const Primario = {
  args: {
    variant: "primary",
    size: "md",
    children: "Salvar",
  },
};

export const Secundario = {
  args: {
    variant: "secondary",
    size: "md",
    children: "Cancelar",
  },
};

export const Pequeno = {
  args: {
    variant: "primary",
    size: "sm",
    children: "Pequeno",
  },
};

export const Grande = {
  args: {
    variant: "primary",
    size: "lg",
    children: "Grande",
  },
};

export const Loading = {
  args: {
    variant: "primary",
    size: "md",
    children: "Carregando...",
    loading: true,
  },
};

export const IconeEsquerda = {
  args: {
    variant: "primary",
    size: "md",
    children: "Com Ícone",
    icon: CheckIcon,
    iconPosition: "start",
  },
};

export const IconeDireita = {
  args: {
    variant: "primary",
    size: "md",
    children: "Com Ícone",
    icon: CheckIcon,
    iconPosition: "end",
  },
};

export const LoadingComIcone = {
  args: {
    variant: "primary",
    size: "md",
    children: "Salvando...",
    loading: true,
    icon: CheckIcon,
    iconPosition: "start",
  },
};

export const FocoEFeedback = {
  args: {
    variant: "primary",
    size: "md",
    children: "Acessível (Tab, Hover, Active, Focus)",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Teste o foco navegando por Tab, e o feedback visual (hover, active, focus) em mobile/tablet/desktop.",
      },
    },
  },
}; 