import React from "react";
import { Card } from "./Card";
import { Input } from "./Input";

export default {
  title: "ERP/Componentes/Card",
  component: Card,
};

export function Simples() {
  return <Card>Conteúdo simples do card.</Card>;
}

export function ComTitulo() {
  return <Card title="Resumo">Card com título e conteúdo.</Card>;
}

export function ComIcone() {
  return <Card title="Clientes" icon="group">Card com ícone e título.</Card>;
}

export function ComAcoes() {
  return <Card title="Ações" actions={<button className="text-blue-600 font-bold">Ver todos</button>}>Card com botão de ação.</Card>;
}

export function Filled() {
  return <Card title="Destaque" variant="filled">Card variante filled (fundo colorido).</Card>;
}

export function Responsivo() {
  return (
    <div className="max-w-xs md:max-w-md mx-auto">
      <Card title="Responsivo" icon="pets" actions={<button className="text-blue-600 font-bold">Acessar</button>}>
        <div className="space-y-2">
          <Input label="Nome do pet" placeholder="Digite o nome" icon="pets" value="" onChange={() => {}} />
          <Input label="Raça" placeholder="Digite a raça" value="" onChange={() => {}} />
        </div>
      </Card>
    </div>
  );
}

export function AcaoIcone() {
  return (
    <Card title="Editar Cliente" actions={
      <button aria-label="Editar" className="text-blue-600 hover:text-blue-800 focus:outline-none">
        <span className="material-icons">edit</span>
      </button>
    }>
      Card com ação de ícone (mobile friendly).
    </Card>
  );
}

export function AcaoTexto() {
  return (
    <Card title="Ver Detalhes" actions={
      <button className="text-blue-600 font-bold">Ver</button>
    }>
      Card com ação de texto.
    </Card>
  );
}

export function AcaoIconeTexto() {
  return (
    <Card title="Excluir Cliente" actions={
      <button className="text-red-600 font-bold flex items-center gap-1" aria-label="Excluir">
        <span className="material-icons">delete</span>
        Excluir
      </button>
    }>
      Card com ação de ícone + texto (recomendado para ações destrutivas).
    </Card>
  );
} 