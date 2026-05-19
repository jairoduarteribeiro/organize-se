"use client";

import { useActionState } from "react";

import {
  submitWaitlistEmail,
  type WaitlistActionResult,
} from "@/app/actions/waitlist";

const defaultInitialState: WaitlistActionResult = {
  success: false,
};

type WaitlistFormProps = {
  initialState?: WaitlistActionResult;
};

export function WaitlistForm({ initialState = defaultInitialState }: WaitlistFormProps) {
  const [state, formAction, pending] = useActionState(submitWaitlistEmail, initialState);
  const messageId = "waitlist-form-message";

  return (
    <form
      action={formAction}
      aria-describedby={state.error || state.success ? messageId : undefined}
      className="w-full rounded-lg border border-white/15 bg-white/10 p-4 text-white shadow-lg shadow-black/20 sm:p-5"
      noValidate
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="min-w-0 flex-1">
          <label className="sr-only" htmlFor="waitlist-email">
            Email para lista de espera
          </label>
          <input
            aria-label="Email para lista de espera"
            className="min-h-12 w-full rounded-md border border-white/20 bg-white px-4 py-3 text-base font-semibold text-zinc-950 placeholder:text-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-200"
            id="waitlist-email"
            inputMode="email"
            name="email"
            placeholder="Seu melhor email"
            required
            style={{ minHeight: "48px" }}
            type="email"
          />
        </div>

        <button
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-yellow-300 px-5 py-3 text-center text-sm font-black uppercase text-zinc-950 transition-colors hover:bg-yellow-200 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-600 sm:w-auto"
          disabled={pending}
          style={{ minHeight: "48px" }}
          type="submit"
        >
          {pending ? "Enviando..." : "Entrar na lista"}
        </button>
      </div>

      {state.error ? (
        <p
          aria-live="polite"
          className="mt-3 text-sm font-bold text-red-200"
          id={messageId}
          role="alert"
        >
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <p
          aria-live="polite"
          className="mt-3 text-sm font-bold text-emerald-200"
          id={messageId}
        >
          Pronto, você entrou na lista de espera. Avisaremos quando a próxima turma abrir.
        </p>
      ) : null}
    </form>
  );
}
