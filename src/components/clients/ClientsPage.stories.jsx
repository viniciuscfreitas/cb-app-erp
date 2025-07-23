import React from "react";
import { ClientsPage } from "./ClientsPage";
import { ClientList } from "./ClientList";

const mockClients = [
  { nome: "Vinícius do Carmo", email: "vinicius@email.com", telefone: "(13) 97402-3753" },
  { nome: "Ana Paula", email: "ana@email.com", telefone: "(11) 91234-5678" },
  { nome: "Carlos Silva", email: "carlos@email.com", telefone: "(21) 99876-5432" },
];

export default {
  title: "ERP/Clientes/ClientsPage",
  component: ClientsPage,
};

export function Padrao() {
  return <ClientsPage />;
}

export function Responsivo() {
  return (
    <div className="max-w-xs md:max-w-md mx-auto">
      <ClientsPage />
    </div>
  );
}

export function TabelaDesktop() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <ClientList clients={mockClients} />
    </div>
  );
} 