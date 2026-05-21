"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateSelectedIndex = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    emblaApi.on("select", updateSelectedIndex);
    emblaApi.on("reInit", updateSelectedIndex);

    return () => {
      emblaApi.off("select", updateSelectedIndex);
      emblaApi.off("reInit", updateSelectedIndex);
    };
  }, [emblaApi, updateSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const intervalId = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 10_000);

    return () => window.clearInterval(intervalId);
  }, [emblaApi]);

  return (
    <section
      aria-labelledby="testimonials-title"
      className="w-full overflow-x-clip bg-zinc-950 px-5 py-16 text-white sm:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
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

        <div className="relative mt-10">
          <div
            aria-label="Depoimentos de alunas"
            className="overflow-hidden"
            data-selected-index={selectedIndex}
            data-testid="testimonials-carousel"
            ref={emblaRef}
          >
            <div className="flex touch-pan-y">
              {testimonials.map((testimonial, index) => (
                <div
                  aria-label={`Depoimento ${index + 1} de ${testimonials.length}`}
                  className="min-w-0 flex-[0_0_100%] px-1 sm:px-2"
                  data-testid="testimonial-slide"
                  key={testimonial.src}
                  role="group"
                >
                  <figure className="mx-auto flex min-h-[34rem] w-full max-w-[28rem] items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-white p-2 shadow-2xl shadow-black/30 sm:min-h-[36rem]">
                    <Image
                      alt={testimonial.alt}
                      className="max-h-full w-full rounded-md object-contain"
                      height={testimonial.height}
                      loading="lazy"
                      quality={70}
                      sizes="(max-width: 640px) 100vw, 28rem"
                      src={testimonial.src}
                      width={testimonial.width}
                    />
                  </figure>
                </div>
              ))}
            </div>
          </div>

          <button
            aria-label="Depoimento anterior"
            className="absolute left-0 top-1/2 hidden size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-zinc-950/90 text-white shadow-xl shadow-black/30 transition hover:border-emerald-300 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-zinc-950 md:flex"
            data-testid="testimonials-prev"
            onClick={() => emblaApi?.scrollPrev()}
            type="button"
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <button
            aria-label="Próximo depoimento"
            className="absolute right-0 top-1/2 hidden size-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-zinc-950/90 text-white shadow-xl shadow-black/30 transition hover:border-emerald-300 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-zinc-950 md:flex"
            data-testid="testimonials-next"
            onClick={() => emblaApi?.scrollNext()}
            type="button"
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
