const faqItems = [
  {
    question: "🧭 O que é o evento e o que vou aprender?",
    answer:
      "O Workshop ORGANIZE-$E é um evento online e prático. Você vai sair da desorganização com um plano real para fazer seu dinheiro sobrar e organizar suas finanças.",
  },
  {
    question: "🎥 O evento terá gravação?",
    answer:
      "Sim! Você terá acesso à gravação por 6 meses para assistir quantas vezes quiser, no seu ritmo.",
  },
  {
    question: "⏰ E se eu não puder participar ao vivo?",
    answer:
      "Não tem problema! A gravação ficará disponível na área de membros para você não perder nenhum detalhe do conteúdo.",
  },
  {
    question: "📅 Quando será o evento?",
    answer:
      "Acontecerá no dia 28 de Junho, das 10h às 13h (horário de Brasília), de forma 100% online. Serão 3 horas de conteúdo intensivo focado em resultados.",
  },
  {
    question: "💸 Tem garantia?",
    answer:
      "Sim! Você tem 7 dias de garantia. Se decidir que o conteúdo não é para você, devolvemos seu dinheiro integralmente via Kiwify.",
  },
];

export function FaqAccordion() {
  return (
    <section
      aria-labelledby="faq-title"
      className="w-full overflow-x-clip bg-white px-5 py-16 text-zinc-950 sm:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-4xl">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
          Perguntas frequentes
        </p>
        <h2
          id="faq-title"
          className="mt-3 font-display text-3xl font-black leading-tight sm:text-5xl"
        >
          Suas dúvidas podem ser respondidas aqui.
        </h2>

        <div className="mt-10 space-y-4">
          {faqItems.map((item) => (
            <details
              className="group rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4"
              key={item.question}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-black leading-7 text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="chevron shrink-0 text-2xl leading-none text-emerald-700 transition-transform duration-300 group-open:rotate-180"
                >
                  ⌄
                </span>
              </summary>
              <div className="answer max-h-0 overflow-hidden transition-[max-height] duration-300 ease-out group-open:max-h-96">
                <p className="pt-4 text-base leading-7 text-zinc-700">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
