type GuaranteeSealProps = {
  className?: string;
};

export function GuaranteeSeal({ className = "" }: GuaranteeSealProps) {
  return (
    <aside
      aria-label="Garantia de satisfação"
      className={[
        "w-full rounded-lg border-2 border-yellow-300 bg-zinc-950 p-5 text-center text-white shadow-[0_0_40px_rgba(250,204,21,0.28)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className="text-sm font-black uppercase tracking-[0.18em] text-yellow-300">
        Risco zero
      </p>
      <p className="mt-2 font-display text-2xl font-black leading-tight text-emerald-300 sm:text-3xl">
        7 dias de garantia
      </p>
      <p className="mx-auto mt-2 max-w-xl text-base font-semibold leading-7 text-zinc-100">
        Satisfação garantida ou seu dinheiro de volta.
      </p>
    </aside>
  );
}
