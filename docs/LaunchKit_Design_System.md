# LaunchKit — Documento de Design
> Guia completo de identidade visual, verbal e sistema de componentes para o ecossistema LaunchKit.

---

## 1. Visão do Design

### Propósito
O design do LaunchKit deve comunicar **confiança técnica**, **simplicidade** e **velocidade**. Cada elemento visual deve reforçar a promessa: *"SaaS pronto em 5 minutos"*.

### Princípios de Design

| Princípio | Descrição | Aplicação |
|-----------|-----------|-----------|
| **Clareza** | Zero ambiguidade. O usuário sempre sabe onde está e para onde vai. | Navegação explícita, CTAs claros, feedback visual imediato |
| **Velocidade** | Interfaces que parecem rápidas, mesmo quando carregam. | Skeletons, transições sutis, estados de loading elegantes |
| **Confiança** | Visual profissional que transmite estabilidade e segurança. | Paleta escura, tipografia consistente, espaçamento generoso |
| **Foco** | Uma ação principal por tela. Sem distrações. | Hierarquia visual forte, CTAs únicos por seção |

---

## 2. Identidade Visual

### 2.1 Paleta de Cores

#### Cores Primárias

| Token | Hex | Tailwind | Uso |
|-------|-----|----------|-----|
| `background` | `#0A0A0A` | `bg-neutral-950` | Fundo principal da aplicação |
| `surface` | `#171717` | `bg-neutral-900` | Cards, sidebars, modais, inputs |
| `surface-elevated` | `#262626` | `bg-neutral-800` | Hover states, dropdowns, tooltips |
| `border` | `#404040` | `border-neutral-700` | Divisores, bordas de inputs, separadores |
| `border-subtle` | `#262626` | `border-neutral-800` | Bordas de cards, tabelas |

#### Cores de Texto

| Token | Hex | Tailwind | Uso |
|-------|-----|----------|-----|
| `text-primary` | `#FAFAFA` | `text-neutral-50` | Títulos, texto principal, labels |
| `text-secondary` | `#A1A1AA` | `text-zinc-400` | Descrições, placeholders, metadados |
| `text-tertiary` | `#71717A` | `text-zinc-500` | Timestamps, captions, desabilitados |
| `text-inverse` | `#0A0A0A` | `text-neutral-950` | Texto sobre fundos de accent |

#### Cores de Acento (Emerald)

| Token | Hex | Tailwind | Uso |
|-------|-----|----------|-----|
| `accent` | `#10B981` | `text-emerald-500` / `bg-emerald-500` | CTAs primários, indicadores de sucesso, links |
| `accent-hover` | `#059669` | `hover:bg-emerald-600` | Hover em botões primários |
| `accent-subtle` | `#064E3B` | `bg-emerald-900` | Badges de status, backgrounds de alerta suave |
| `accent-muted` | `#34D399` | `text-emerald-400` | Ícones de sucesso, indicadores ativos |

#### Cores de Estado

| Token | Hex | Tailwind | Uso |
|-------|-----|----------|-----|
| `danger` | `#EF4444` | `text-red-500` / `bg-red-500` | Erros, deleções, ações destrutivas |
| `danger-hover` | `#DC2626` | `hover:bg-red-600` | Hover em ações destrutivas |
| `danger-subtle` | `#7F1D1D` | `bg-red-900` | Background de alertas de erro |
| `warning` | `#F59E0B` | `text-amber-500` / `bg-amber-500` | Avisos, estados de atenção |
| `warning-subtle` | `#78350F` | `bg-amber-900` | Background de alertas de warning |
| `info` | `#3B82F6` | `text-blue-500` / `bg-blue-500` | Informações, links secundários |
| `info-subtle` | `#1E3A8A` | `bg-blue-900` | Background de alertas informativos |

#### Cores de Dados (Gráficos)

| Token | Hex | Tailwind | Uso |
|-------|-----|----------|-----|
| `chart-1` | `#10B981` | `emerald-500` | Métrica principal, receita |
| `chart-2` | `#3B82F6` | `blue-500` | Métrica secundária, usuários |
| `chart-3` | `#F59E0B` | `amber-500` | Métrica terciária, conversão |
| `chart-4` | `#8B5CF6` | `violet-500` | Métrica quaternária, churn |
| `chart-5` | `#EC4899` | `pink-500` | Comparativo, benchmark |

