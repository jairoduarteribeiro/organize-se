"use client";

import { useRef } from "react";

import { useInView } from "@/app/hooks/useInView";
import { KIWIFY_URL } from "@/app/lib/constants";

const painPoints = [
  "💸 Não tem uma reserva financeira e sente que nunca consegue guardar nada.",
  "🧾 Paga a fatura do cartão, mas logo fica sem dinheiro e precisa usá-lo de novo durante o mês.",
  "🪙 Até sobra dinheiro, mas não sabe como organizar ou o que fazer com ele.",
  "😩 Mesmo sem dívidas, o dinheiro nunca sobra no fim do mês.",
  "💼 Ganha bem, mas não consegue manter a disciplina financeira.",
  "🔁 Já tentou planilhas e cursos sozinha, mas não conseguiu manter a constância.",
  "✨ Tem sonhos e metas para 2026 que ainda não saíram do papel.",
];

export function PainQualifier() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef);

  return (
    <section
      aria-labelledby="pain-qualifier-title"
      className="w-full overflow-x-clip bg-white px-5 py-16 text-zinc-950 sm:px-8 lg:px-12"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <div
          className={`max-w-3xl transition-all duration-500 ${
            headingInView
              ? "is-visible opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          ref={headingRef}
        >
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
            Para quem é este workshop
          </p>
          <h2
            id="pain-qualifier-title"
            className="mt-3 text-3xl font-black leading-tight sm:text-5xl"
          >
            Para você que está cansada de ver o dinheiro escorrendo pelos dedos.
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-700">
            Se você não aprendeu sobre dinheiro na escola e hoje se sente incapaz
            de cuidar das suas contas por não ter um método claro, este lugar é
            seu.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2" aria-label="Situações financeiras comuns">
          {painPoints.map((painPoint) => (
            <li
              key={painPoint}
              className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 text-lg font-semibold leading-7 text-zinc-900 shadow-sm"
            >
              {painPoint}
            </li>
          ))}
        </ul>

        <div className="rounded-lg bg-zinc-950 p-6 text-white sm:p-8">
          <p className="text-xl font-bold leading-8">
            Se você leu essa lista e pensou “é exatamente o meu caso”, o
            Organize-$e é o seu próximo passo para salvar o seu ano.
          </p>
          <a
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-emerald-400 px-6 py-3 text-center text-base font-black uppercase text-zinc-950 transition-colors hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 sm:w-auto"
            href={KIWIFY_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            Quero garantir meu ingresso
          </a>
        </div>
      </div>
    </section>
  );
}
