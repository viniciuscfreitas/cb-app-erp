import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ClientsPage } from "./ClientsPage";

function preencherClientes(qtd) {
  return Array.from({ length: qtd }, (_, i) => ({
    nome: `Cliente ${i + 1}`,
    email: `cliente${i + 1}@exemplo.com`,
    telefone: `119999900${i + 1}`,
  }));
}

describe("ClientsPage - Paginação", () => {
  it("exibe apenas os clientes da página atual", () => {
    // Mock inicial com 25 clientes
    const clientes = preencherClientes(25);
    // Renderizar página e simular cadastro
    render(<ClientsPage />);
    // Adicionar clientes
    const inputNome = screen.getByLabelText(/nome/i);
    const inputEmail = screen.getByLabelText(/e-mail/i);
    const inputTel = screen.getByLabelText(/telefone/i);
    const btnSalvar = screen.getByRole("button", { name: /salvar/i });
    clientes.forEach(c => {
      fireEvent.change(inputNome, { target: { value: c.nome } });
      fireEvent.change(inputEmail, { target: { value: c.email } });
      fireEvent.change(inputTel, { target: { value: c.telefone } });
      fireEvent.click(btnSalvar);
    });
    // Deve exibir apenas 10 clientes na página 1
    expect(screen.getAllByText(/Cliente \d+/).length).toBe(10);
    // Navegar para página 2
    fireEvent.click(screen.getByRole("button", { name: "Página 2" }));
    // Deve exibir clientes 11 a 20
    expect(screen.getByText("Cliente 11")).toBeInTheDocument();
    expect(screen.getByText("Cliente 20")).toBeInTheDocument();
    expect(screen.queryByText("Cliente 1")).not.toBeInTheDocument();
  });

  it("reset para página 1 ao buscar", () => {
    const clientes = preencherClientes(15);
    render(<ClientsPage />);
    const inputNome = screen.getByLabelText(/nome/i);
    const inputEmail = screen.getByLabelText(/e-mail/i);
    const inputTel = screen.getByLabelText(/telefone/i);
    const btnSalvar = screen.getByRole("button", { name: /salvar/i });
    clientes.forEach(c => {
      fireEvent.change(inputNome, { target: { value: c.nome } });
      fireEvent.change(inputEmail, { target: { value: c.email } });
      fireEvent.change(inputTel, { target: { value: c.telefone } });
      fireEvent.click(btnSalvar);
    });
    // Ir para página 2
    fireEvent.click(screen.getByRole("button", { name: "Página 2" }));
    // Buscar por "Cliente 1"
    fireEvent.change(screen.getByPlaceholderText(/buscar cliente/i), { target: { value: "Cliente 1" } });
    // Deve resetar para página 1 e exibir "Cliente 1"
    expect(screen.getByText("Cliente 1")).toBeInTheDocument();
    // Não deve exibir clientes de outras páginas
    expect(screen.queryByText("Cliente 11")).not.toBeInTheDocument();
  });
}); 