### 2.2 Tipografia

#### Fonte Principal: Inter

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
```

#### Escala Tipográfica

| Token | Tamanho | Peso | Altura de Linha | Tracking | Uso |
|-------|---------|------|-----------------|----------|-----|
| `display` | 48px / 3rem | 800 | 1.1 | -0.02em | Hero titles, landing page H1 |
| `h1` | 36px / 2.25rem | 700 | 1.2 | -0.02em | Títulos de página |
| `h2` | 30px / 1.875rem | 600 | 1.25 | -0.01em | Seções, cards principais |
| `h3` | 24px / 1.5rem | 600 | 1.3 | -0.01em | Subseções, modais |
| `h4` | 20px / 1.25rem | 600 | 1.4 | 0 | Títulos de cards, tabs |
| `h5` | 18px / 1.125rem | 500 | 1.5 | 0 | Labels, subtítulos |
| `body-lg` | 18px / 1.125rem | 400 | 1.6 | 0 | Texto destacado, descrições |
| `body` | 16px / 1rem | 400 | 1.6 | 0 | Texto principal, parágrafos |
| `body-sm` | 14px / 0.875rem | 400 | 1.5 | 0 | Descrições secundárias |
| `caption` | 12px / 0.75rem | 500 | 1.4 | 0.01em | Labels de input, badges, timestamps |
| `mono` | 14px / 0.875rem | 400 | 1.5 | 0 | Código, valores técnicos, logs |

#### Fonte Monoespaçada: JetBrains Mono (para código)

```css
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');
```

### 2.3 Espaçamento

#### Escala de Espaçamento

| Token | Valor | Uso |
|-------|-------|-----|
| `space-1` | 4px / 0.25rem | Ícones pequenos, gaps mínimos |
| `space-2` | 8px / 0.5rem | Padding interno de badges, ícones + texto |
| `space-3` | 12px / 0.75rem | Padding de botões pequenos, gaps de grid |
| `space-4` | 16px / 1rem | Padding padrão de cards, inputs |
| `space-5` | 20px / 1.25rem | Padding de cards grandes, seções |
| `space-6` | 24px / 1.5rem | Gap entre seções, margin de títulos |
| `space-8` | 32px / 2rem | Separação entre blocos |
| `space-10` | 40px / 2.5rem | Separação de seções na landing |
| `space-12` | 48px / 3rem | Padding de seções hero |
| `space-16` | 64px / 4rem | Padding de seções grandes |
| `space-20` | 80px / 5rem | Padding de seções hero na landing |
| `space-24` | 96px / 6rem | Separação máxima entre seções |

#### Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `radius-sm` | 6px / 0.375rem | Badges, tags, inputs pequenos |
| `radius-md` | 8px / 0.5rem | Botões, cards, inputs |
| `radius-lg` | 12px / 0.75rem | Modais, dropdowns, cards grandes |
| `radius-xl` | 16px / 1rem | Cards de feature, containers |
| `radius-2xl` | 24px / 1.5rem | Hero cards, seções destacadas |
| `radius-full` | 9999px | Avatares, botões pill, badges arredondados |

#### Sombras

| Token | Valor | Uso |
|-------|-------|-----|
| `shadow-sm` | `0 1px 2px 0 rgba(0, 0, 0, 0.3)` | Inputs, badges |
| `shadow-md` | `0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)` | Cards, dropdowns |
| `shadow-lg` | `0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.4)` | Modais, popovers |
| `shadow-glow` | `0 0 20px rgba(16, 185, 129, 0.15)` | Cards de destaque, hover em CTAs |
| `shadow-glow-strong` | `0 0 40px rgba(16, 185, 129, 0.25)` | Hero elements, elementos de destaque |

---

## 3. Identidade Verbal

### 3.1 Tom de Voz

| Característica | Como aplicar | Exemplo |
|----------------|-------------|---------|
| **Direto** | Sem floreios. Vai direto ao ponto. | "Deploy em 5 minutos" em vez de "Nossa solução permite deploys rápidos" |
| **Técnico** | Usa termos que devs conhecem, mas explica quando necessário. | "Docker Compose multi-stage" com link para explicação |
| **Confiante** | Afirmações claras, sem hesitação. | "Funciona em qualquer VPS" em vez de "Deveria funcionar na maioria" |
| **Acessível** | Não intimida quem está aprendendo. | "Se você nunca usou Docker, comece aqui" |
| **Honesto** | Admite limitações e trade-offs. | "Isso funciona para MVPs. Para escala, veja o guia avançado" |

### 3.2 Vocabulário

#### Palavras que Usamos

| Palavra | Contexto |
|---------|----------|
| Deploy | Sempre em vez de "publicar", "subir", "hospedar" |
| Stack | Conjunto de tecnologias |
| Boilerplate | Template de código inicial (usar com moderação) |
| Starter Kit | Produto principal. Preferido sobre "boilerplate" |
| Zero-config | Sem necessidade de configuração manual |
| One-command | Um comando resolve |
| Production-ready | Pronto para produção desde o primeiro commit |
| Docker First | Filosofia central do produto |

#### Palavras que EVITAMOS

| Palavra | Por quê evitar | Substituição |
|---------|---------------|--------------|
| "Fácil" | Subjetivo, diminui a complexidade real | "Documentado passo a passo" |
| "Simples" | Pode soar condescendente | "Direto", "Sem complicação" |
| "Mágico" | Tira mérito do dev | "Automatizado" |
| "Melhor" | Claim sem evidência | Especificar o diferencial |
| "Grátis" | Pode soar de baixa qualidade | "R$0 para começar", "Sem custo inicial" |

### 3.3 Frases de Efeito (Taglines)

**Principal:**
> "SaaS pronto em 5 minutos"

**Secundárias:**
> "Um comando sobe tudo — local e produção"
> "Docker First. Zero vendor lock-in."
> "Comece com R$0 de infra. Escale quando quiser."
> "De `git clone` ao primeiro cliente sem perder semanas"

### 3.4 Microcopy (Textos de Interface)

#### Botões

| Contexto | Texto |
|----------|-------|
| CTA primário | "Começar agora", "Deploy em 5 min", "Clonar repositório" |
| CTA secundário | "Ver documentação", "Ver demo", "Ver preços" |
| Ação destrutiva | "Excluir permanentemente", "Remover conta" |
| Confirmação | "Salvar alterações", "Confirmar deploy" |
| Cancelamento | "Voltar", "Cancelar", "Descartar" |

#### Estados Vazios

| Contexto | Mensagem |
|----------|----------|
| Sem projetos | "Nenhum projeto ainda. Clique em 'Novo projeto' para começar." |
| Sem dados | "Sem dados para exibir. Ajuste os filtros ou aguarde novos registros." |
| Erro 404 | "Página não encontrada. Verifique o URL ou volte ao dashboard." |
| Erro 500 | "Algo deu errado. Tente recarregar ou entre em contato." |
| Loading | "Carregando..." (com skeleton) |

#### Toast Notifications

| Tipo | Título | Descrição |
|------|--------|-----------|
| Sucesso | "Deploy realizado" | "Seu SaaS está online em [URL]" |
| Erro | "Falha no deploy" | "Verifique os logs em [link]" |
| Aviso | "Atenção" | "Seu free tier expira em 15 dias" |
| Info | "Novo update" | "Versão 1.2 disponível. Veja o changelog." |

---

## 4. Sistema de Componentes

### 4.1 Estrutura de Pastas (Next.js App Router)

```
app/
├── (marketing)/              # Grupo de rotas públicas
│   ├── page.tsx              # Landing page (Home)
│   ├── layout.tsx            # Layout marketing (sem sidebar)
│   └── features/
│       └── page.tsx          # Página de features
├── (dashboard)/              # Grupo de rotas autenticadas
│   ├── layout.tsx            # Layout com sidebar + header
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard principal
│   ├── settings/
│   │   └── page.tsx          # Configurações
│   └── profile/
│       └── page.tsx          # Perfil do usuário
├── layout.tsx                # Root layout (providers, fontes)
└── globals.css               # Variáveis CSS, resets, utilitários

