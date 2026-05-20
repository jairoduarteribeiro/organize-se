type GuaranteeSealProps = {
  className?: string;
};

export function GuaranteeSeal({ className = "" }: GuaranteeSealProps) {
  return (
    <aside
      aria-label="7 dias de garantia — satisfação garantida ou seu dinheiro de volta"
      className={[
        "relative mx-auto flex aspect-square min-h-[160px] min-w-[160px] w-44 flex-col items-center justify-center rounded-full border-2 border-dashed border-yellow-300 bg-zinc-950 p-5 text-center text-yellow-300 shadow-[0_0_40px_rgba(250,204,21,0.28)] sm:w-48",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 rounded-full border border-yellow-300/70"
      />
      <p className="relative text-xs font-black uppercase tracking-[0.24em]">
        GARANTIA
      </p>
      <p className="relative mt-1 font-display text-5xl font-black leading-none sm:text-6xl">
        7 DIAS
      </p>
      <p className="relative mt-2 max-w-32 text-[11px] font-bold uppercase leading-4 tracking-[0.08em] text-zinc-100">
        Satisfação garantida ou seu dinheiro de volta
      </p>
    </aside>
  );
}
