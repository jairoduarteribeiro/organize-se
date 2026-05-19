"use client";

import Image from "next/image";
import { useRef } from "react";

import { useInView } from "@/app/hooks/useInView";
import { INSTAGRAM_URL } from "@/app/lib/constants";

export function BioSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef);

  return (
    <section
      aria-labelledby="bio-title"
      className="w-full overflow-x-clip bg-white px-5 py-16 text-zinc-950 sm:px-8 lg:px-12"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="mx-auto w-full max-w-md overflow-hidden rounded-lg bg-zinc-100 shadow-xl shadow-zinc-200/80">
          <Image
            alt="Rafaela Ribeiro, educadora financeira do Workshop Organize-se."
            className="h-auto w-full object-cover"
            height={1254}
            loading="lazy"
            quality={70}
            sizes="(max-width: 1024px) 100vw, 40vw"
            src="/images/rafa.png"
            width={1254}
          />
        </div>

        <div className="min-w-0">
          <div
            className={`transition-all duration-500 ${
              headingInView
                ? "is-visible opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            ref={headingRef}
          >
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
              Quem vai te guiar nesta jornada
            </p>
            <h2 id="bio-title" className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
              Rafaela Ribeiro
            </h2>
            <p className="mt-3 text-lg font-bold text-zinc-800">
              Educadora Financeira, Mentora e Empresária
            </p>
          </div>
          <div className="mt-6 space-y-5 text-lg leading-8 text-zinc-700">
            <p>
              Nordestina de Fortaleza e morando em Portugal há mais de 4 anos,
              Rafaela tem 32 anos e uma missão clara: transformar a vida
              financeira de mulheres pelo mundo.
            </p>
            <p>
              Formada em Administração e especialista em Finanças Pessoais,
              ajuda mulheres a conquistarem independência, segurança e liberdade
              através da organização. Com sua metodologia prática e acolhedora,
              já ajudou dezenas de mulheres no Brasil e na Europa a saírem do
              sufoco e darem os primeiros passos rumo à reserva financeira.
            </p>
          </div>
          <blockquote className="mt-8 border-l-4 border-emerald-500 pl-5 text-xl font-bold leading-8 text-zinc-950">
            “Eu acredito que toda mulher pode ser dona do seu dinheiro e viver
            com leveza, propósito e prosperidade.”
          </blockquote>
          <a
            className="mt-6 inline-flex min-h-12 items-center rounded-md border-2 border-zinc-950 px-5 py-3 text-base font-black text-zinc-950 transition-colors hover:bg-zinc-950 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
            href={INSTAGRAM_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            @rafaelaribeirofinancas
          </a>
        </div>
      </div>
    </section>
  );
}