components/
├── ui/                       # Componentes base (shadcn/ui style)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── badge.tsx
│   ├── avatar.tsx
│   ├── skeleton.tsx
│   ├── toast.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── table.tsx
│   ├── tabs.tsx
│   └── tooltip.tsx
├── layout/                   # Componentes de layout
│   ├── sidebar.tsx
│   ├── header.tsx
│   ├── footer.tsx
│   └── mobile-nav.tsx
├── marketing/                # Componentes da landing page
│   ├── hero.tsx
│   ├── features-grid.tsx
│   ├── pricing-cards.tsx
│   ├── testimonials.tsx
│   ├── cta-section.tsx
│   └── code-showcase.tsx
├── dashboard/                # Componentes do dashboard
│   ├── stats-cards.tsx
│   ├── activity-chart.tsx
│   ├── recent-activity.tsx
│   └── quick-actions.tsx
└── shared/                   # Componentes compartilhados
    ├── logo.tsx
    ├── theme-toggle.tsx
    ├── user-nav.tsx
    └── command-palette.tsx

lib/
├── utils.ts                  # cn() e utilitários
├── constants.ts              # Constantes do app
└── hooks/
    ├── use-media-query.ts
    └── use-copy-to-clipboard.ts

styles/
└── globals.css               # Tailwind directives + CSS variables
```

### 4.2 Componentes Base (Especificações Detalhadas)

#### Button

```tsx
// Variantes
variant: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link"
size: "default" | "sm" | "lg" | "icon"

