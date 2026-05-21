"use client";

import { WaitlistForm } from "@/app/components/landing/WaitlistForm";
import { useCountdown } from "@/app/hooks/useCountdown";
import { EVENT_UTC, KIWIFY_URL } from "@/app/lib/constants";

const countdownLabels = {
  days: "dias",
  hours: "horas",
  minutes: "minutos",
  seconds: "segundos",
} as const;

function formatCountdownUnit(value: number) {
  return value.toString().padStart(2, "0");
}

export function CTABlock() {
  const countdown = useCountdown(EVENT_UTC);

  if (countdown.isExpired) {
    return <WaitlistForm />;
  }

  const countdownItems = [
    ["days", countdown.days],
    ["hours", countdown.hours],
    ["minutes", countdown.minutes],
    ["seconds", countdown.seconds],
  ] as const;

  return (
    <div className="w-full overflow-x-clip">
      <div
        aria-label="Contagem regressiva para o workshop"
        className="grid grid-cols-4 gap-2 text-center sm:gap-3"
      >
        {countdownItems.map(([unit, value]) => (
          <div
            className="min-w-0 rounded-lg border border-white/15 bg-white/10 px-0 py-3 text-white sm:px-2"
            key={unit}
          >
            <span
              className="block text-2xl font-black tabular-nums leading-none sm:text-4xl"
              suppressHydrationWarning
            >
              {formatCountdownUnit(value)}
            </span>
            <span className="mt-2 block text-[8px] font-bold uppercase tracking-normal text-white/75 min-[360px]:text-[10px] sm:text-xs sm:tracking-[0.12em]">
              {countdownLabels[unit]}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-center text-sm font-semibold text-white/75">
        28 de junho, 10h, horário de Brasília
      </p>

      <a
        className="animate-scale-pulse mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-yellow-300 px-6 py-3 text-center text-base font-black uppercase text-zinc-950 shadow-lg shadow-yellow-300/20 transition-all duration-150 hover:animate-none hover:scale-[1.02] hover:bg-yellow-200 hover:shadow-xl hover:shadow-yellow-300/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-200"
        href={KIWIFY_URL}
        rel="noopener noreferrer"
        style={{ minHeight: "48px" }}
        target="_blank"
      >
        Quero garantir meu ingresso
      </a>
    </div>
  );
}
