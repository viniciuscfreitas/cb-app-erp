import React from "react";

const colors = [
  { name: "Azul principal", value: "#2196F3" },
  { name: "Azul claro", value: "#E3F2FD" },
  { name: "Branco", value: "#FFFFFF" },
  { name: "Cinza claro", value: "#F5F5F5" },
  { name: "Cinza médio", value: "#BDBDBD" },
  { name: "Preto suave", value: "#222" },
];

const spacings = [
  { name: "xs", value: "0.5rem" },
  { name: "sm", value: "1rem" },
  { name: "md", value: "1.5rem" },
  { name: "lg", value: "2rem" },
  { name: "xl", value: "3rem" },
];

const radii = [
  { name: "sm", value: "0.25rem" },
  { name: "md", value: "0.5rem" },
  { name: "lg", value: "1rem" },
];

export function BrandGuide() {
  return (
    <div className="p-4 space-y-8 max-w-full">
      <section>
        <h2 className="text-xl font-bold mb-2">Paleta de Cores</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {colors.map((c) => (
            <div key={c.value} className="flex flex-col items-center min-w-[80px]">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border" style={{ background: c.value }} />
              <span className="mt-2 text-xs md:text-sm text-center break-words">{c.name}</span>
              <span className="text-[10px] md:text-xs text-gray-500">{c.value}</span>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2">Fontes</h2>
        <div className="space-y-2">
          <div className="font-sans text-base md:text-lg">Fonte principal: Poppins, Nunito ou Inter (sans-serif)</div>
          <div className="font-bold text-base md:text-lg">Exemplo Bold</div>
          <div className="italic text-base md:text-lg">Exemplo Itálico</div>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2">Espaçamentos</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {spacings.map((s) => (
            <div key={s.name} className="flex flex-col items-center min-w-[60px]">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-200" style={{ margin: s.value }} />
              <span className="mt-2 text-xs md:text-sm">{s.name}</span>
              <span className="text-[10px] md:text-xs text-gray-500">{s.value}</span>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2">Bordas Arredondadas</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {radii.map((r) => (
            <div key={r.name} className="flex flex-col items-center min-w-[60px]">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-100" style={{ borderRadius: r.value }} />
              <span className="mt-2 text-xs md:text-sm">{r.name}</span>
              <span className="text-[10px] md:text-xs text-gray-500">{r.value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 