// Especificações visuais
// default: bg-emerald-500 text-neutral-950 hover:bg-emerald-600
// secondary: bg-neutral-800 text-neutral-50 hover:bg-neutral-700
// outline: border border-neutral-700 bg-transparent hover:bg-neutral-800
// ghost: bg-transparent hover:bg-neutral-800
// destructive: bg-red-500 text-white hover:bg-red-600
// link: text-emerald-500 underline-offset-4 hover:underline

// Sizes
// default: h-10 px-4 py-2 text-sm
// sm: h-8 px-3 text-xs
// lg: h-12 px-6 text-base
// icon: h-10 w-10
```

**Comportamentos:**
- Loading state: spinner dentro do botão, texto oculto
- Disabled: opacity-50 cursor-not-allowed
- Focus: ring-2 ring-emerald-500 ring-offset-2 ring-offset-neutral-950

#### Card

```tsx
// Estrutura
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição opcional</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Conteúdo */}
  </CardContent>
  <CardFooter>
    {/* Ações */}
  </CardFooter>
</Card>

// Estilos
// Card: bg-neutral-900 border border-neutral-800 rounded-xl shadow-md
// CardHeader: p-6 pb-0 (se houver descrição) ou p-6 pb-4
// CardTitle: text-lg font-semibold text-neutral-50
// CardDescription: text-sm text-zinc-400
// CardContent: p-6 pt-0
// CardFooter: p-6 pt-0 flex items-center gap-2
```

#### Input

```tsx
// Estilos
// Container: relative flex items-center
// Input: bg-neutral-900 border border-neutral-700 rounded-md px-3 py-2 text-sm text-neutral-50 placeholder:text-zinc-500
// Focus: border-emerald-500 ring-1 ring-emerald-500
// Error: border-red-500 ring-1 ring-red-500
// Disabled: opacity-50 cursor-not-allowed bg-neutral-800
// Icon (left): absolute left-3 text-zinc-400
// Icon (right): absolute right-3 text-zinc-400
```

#### Badge

```tsx
// Variantes
variant: "default" | "secondary" | "outline" | "success" | "warning" | "danger" | "info"

// Cores
// default: bg-emerald-500/10 text-emerald-400 border border-emerald-500/20
// secondary: bg-neutral-800 text-zinc-400
// outline: border border-neutral-700 text-zinc-400
// success: bg-emerald-500/10 text-emerald-400
// warning: bg-amber-500/10 text-amber-400
// danger: bg-red-500/10 text-red-400
// info: bg-blue-500/10 text-blue-400
```

#### Avatar

```tsx
// Sizes
size: "xs" | "sm" | "md" | "lg" | "xl"

// Valores
// xs: 24px / 1.5rem
// sm: 32px / 2rem
// md: 40px / 2.5rem
// lg: 48px / 3rem
// xl: 64px / 4rem

