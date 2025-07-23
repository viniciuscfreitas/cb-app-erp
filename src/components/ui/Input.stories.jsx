import React, { useState } from "react";
import { Input } from "./Input";

export default {
  title: "ERP/Componentes/Input",
  component: Input,
};

export function Padrao() {
  const [value, setValue] = useState("");
  return <Input label="Nome" placeholder="Digite seu nome" value={value} onChange={e => setValue(e.target.value)} />;
}

export function ComIcone() {
  const [value, setValue] = useState("");
  return <Input label="E-mail" placeholder="Digite seu e-mail" icon="email" value={value} onChange={e => setValue(e.target.value)} type="email" />;
}

export function Erro() {
  const [value, setValue] = useState("");
  return <Input label="Telefone" placeholder="(99) 99999-9999" value={value} onChange={e => setValue(e.target.value)} error={value.length < 14 ? "Telefone inválido" : undefined} />;
}

export function Desabilitado() {
  return <Input label="Desabilitado" placeholder="Campo desabilitado" value="" onChange={() => {}} disabled />;
}

export function HelpText() {
  const [value, setValue] = useState("");
  return <Input label="Senha" placeholder="Digite sua senha" type="password" value={value} onChange={e => setValue(e.target.value)} helpText="Mínimo 8 caracteres" />;
}

export function Tipos() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  return (
    <div className="space-y-4">
      <Input label="E-mail" type="email" placeholder="email@exemplo.com" value={email} onChange={e => setEmail(e.target.value)} icon="email" />
      <Input label="Senha" type="password" placeholder="Digite sua senha" value={senha} onChange={e => setSenha(e.target.value)} icon="lock" />
    </div>
  );
} 