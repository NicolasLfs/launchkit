# LaunchKit Core

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**SaaS pronto em 5 minutos. Dev local com Docker, produção com CI/CD.**

[📖 Documentação](#documentação) • [🚀 Quick Start](#quick-start) • [💻 Desenvolvimento](#desenvolvimento) • [🌐 Deploy](#deploy)

</div>

---

## O que é LaunchKit Core?

**LaunchKit Core** é um starter kit completo e documentado para construir SaaS, feito por quem já operou microserviços em produção (Go, RabbitMQ, Redis, PostgreSQL em escala).

A proposta não é vender código — é vender **tempo economizado**, **decisões técnicas validadas em produção** e uma **experiência de desenvolvimento impecável** do primeiro `git clone` até o primeiro cliente.

### Missão
Permitir que qualquer desenvolvedor full-stack lance um SaaS em produção sem perder semanas configurando infraestrutura.

---

## ✨ Principais Features

- ✅ **Docker First**: Desenvolvimento local completo, sem dependências externas
- 🔐 **Autenticação Completa**: OAuth (Google/GitHub), Magic Link, MFA, RBAC
- 🗄️ **PostgreSQL Type-Safe**: Drizzle ORM, migrations automáticas, seed de dados
- 💳 **Stripe Integrado**: Checkout, webhooks locais (via Stripe CLI), portal de billing
- 📧 **Email Pronto**: Resend integrado, templates profissionais
- 🎨 **UI Modern**: shadcn/ui + Tailwind CSS, tema claro/escuro
- 📱 **Landing Page**: SEO otimizado, blog com MDX, pricing
- 🚀 **CI/CD**: GitHub Actions, build Docker, deploy automático
- 📚 **Documentação Completa**: Decisões técnicas explicadas, não apenas código

---

## 🛠️ Stack Técnica

| Camada | Tecnologia | Por quê |
|--------|-----------|---------|
| **Framework** | Next.js 15 (App Router) | Padrão de mercado, SSR/SSG, ecossistema maduro |
| **Linguagem** | TypeScript | Type safety, DX superior, manutenibilidade |
| **Estilo** | Tailwind CSS + shadcn/ui | Produtividade, consistência, acessibilidade |
| **Banco** | PostgreSQL | ACID, escalável, padrão para SaaS |
| **ORM** | Drizzle | Type-safe, SQL-first, moderno |
| **Auth** | Better Auth | OAuth, Magic Link, MFA, RBAC |
| **Pagamentos** | Stripe | Webhooks robustos, portal de billing |
| **Email** | Resend | 3.000/mês grátis, API simples |
| **Container** | Docker + Compose | Dev e prod, zero config local |
| **CI/CD** | GitHub Actions | Gratuito, integrado, automação |

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+ ou Docker
- Git
- Conta Stripe (test mode)
- Chaves Google/GitHub OAuth (opcional, para dev)

### 1️⃣ Clone e Configure

\`\`\`bash
git clone https://github.com/seu-user/launchkit-core.git
cd launchkit-core

# Configure variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais (Google OAuth, Stripe test, Resend)
\`\`\`

### 2️⃣ Suba os Serviços (Docker)

\`\`\`bash
docker compose up
\`\`\`

Isso sobe:
- **PostgreSQL** em `localhost:5432`
- **Stripe Webhook Listener** (Stripe CLI)

### 3️⃣ Em Outro Terminal, Rode o App

\`\`\`bash
pnpm install  # primeira vez apenas
pnpm dev
\`\`\`

Isso inicia:
- **Next.js dev server** em `http://localhost:3000`
- **Hot-reload automático**

### 4️⃣ Acesse

- App: [http://localhost:3000](http://localhost:3000)
- Drizzle Studio: `pnpm studio` (gerenciar banco visualmente)

---

## 📁 Estrutura do Projeto

\`\`\`
launchkit-core/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Rotas de autenticação
│   │   ├── login/
│   │   ├── signup/
│   │   └── forgot-password/
│   ├── dashboard/                # Dashboard do usuário
│   ├── api/                      # Rotas da API
│   │   ├── auth/[...all]/        # Better Auth endpoints
│   │   └── resend/               # Email webhook
│   └── page.tsx                  # Home/Landing Page
│
├── components/
│   ├── home/                     # Componentes da landing page
│   ├── login/                    # Formulários de auth
│   ├── layout/                   # Header, Footer, Sidebar
│   ├── ui/                       # shadcn/ui components
│   └── email/                    # Templates de email
│
├── lib/
│   ├── auth-client.ts            # Cliente Better Auth
│   ├── db/                       # Drizzle schema, migrations
│   │   ├── schema.ts
│   │   ├── db.ts
│   │   └── migrations/
│   └── email/                    # Resend config
│
├── public/                       # Assets estáticos
├── docs/                         # Documentação do projeto
├── docker-compose.yml            # Serviços locais (PostgreSQL, Stripe)
├── Dockerfile                    # Build para produção
├── .env.example                  # Template de variáveis
└── package.json
\`\`\`

---

## 📋 Scripts Disponíveis

### Desenvolvimento

\`\`\`bash
pnpm dev              # Inicia Next.js dev server (hot-reload)
pnpm build            # Build para produção
pnpm start            # Inicia o servidor produção
pnpm lint             # ESLint + type-check
\`\`\`

### Banco de Dados (Drizzle)

| Script | Descrição |
|--------|-----------|
| \`pnpm db:generate\` | Gera SQL migrations baseado no schema |
| \`pnpm db:migrate\` | Aplica migrations ao banco |
| \`pnpm db:push\` | Sincroniza schema (dev only) |
| \`pnpm db:seed\` | Popula dados de exemplo |
| \`pnpm studio\` | Abre Drizzle Studio (UI para banco) |
| \`pnpm db:check\` | Valida migrations |

### Docker

\`\`\`bash
docker compose up              # Inicia PostgreSQL + Stripe CLI
docker compose down            # Para os serviços
docker compose up --build      # Rebuild imagens
\`\`\`

---

## 💻 Desenvolvimento

### Fluxo Típico

1. **Altere o schema** em \`lib/db/schema.ts\`
2. **Gere migration**: \`pnpm db:generate\`
3. **Teste localmente**: A migration se aplica automaticamente
4. **Commit e push**: GitHub Actions testa e builda

### Adicionando OAuth

1. Crie credenciais no [Google Cloud Console](https://console.cloud.google.com) ou [GitHub Settings](https://github.com/settings/developers)
2. Adicione URLs de callback em \`.env\`
3. Teste em \`http://localhost:3000/login\`

### Testando Webhooks Stripe Localmente

O Stripe CLI roda automaticamente no Docker:

\`\`\`bash
# Veja eventos em tempo real
docker compose logs stripe-cli

# Dispare eventos de teste (em outro terminal)
stripe trigger payment_intent.succeeded
\`\`\`

---

## 🌐 Deploy

### Opção 1: VPS (Recomendado para Escala)

1. **Prepare a VPS** (Ubuntu 22.04, EC2 Free Tier ou Oracle Cloud)
   \`\`\`bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   \`\`\`

2. **Configure GitHub Actions** para fazer push automático
   - Guia completo em [docs/deploy-vps.md](docs/deploy-vps.md)

3. **Faça um push**:
   \`\`\`bash
   git push origin main
   # GitHub Actions automaticamente:
   # 1. Testa (lint, type-check)
   # 2. Faz build Docker
   # 3. Deploy via SSH na VPS
   \`\`\`

---

## 📚 Documentação

- **[docs/00-launchkit.md](docs/00-launchkit.md)** - Visão geral, stack, decisões técnicas
- **[docs/deploy-vps.md](docs/deploy-vps.md)** - Setup completo de VPS, SSL, reverse proxy
- **[docs/LaunchKit_Design_System.md](docs/LaunchKit_Design_System.md)** - Guia de componentes UI
- **[docs/ROADMAP_STATUS.md](docs/ROADMAP_STATUS.md)** - Status do projeto, próximas features

---


## ⚖️ Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/seu-user/launchkit-core/issues)
- **Documentação**: Veja pasta `/docs`
- **Email**: contato@seudominio.com

---

<div align="center">

**Feito com ❤️ para developers que querem lançar SaaS rápido.**

⭐ Se achou útil, deixa uma star!

</div>