// Estilo: rounded-full border-2 border-neutral-800
// Fallback: bg-neutral-800 text-zinc-400 font-medium
```

### 4.3 Componentes de Layout

#### Sidebar (Dashboard)

```tsx
// Desktop: w-64 fixed left-0 top-0 h-full bg-neutral-900 border-r border-neutral-800
// Mobile: sheet/drawer from left
// Collapsed: w-16 (ícones apenas)

// Estrutura
// - Logo (topo)
// - Nav groups (com labels)
//   - Main: Dashboard, Projects, Analytics
//   - Management: Users, Billing, Settings
// - User nav (rodapé)

// Item ativo: bg-emerald-500/10 text-emerald-400 border-r-2 border-emerald-500
// Item hover: bg-neutral-800 text-neutral-50
// Item default: text-zinc-400
```

#### Header (Dashboard)

```tsx
// Altura: h-16
// Background: bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800
// Position: sticky top-0 z-50

// Esquerda: Breadcrumb + Título da página
// Centro: Command palette (cmd+k)
// Direita: Notifications + Theme toggle + User nav
```

#### Footer (Marketing)

```tsx
// Background: bg-neutral-900 border-t border-neutral-800
// Padding: py-12 px-4

// Estrutura
// - Logo + tagline
// - Links em colunas: Produto, Recursos, Empresa, Legal
// - Social links (GitHub, LinkedIn, Twitter)
// - Copyright
```

### 4.4 Componentes da Landing Page

#### Hero Section

```tsx
// Layout: min-h-[90vh] flex flex-col items-center justify-center text-center px-4
// Background: bg-neutral-950 com gradiente sutil (radial de emerald-500/5 no centro)

// Conteúdo:
// - Badge: "Docker First · Zero-config" (topo)
// - H1: display font (48px, weight 800)
//   "SaaS pronto em 5 minutos"
// - Subtitle: body-lg (18px, text-zinc-400)
//   "LaunchKit é o starter kit que sobe auth, Postgres, Stripe e landing page"
//   "com um único comando. Documentado em português."
// - CTA Group:
//   - Primary: "Começar agora" (lg, com ícone de foguete)
//   - Secondary: "Ver documentação" (outline, lg)
// - Code snippet: Terminal mock mostrando `docker compose up`
// - Trust badges: "Open Source · Docker · PostgreSQL · Stripe"
```

#### Features Grid

```tsx
// Layout: py-24 px-4 max-w-7xl mx-auto
// Grid: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

// Feature Card:
// - Icon: 48px container, bg-emerald-500/10, text-emerald-400, rounded-xl
// - Title: h4 (20px, semibold)
// - Description: body-sm (14px, text-zinc-400)
// - Border: border border-neutral-800 hover:border-emerald-500/30 transition

// Features:
// 1. "Docker Compose" — "Um comando sobe tudo: app, banco, auth, Stripe"
// 2. "Auth Completo" — "OAuth, Magic Link, MFA e RBAC prontos"
// 3. "PostgreSQL Tuning" — "Migrations, seed, índices otimizados, PgBouncer-ready"
// 4. "Pagamentos" — "Stripe com webhooks testáveis localmente"
// 5. "Landing Page" — "SEO otimizado, blog, analytics"
// 6. "Documentação" — "Não só 'como', mas 'por que' cada decisão"
```

#### Code Showcase

```tsx
// Layout: py-24 bg-neutral-900
// Container: max-w-5xl mx-auto

// Estrutura:
// - H2: "De `git clone` ao deploy em produção"
// - Tabs: "Local" | "Produção"
// - Terminal mock com syntax highlighting
// - Passos numerados ao lado

// Estilo do terminal:
// bg-neutral-950 rounded-xl border border-neutral-800 p-6
// Fonte: JetBrains Mono
// Cores: emerald para comandos, blue para valores, zinc para output
```

#### Pricing Cards

```tsx
// Layout: py-24 px-4 max-w-5xl mx-auto
// Grid: grid grid-cols-1 md:grid-cols-3 gap-8

// Card structure:
// - Header: Nome do plano + preço
// - Divider: border-t border-neutral-800
// - Features list: check icons + text
// - CTA: Button full-width

