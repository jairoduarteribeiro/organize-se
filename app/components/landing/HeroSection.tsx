import Image from "next/image";

import { CTABlock } from "@/app/components/landing/CTABlock";

const heroImages = [
  {
    src: "/images/hero3.png",
    alt: "Workshop Organize-se apresentado em formato vertical para leitura no celular.",
    width: 941,
    height: 1672,
    className: "block h-[42vh] w-full object-cover sm:hidden",
    priority: true,
  },
  {
    src: "/images/hero2.png",
    alt: "Workshop Organize-se com arte vertical otimizada para tablets.",
    width: 1122,
    height: 1402,
    className: "hidden h-auto w-full object-cover sm:block lg:hidden",
    priority: false,
  },
  {
    src: "/images/hero1.png",
    alt: "Workshop Organize-se com Rafaela Ribeiro e chamada para organizar as finanças.",
    width: 1672,
    height: 941,
    className: "hidden h-auto w-full object-cover lg:block",
    priority: false,
  },
] as const;

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="w-full overflow-x-clip bg-zinc-950 text-white"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="w-full bg-zinc-900">
          {heroImages.map((image) => (
            <Image
              alt={image.alt}
              className={image.className}
              decoding={image.priority ? "sync" : "async"}
              fetchPriority={image.priority ? "high" : "auto"}
              height={image.height}
              key={image.src}
              loading={image.priority ? undefined : "lazy"}
              priority={image.priority}
              quality={10}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 100vw, 1280px"
              src={image.src}
              width={image.width}
            />
          ))}
        </div>

        <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-5 py-10 text-center sm:px-8 sm:py-12">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
              Workshop online e ao vivo
            </p>
            <h1
              id="hero-title"
              className="mt-4 text-4xl font-black leading-tight text-white sm:text-6xl"
            >
              Organize-$e: transforme sua relação com o dinheiro em 30 dias.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-8 text-zinc-200">
              Um encontro prático para mulheres que querem sair do caos
              financeiro, criar clareza e fazer o dinheiro finalmente sobrar.
            </p>
          </div>

          <div className="mx-auto w-full max-w-2xl">
            <CTABlock />
          </div>
        </div>
      </div>
    </section>
  );
}
