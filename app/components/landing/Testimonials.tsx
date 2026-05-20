"use client";

import Image from "next/image";
import { useRef } from "react";

import { useInView } from "@/app/hooks/useInView";

const testimonials = [
  {
    src: "/images/testimonials/IMG_6269.jpg",
    alt: "Depoimento de aluna sobre o método de organização financeira da Rafaela.",
    width: 695,
    height: 976,
  },
  {
    src: "/images/testimonials/IMG_6270.jpg",
    alt: "Captura de conversa com feedback positivo sobre orientação financeira.",
    width: 795,
    height: 968,
  },
  {
    src: "/images/testimonials/IMG_6271.jpg",
    alt: "Depoimento em mensagem destacando resultado com finanças organizadas.",
    width: 780,
    height: 472,
  },
  {
    src: "/images/testimonials/IMG_6272.jpg",
    alt: "Feedback de aluna sobre clareza e confiança após acompanhamento financeiro.",
    width: 732,
    height: 835,
  },
];

export function Testimonials() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef);

  return (
    <section
      aria-labelledby="testimonials-title"
      className="w-full overflow-x-clip bg-zinc-950 px-5 py-16 text-white sm:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div
          className={`max-w-2xl transition-all duration-500 ${
            headingInView
              ? "is-visible opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          ref={headingRef}
        >
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
            Depoimentos
          </p>
          <h2
            id="testimonials-title"
            className="mt-3 font-display text-3xl font-black leading-tight sm:text-5xl"
          >
            O que estão dizendo sobre transformar a relação com o dinheiro.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.src}
              className="overflow-hidden rounded-lg border border-white/15 bg-white p-2 shadow-2xl shadow-black/30"
            >
              <Image
                alt={testimonial.alt}
                className="h-auto w-full rounded-md object-contain"
                height={testimonial.height}
                loading="lazy"
                quality={70}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                src={testimonial.src}
                width={testimonial.width}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
