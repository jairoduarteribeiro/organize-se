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
            src="/images/sobre-rafa.jpg"
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
            <h2
              id="bio-title"
              className="mt-3 font-display text-3xl font-black leading-tight sm:text-5xl"
            >
              Rafaela Ribeiro
            </h2>
            <p className="mt-3 text-lg font-bold text-zinc-800">
              Educadora Financeira, Mentora e Empresária
            </p>
          </div>
          <div className="mt-6 space-y-5 text-lg leading-8 text-zinc-700">
            <p>Tenho 32 anos, sou nordestina, de Fortaleza – Ceará, e hoje moro em Portugal há 4 anos, ao lado do meu marido.</p>
            <p>Sou formada em Administração, Educadora Financeira e Mentora de mulheres pelo mundo.</p>
            <p>A educação financeira transformou a minha vida, e hoje ensino mulheres a conquistarem uma vida melhor através dela.</p>
            <p>Já ajudei dezenas de mulheres a organizarem suas finanças, saírem do sufoco e realizarem seus sonhos com mais liberdade e segurança.</p>
          </div>
          <a
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-md border-2 border-zinc-950 px-5 py-3 text-base font-black text-zinc-950 transition-colors hover:bg-zinc-950 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
            href={INSTAGRAM_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#ig-gradient)"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              width={18}
              height={18}
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="ig-gradient"
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#E1306C" />
                  <stop offset="100%" stopColor="#833AB4" />
                </linearGradient>
              </defs>
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            @rafaelaribeirofinancas
          </a>
        </div>
      </div>
    </section>
  );
}