// Highlighted card (Pro):
// border-emerald-500 shadow-glow
// Badge "Mais popular"

// Plans:
// - Starter: "Grátis" (open source features)
// - Core: "R$ 197" (one-time) — highlighted
// - Setup: "R$ 497" (Core + 1h consultoria)
```

#### CTA Section

```tsx
// Layout: py-24 px-4
// Background: gradiente de emerald-500/10 para transparente
// Container: max-w-4xl mx-auto text-center

// Conteúdo:
// - H2: "Pronto para lançar seu SaaS?"
// - Subtitle: "Clone o repositório e suba em 5 minutos"
// - CTA: "Começar agora" (primary, lg)
// - Secondary: "Ver demo ao vivo"
```

---

## 5. Animações e Transições

### 5.1 Durações

| Token | Valor | Uso |
|-------|-------|-----|
| `duration-fast` | 150ms | Hover states, focus rings |
| `duration-normal` | 200ms | Transições de cor, opacity |
| `duration-slow` | 300ms | Modais, dropdowns, sidebar |
| `duration-slower` | 500ms | Page transitions, hero animations |

### 5.2 Easing

| Token | Valor | Uso |
|-------|-------|-----|
| `ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Transições padrão |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elementos saindo |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elementos entrando |
| `ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Toasts, badges animados |

### 5.3 Padrões de Animação

| Padrão | Implementação | Uso |
|--------|--------------|-----|
| **Fade in up** | opacity 0→1, translateY 20px→0, duration-slower | Hero elements, sections on scroll |
| **Fade in** | opacity 0→1, duration-normal | Modais, toasts |
| **Scale in** | scale 0.95→1, opacity 0→1, duration-slow | Dropdowns, popovers |
| **Slide in left** | translateX -100%→0, duration-slow | Sidebar mobile |
| **Pulse glow** | shadow-glow pulsating, 2s infinite | CTA buttons, live indicators |
| **Skeleton shimmer** | gradient animation left→right, 1.5s infinite | Loading states |

---

## 6. Estados e Feedback

### 6.1 Loading States

| Contexto | Visual |
|----------|--------|
| Page load | Skeleton screens (shimmer effect) |
| Button action | Spinner inside button, text hidden |
| Data fetch | Skeleton cards + shimmer |
| File upload | Progress bar (emerald) + percentage |
| Long operation | Progress stepper + estimated time |

### 6.2 Empty States

| Contexto | Ilustração | Texto |
|----------|-----------|-------|
| No projects | Empty box icon (zinc-600) | "Nenhum projeto ainda" + CTA |
| No data | Chart icon (zinc-600) | "Sem dados para exibir" |
| No notifications | Bell icon (zinc-600) | "Você não tem notificações" |
| Search empty | Search icon (zinc-600) | "Nenhum resultado para '[termo]'" |

### 6.3 Error States

| Contexto | Visual | Ação |
|----------|--------|------|
| Input error | Border red-500, icon alert, message below | Focus no input |
| Form error | Toast danger, scroll to first error | — |
| API error | Toast danger with retry button | Retry request |
| 404 page | Illustration + "Página não encontrada" | Link para home |
| 500 page | Illustration + "Algo deu errado" | Botão "Recarregar" |

---

## 7. Responsividade

### 7.1 Breakpoints

| Nome | Valor | Uso |
|------|-------|-----|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktop pequeno |
| `xl` | 1280px | Desktop padrão |
| `2xl` | 1536px | Desktop grande |

### 7.2 Padrões Responsivos

| Elemento | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| Sidebar | Hidden (sheet) | Hidden (sheet) | Fixed, 256px |
| Header | Icon + title | Icon + title | Breadcrumb + search + nav |
| Hero | Stack vertical, text-center | Stack vertical | Flex row, text-left |
| Features grid | 1 coluna | 2 colunas | 3 colunas |
| Pricing | 1 coluna (scroll) | 2 colunas | 3 colunas |
| Dashboard grid | 1 coluna | 2 colunas | 3-4 colunas |
| Font size (hero) | 36px | 40px | 48px |
| Padding sections | 48px | 64px | 96px |

---

## 8. Arquivos de Configuração

### 8.1 tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: {
          DEFAULT: "#171717",
          elevated: "#262626",
        },
        border: {
          DEFAULT: "#404040",
          subtle: "#262626",
        },
        accent: {
          DEFAULT: "#10B981",
          hover: "#059669",
          subtle: "#064E3B",
          muted: "#34D399",
        },
        danger: {
          DEFAULT: "#EF4444",
          hover: "#DC2626",
          subtle: "#7F1D1D",
        },
        warning: {
          DEFAULT: "#F59E0B",
          subtle: "#78350F",
        },
        info: {
          DEFAULT: "#3B82F6",
          subtle: "#1E3A8A",
        },
        chart: {
          1: "#10B981",
          2: "#3B82F6",
          3: "#F59E0B",
          4: "#8B5CF6",
          5: "#EC4899",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        display: ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "h1": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "h2": ["1.875rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" }],
        "h3": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "h4": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        "h5": ["1.125rem", { lineHeight: "1.5", fontWeight: "500" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "caption": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        glow: "0 0 20px rgba(16, 185, 129, 0.15)",
        "glow-strong": "0 0 40px rgba(16, 185, 129, 0.25)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(16, 185, 129, 0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(16, 185, 129, 0.3)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

### 8.2 globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');

@layer base {
  :root {
    --background: 0 0% 4%;
    --foreground: 0 0% 98%;
    --card: 0 0% 9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 9%;
    --popover-foreground: 0 0% 98%;
    --primary: 160 84% 39%;
    --primary-foreground: 0 0% 4%;
    --secondary: 0 0% 15%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 15%;
    --muted-foreground: 240 5% 65%;
    --accent: 160 84% 39%;
    --accent-foreground: 0 0% 4%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 25%;
    --input: 0 0% 25%;
    --ring: 160 84% 39%;
    --radius: 0.5rem;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply text-neutral-50 font-semibold tracking-tight;
  }

  code, pre {
    @apply font-mono;
  }

  ::selection {
    @apply bg-emerald-500/30 text-neutral-50;
  }

  ::-webkit-scrollbar {
    @apply w-2 h-2;
  }

  ::-webkit-scrollbar-track {
    @apply bg-neutral-900;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-neutral-700 rounded-full;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-neutral-600;
  }
}

@layer components {
  .text-gradient {
    @apply bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent;
  }

  .bg-gradient-radial {
    background: radial-gradient(circle at center, rgba(16, 185, 129, 0.05) 0%, transparent 70%);
  }

  .glass {
    @apply bg-neutral-950/80 backdrop-blur-md border border-neutral-800;
  }

  .skeleton {
    @apply bg-neutral-800 animate-shimmer;
    background-image: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
    background-size: 200% 100%;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

---

## 9. Assets e Recursos

### 9.1 Ícones

**Biblioteca:** Lucide React (`lucide-react`)

**Ícones principais:**

| Contexto | Ícone | Nome Lucide |
|----------|-------|-------------|
| Logo/Brand | Foguete | `Rocket` |
| Dashboard | Painel | `LayoutDashboard` |
| Projetos | Pasta | `Folder` |
| Analytics | Gráfico | `BarChart3` |
| Users | Pessoas | `Users` |
| Billing | Cartão | `CreditCard` |
| Settings | Engrenagem | `Settings` |
| Theme light | Sol | `Sun` |
| Theme dark | Lua | `Moon` |
| Theme system | Monitor | `Monitor` |
| Deploy | Nuvem upload | `CloudUpload` |
| Docker | Container | `Container` (ou custom SVG) |
| Database | Banco | `Database` |
| Auth | Cadeado | `Lock` |
| Email | Envelope | `Mail` |
| Notification | Sino | `Bell` |
| Search | Lupa | `Search` |
| Menu | Hambúrguer | `Menu` |
| Close | X | `X` |
| Chevron down | Seta baixo | `ChevronDown` |
| External link | Seta diagonal | `ExternalLink` |
| Copy | Duplicar | `Copy` |
| Check | Checkmark | `Check` |
| Alert | Triângulo | `AlertTriangle` |
| Info | Círculo i | `Info` |
| Success | Check círculo | `CheckCircle2` |
| Error | X círculo | `XCircle` |
| Loading | Spinner | `Loader2` (com animate-spin) |
| Terminal | Prompt | `Terminal` |
| Code | Chaves | `Code2` |
| GitHub | Logo | `Github` |
| LinkedIn | Logo | `Linkedin` |
| Twitter/X | Logo | `Twitter` |

### 9.2 Logo

**Especificações:**
- **Ícone:** Foguete minimalista, linhas finas, apontando para cima-direita
- **Cores:** Emerald-500 (#10B981) em fundo escuro, ou neutral-950 em fundo claro
- **Versões:**
  - `logo-icon.svg` — Ícone apenas (32x32, 64x64)
  - `logo-full.svg` — Ícone + "LaunchKit" (horizontal)
  - `logo-mark.svg` — Ícone + "LK" monograma
- **Clear space:** Mínimo 8px ao redor do logo
- **Não fazer:** Não distorcer, não mudar cores, não adicionar sombras externas

### 9.3 Imagens

**Estilo fotográfico:**
- Dark, tech-forward, com tons de verde (emerald) como acento
- Screenshots de terminal com syntax highlighting
- Diagramas de arquitetura minimalistas
- Ilustrações abstratas de containers/docker

**Screenshots:**
- Usar Carbon (carbon.now.sh) para snippets de código
- Background: neutral-950, tema: custom com emerald accents
- Fonte: JetBrains Mono, 14px
- Padding: 32px, rounded-xl

---

## 10. Checklist de Implementação

### Landing Page (Home)

- [ ] Hero section com badge, H1, subtitle, CTAs, terminal mock
- [ ] Features grid (6 cards com ícones)
- [ ] Code showcase (tabs: local vs produção)
- [ ] Pricing cards (3 tiers)
- [ ] CTA final section
- [ ] Footer com links e social

### Layout Base

- [ ] Root layout com fontes, providers, metadata
- [ ] Marketing layout (sem sidebar, header simplificado)
- [ ] Dashboard layout (sidebar + header + main)

### Componentes Base

- [ ] Button (todas variantes e sizes)
- [ ] Card (com header, content, footer)
- [ ] Input (com ícones, estados, error)
- [ ] Badge (todas variantes)
- [ ] Avatar (todas sizes)
- [ ] Skeleton (shimmer effect)
- [ ] Toast (sucesso, erro, warning, info)
- [ ] Dialog/Modal
- [ ] Dropdown Menu
- [ ] Tabs
- [ ] Tooltip

### Temas

- [ ] Dark mode (padrão)
- [ ] Light mode (opcional, futuro)
- [ ] System preference detection
- [ ] Theme toggle component
- [ ] Persistência no localStorage

---

## 11. Notas para o Agente (Kimi CLI)

### Instruções Gerais

1. **Sempre usar Tailwind CSS** para estilização. Nunca CSS puro exceto em `globals.css`.
2. **Componentes reutilizáveis** em `components/ui/`. Nunca duplicar código de UI.
3. **TypeScript em tudo.** Nunca usar `any`. Tipar props de componentes.
4. **Acessibilidade:** Usar `aria-label`, `role`, foco visível, contraste adequado.
5. **Performance:** Usar `next/image` para imagens, lazy loading para componentes pesados.
6. **Mobile-first:** Sempre estilizar para mobile primeiro, depois `md:` e `lg:`.

### Ordem de Implementação

1. Configurar `tailwind.config.ts` e `globals.css`
2. Criar componentes base em `components/ui/`
3. Criar layout base (`app/layout.tsx`)
4. Criar landing page (`app/(marketing)/page.tsx`)
5. Criar seções da landing page em `components/marketing/`
6. Adicionar animações e interatividade
7. Testar responsividade em todos os breakpoints

### Convenções de Nomenclatura

- **Arquivos:** kebab-case (`hero-section.tsx`)
- **Componentes:** PascalCase (`HeroSection`)
- **Hooks:** camelCase com prefixo `use` (`useMediaQuery`)
- **Utilitários:** camelCase (`cn`, `formatDate`)
- **Constantes:** UPPER_SNAKE_CASE (`API_BASE_URL`)

---

> **Última atualização:** 2026-07-31  
> **Versão:** 1.0  
> **Próxima revisão:** Após implementação da landing page
