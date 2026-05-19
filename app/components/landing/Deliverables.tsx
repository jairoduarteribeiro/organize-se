"use client";

import { useRef } from "react";

import { useInView } from "@/app/hooks/useInView";

const deliverables = [
  {
    title: "Aulas práticas",
    description:
      "Para entender como sair do caos financeiro e ver seu dinheiro finalmente sobrar.",
  },
  {
    title: "Planilha exclusiva",
    description: "O método pronto para o seu controle financeiro.",
  },
  {
    title: "Momento Q&A",
    description: "Perguntas e respostas ao vivo diretamente comigo.",
  },
  {
    title: "Clareza e Direção",
    description: "O plano para você organizar sua vida nos próximos 30 dias.",
  },
];

const logistics = [
  { label: "Data", value: "28 de Junho" },
  { label: "Duração", value: "Das 10h às 13h — 3 horas de conteúdo intensivo" },
  { label: "Plataforma", value: "Online e ao vivo pelo Google Meet" },
];

export function Deliverables() {
  const headingRef = useRef<HTMLDivElement>(null);
  const checklistRef = useRef<HTMLUListElement>(null);
  const headingInView = useInView(headingRef);
  const checklistInView = useInView(checklistRef);

  return (
    <section
      aria-labelledby="deliverables-title"
      className="w-full overflow-x-clip bg-zinc-950 px-5 py-16 text-white sm:px-8 lg:px-12"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <div
            className={`transition-all duration-500 ${
              headingInView
                ? "is-visible opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            ref={headingRef}
          >
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
              O que você vai encontrar
            </p>
            <h2
              id="deliverables-title"
              className="mt-3 text-3xl font-black leading-tight sm:text-5xl"
            >
              Um encontro prático para organizar os próximos 30 dias.
            </h2>
          </div>

          <dl className="mt-8 grid gap-4">
            {logistics.map((item) => (
              <div className="rounded-lg border border-white/15 bg-white/10 p-4" key={item.label}>
                <dt className="text-sm font-black uppercase tracking-[0.16em] text-yellow-300">
                  {item.label}
                </dt>
                <dd className="mt-1 text-lg font-semibold leading-7 text-white">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-lg bg-white p-5 text-zinc-950 sm:p-7">
          <p className="text-xl font-black">Durante esse encontro, você terá:</p>
          <ul
            className="mt-6 grid gap-4"
            aria-label="Entregáveis do workshop"
            ref={checklistRef}
          >
            {deliverables.map((deliverable, index) => (
              <li
                className={`delay-${(index + 1) * 100} flex gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 transition-all duration-500 ${
                  checklistInView
                    ? "is-visible opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                data-testid="deliverable-item"
                key={deliverable.title}
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-lg font-black text-zinc-950"
                >
                  ✓
                </span>
                <span>
                  <span className="block text-lg font-black">{deliverable.title}</span>
                  <span className="mt-1 block text-base leading-7 text-zinc-700">
                    {deliverable.description}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
