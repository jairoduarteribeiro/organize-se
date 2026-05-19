import { CTABlock } from "@/app/components/landing/CTABlock";
import { GuaranteeSeal } from "@/app/components/landing/GuaranteeSeal";

export function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="w-full overflow-x-clip bg-zinc-950 px-5 py-16 text-white sm:px-8 lg:px-12"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 text-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
            Última chamada
          </p>
          <h2 id="final-cta-title" className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
            Entre agora e comece a salvar o seu ano financeiro.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-200">
            Garanta sua vaga no Workshop Organize-$e e tenha um caminho claro
            para sair da desorganização com suporte, método e segurança.
          </p>
        </div>

        <GuaranteeSeal />

        <div className="w-full max-w-2xl">
          <CTABlock />
        </div>
      </div>
    </section>
  );
}
