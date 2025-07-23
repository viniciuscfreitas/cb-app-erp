import React from "react";
import { ClientList } from "./ClientList";

const mockClients = [
  { nome: "Vinícius do Carmo", email: "vinicius@email.com", telefone: "(13) 97402-3753" },
  { nome: "Ana Paula", email: "ana@email.com", telefone: "(11) 91234-5678" },
  { nome: "Carlos Silva", email: "carlos@email.com", telefone: "(21) 99876-5432" },
];

export default {
  title: "ERP/Clientes/ClientList",
  component: ClientList,
};

export function ListaVazia() {
  return <ClientList clients={[]} />;
}

export function ListaComClientes() {
  return <ClientList clients={mockClients} />;
}

export function Responsivo() {
  return (
    <div className="max-w-xs md:max-w-md mx-auto">
      <ClientList clients={mockClients} />
    </div>
  );
}

export function ComAcoes() {
  return (
    <ClientList
      clients={mockClients}
      onEdit={c => alert(`Editar: ${c.nome}`)}
      onDelete={c => alert(`Excluir: ${c.nome}`)}
    />
  );
} 