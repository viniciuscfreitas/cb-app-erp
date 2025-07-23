import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("não renderiza se totalPages <= 1", () => {
    const { container } = render(<Pagination page={1} totalPages={1} onPageChange={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renderiza botões numerados e navega corretamente", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />);
    // Deve renderizar botões 1 a 5
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByRole("button", { name: `Página ${i}` })).toBeInTheDocument();
    }
    // Botão atual tem aria-current
    expect(screen.getByRole("button", { name: "Página 2" })).toHaveAttribute("aria-current", "page");
    // Navega para página 3
    fireEvent.click(screen.getByRole("button", { name: "Página 3" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("desabilita botões anterior/próximo nas extremidades", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={1} totalPages={3} onPageChange={onPageChange} />);
    expect(screen.getByLabelText("Página anterior")).toBeDisabled();
    expect(screen.getByLabelText("Próxima página")).not.toBeDisabled();
    // Última página
    render(<Pagination page={3} totalPages={3} onPageChange={onPageChange} />);
    expect(screen.getByLabelText("Próxima página")).toBeDisabled();
  });

  it("renderiza elipses para muitas páginas", () => {
    render(<Pagination page={5} totalPages={10} onPageChange={() => {}} />);
    expect(screen.getAllByText("...").length).toBeGreaterThan(0);
  });

  it("chama onPageChange ao clicar em anterior/próximo", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} totalPages={3} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByLabelText("Página anterior"));
    expect(onPageChange).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByLabelText("Próxima página"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("aplica classes de destaque na página ativa", () => {
    render(<Pagination page={2} totalPages={3} onPageChange={() => {}} />);
    const btn = screen.getByRole("button", { name: "Página 2" });
    expect(btn.className).toMatch(/bg-blue-600/);
    expect(btn.className).toMatch(/text-white/);
  });
}); 