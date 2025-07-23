import React from "react";
import { ClientForm } from "./ClientForm";

export default {
  title: "ERP/Clientes/ClientForm",
  component: ClientForm,
};

export function Padrao() {
  return <ClientForm />;
}

export function ComCallback() {
  return <ClientForm onSave={data => alert(`Cliente salvo: ${JSON.stringify(data)}`)} />;
}

export function Responsivo() {
  return (
    <div className="max-w-xs md:max-w-md mx-auto">
      <ClientForm onSave={data => alert(`Cliente salvo: ${JSON.stringify(data)}`)} />
    </div>
  );
} 