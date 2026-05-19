# Dependencies for `landing-page-v1`

## Resultado da análise

Você **não precisa instalar novas dependências de aplicação** para executar as tasks `01` a `08`.

O stack base da landing page já está previsto no repositório e na documentação da task:

- `Next.js 16.2.6`
- `React 19.2.4`
- `React DOM 19.2.4`
- `TypeScript 5`
- `Tailwind CSS v4`
- `ESLint 9`

Essas dependências já aparecem no `package.json`. O projeto também usa `bun.lock`, então o gerenciador de pacotes esperado aqui é **Bun**.

Você **precisa instalar dependências adicionais de tooling** antes de executar:

- `task_09` (`Playwright Test Suite`)
- `task_10` (`Lighthouse Audit & Performance Tuning`)

## O que instalar

| Dependência | Obrigatória? | Motivo | Quando instalar |
| --- | --- | --- | --- |
| Bun | Sim | O repositório usa `bun.lock` e as instalações devem ser feitas com Bun | Antes de qualquer task |
| Dependências do projeto (`bun install`) | Sim | Instala `next`, `react`, `tailwind`, `typescript`, `eslint` e o restante do projeto | Antes de qualquer task |
| `@playwright/test` | Sim | Necessária para a `task_09` | Antes da `task_09` |
| Navegadores do Playwright | Sim | O Playwright precisa baixar os browsers que usa nos testes | Antes da `task_09` |
| `lighthouse` | Sim | Necessária para a `task_10`; também pode cobrir a checagem de acessibilidade da `task_09` | Antes da `task_10` |
| Google Chrome | Recomendado | O Lighthouse CLI precisa de uma instalação local do Chrome | Antes da `task_10` |
| `axe-playwright` | Opcional | Só é necessário se você quiser usar `axe-playwright` em vez de Lighthouse na checagem de acessibilidade da `task_09` | Opcional |
| Vercel CLI | Opcional | Útil para deploy e inspeção de logs, mas **não é necessária** para executar as tasks localmente | Só antes de deploy/ops |

## Instalação no macOS

### 1. Instalar Bun

Opção recomendada com Homebrew:

```bash
brew install oven-sh/bun/bun
```

Alternativa oficial:

```bash
curl -fsSL https://bun.sh/install | bash
```

Verifique:

```bash
bun --version
```

### 2. Instalar as dependências já declaradas no projeto

Na raiz do repositório:

```bash
bun install
```

### 3. Instalar o tooling de testes para a `task_09`

```bash
bun add -d @playwright/test
bunx playwright install
```

Se quiser limitar aos navegadores realmente usados no projeto, você pode instalar só Chromium:

```bash
bunx playwright install chromium
```

### 4. Instalar o tooling de auditoria para a `task_10`

```bash
bun add -d lighthouse
```

O Lighthouse CLI usa uma instalação local do Google Chrome. Se você já tem Chrome no macOS, isso normalmente já resolve esse requisito.

### 5. Opcional: usar `axe-playwright` na acessibilidade da `task_09`

Não é obrigatório porque a própria task aceita `axe-playwright` **ou** Lighthouse.

```bash
bun add -d axe-playwright
```

### 6. Opcional: instalar a Vercel CLI

Instale apenas se você for fazer deploy, rodar o projeto com comportamento próximo ao ambiente da Vercel ou consultar logs da waitlist.

```bash
pnpm i -g vercel
```

## Ordem recomendada

```bash
brew install oven-sh/bun/bun
bun install
bun add -d @playwright/test lighthouse
bunx playwright install chromium
```

## O que eu recomendo antes de rodar as tasks

Instale apenas o mínimo necessário:

1. `Bun`
2. `bun install`
3. `@playwright/test`
4. `lighthouse`
5. `playwright install chromium`

Isso cobre toda a execução local das tasks sem adicionar dependências de aplicação extras.

## Observações importantes

- As tasks e ADRs deixam claro que a UI da landing page deve seguir uma abordagem **zero-dependency** para animações e FAQ nativo. Ou seja: não faz sentido instalar bibliotecas de animação ou accordion.
- A `task_09` aceita `axe-playwright` **ou** Lighthouse para acessibilidade. Como a `task_10` já exige Lighthouse, instalar Lighthouse evita uma dependência extra.
- A documentação assume deploy em Vercel, mas isso é um requisito operacional de deploy/observabilidade, não um bloqueio para implementar as tasks localmente.

## Documentação oficial

- Bun: https://bun.sh/docs/installation
- Playwright installation: https://playwright.dev/docs/intro
- Playwright browsers: https://playwright.dev/docs/browsers
- Lighthouse overview / CLI context: https://developer.chrome.com/docs/lighthouse/overview
- Vercel CLI: https://vercel.com/docs/cli
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs/
- ESLint: https://eslint.org/docs/latest/
