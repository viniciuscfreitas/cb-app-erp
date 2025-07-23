import React, { useState } from "react";
import { Pagination } from "./Pagination";

export default {
  title: "UI/Pagination",
  component: Pagination,
  argTypes: {
    page: { control: { type: "number", min: 1 } },
    totalPages: { control: { type: "number", min: 1 } },
    variant: { control: { type: "select" }, options: ["default", "compact"] },
  },
};

export const PaginaUnica = {
  args: {
    page: 1,
    totalPages: 1,
  },
};

export const MultiplasPaginasInicio = {
  args: {
    page: 1,
    totalPages: 7,
  },
};

export const MultiplasPaginasMeio = {
  args: {
    page: 4,
    totalPages: 7,
  },
};

export const MultiplasPaginasFim = {
  args: {
    page: 7,
    totalPages: 7,
  },
};

export const Compacta = {
  args: {
    page: 2,
    totalPages: 4,
    variant: "compact",
  },
};

// Story interativo para testar navegação
function InteractivePaginationStory(args) {
  const [page, setPage] = useState(args.page || 1);
  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination {...args} page={page} onPageChange={setPage} />
      <div className="text-sm text-gray-500">Página atual: {page}</div>
    </div>
  );
}

export const Interativo = {
  render: (args) => <InteractivePaginationStory {...args} />,
  args: {
    page: 1,
    totalPages: 12,
  },
}; 