import { CTABlock } from "@/app/components/landing/CTABlock";
import { GuaranteeSeal } from "@/app/components/landing/GuaranteeSeal";

export function PriceBlock() {
  return (
    <section
      aria-labelledby="price-title"
      className="w-full overflow-x-clip bg-zinc-950 px-5 py-16 text-white sm:px-8 lg:px-12"
    >
      <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-yellow-300">
            Workshop ORGANIZE-$E
          </p>
          <h2
            id="price-title"
            className="mt-3 font-display text-3xl font-black leading-tight sm:text-5xl"
          >
            Comece por um valor menor que uma ida ao restaurante.
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-200">
            Você terá 3 horas de conteúdo prático, planilha exclusiva,
            gravação por 6 meses e um plano claro para os próximos 30 dias.
          </p>
        </div>

        <div className="rounded-lg border border-white/15 bg-white/10 p-5 text-center shadow-2xl shadow-black/30 sm:p-7">
          <p className="text-base font-bold uppercase tracking-[0.16em] text-zinc-300">
            Investimento único
          </p>
          <p className="mt-3 font-display text-6xl font-black leading-none text-yellow-300 sm:text-7xl">
            R$ 47
          </p>
          <p className="mt-3 text-base font-semibold leading-7 text-zinc-200">
            Pagamento seguro via Kiwify. Acesso liberado após a confirmação da
            inscrição.
          </p>

          <GuaranteeSeal className="mt-6" />

          <div className="mt-6">
            <CTABlock />
          </div>
        </div>
      </div>
    </section>
  );
}
