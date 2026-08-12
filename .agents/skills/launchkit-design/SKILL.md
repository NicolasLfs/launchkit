---
name: launchkit-design
description: Regra, templates e exemplos para criar/alterar UI seguindo o Design System LaunchKit.
user-invocable: true
metadata:
  keywords: ["ui", "design-system", "tailwind", "nextjs", "typescript"]
---

# Objetivo
Fornecer regras, templates e exemplos para que agentes ou desenvolvedores gerem alterações de UI consistentes com o Design System LaunchKit.

# Regras obrigatórias
- Sempre TypeScript (sem `any`).
- Componentes em `components/ui/` ou `components/{area}/` (ex.: `components/marketing/`).
- Usar Tailwind CSS conforme `tailwind.config.ts` e `globals.css`.
- Não usar CSS puro exceto em `globals.css` quando estritamente necessário.
- Nomenclatura: arquivos kebab-case, componentes PascalCase.
- Export default: `export default ComponentName` quando for componente principal.
- Acessibilidade mínima: `aria-*` quando aplicável, foco visível.
- Testes/lint: favor gerar código que passa `pnpm lint` localmente (se possível).

# Templates
## Exemplo: componente Button (`components/ui/button.tsx`)
```tsx
import React from 'react'
import cn from '@/lib/utils'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'default' | 'lg'
  loading?: boolean
}

export default function Button({ variant = 'default', size = 'default', loading, className, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition '
  const variants: Record<string,string> = {
    default: 'bg-emerald-500 text-neutral-950 hover:bg-emerald-600',
    outline: 'border border-neutral-700 bg-transparent text-neutral-50',
    ghost: 'bg-transparent text-neutral-50 hover:bg-neutral-800',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
  }
  const sizes: Record<string,string> = {
    sm: 'h-8 px-3 text-xs',
    default: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  }

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {loading ? <span className="loader" aria-hidden /> : props.children}
    </button>
  )
}
```

## Exemplo: página Next.js (app/(marketing)/page.tsx)
```tsx
import React from 'react'
import Button from '@/components/ui/button'

export default function HomePage() {
  return (
    <main className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-4xl">
        <h1 className="text-display text-gradient">SaaS pronto em 5 minutos</h1>
        <p className="mt-4 text-body-lg text-zinc-400">Clone, `docker compose up` e acompanhe a demo.</p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg">Começar agora</Button>
          <Button variant="outline" size="lg">Ver documentação</Button>
        </div>
      </div>
    </main>
  )
}
```

# Exemplos de prompts (para o agente)
- "Crie um componente `Card` em `components/ui` com header, content e footer seguindo o Design System." 
- "Adicione uma página `pricing` em `app/(marketing)/pricing/page.tsx` com três colunas responsivas." 
- "Refatore `components/marketing/hero.tsx` para usar `text-gradient` e `bg-gradient-radial` do design system."

# Checks e checklist antes de propor PR
- Validar que o arquivo segue a estrutura de pastas.
- Tipar props e evitar `any`.
- Usar classes do `tailwind.config.ts` (cores e tokens definidos).
- Executar `pnpm lint` (se disponível) e alertar se houver erros.
- Incluir breve descrição de alteração e local dos arquivos criados.

# Contra-exemplos (proibido)
- Criar estilos inline com CSS complexo em componentes (use Tailwind).
- Mudar a estrutura de pastas do projeto sem autorização.
- Usar bibliotecas de UI externas para layout principal sem justificativa.

# Quando pedir confirmação humana
- Alterações que mudem a identidade visual (cores, tipografia, escala).
- Remover ou renomear componentes centrais.
- Mudanças que afetem comportamento crítico (auth, pagamentos, dados).

# Sugestão de saída do agente
Ao gerar código, o agente deve retornar:
- Lista de arquivos criados/alterados com caminhos (ex.: `components/ui/button.tsx`).
- Conteúdo dos arquivos (bloco de código).
- Comandos recomendados a rodar localmente (ex.: `pnpm lint`, `pnpm build`).
- Observações de compatibilidade ou pontos a revisar manualmente.

---

*Última atualização: 2026-08-12*
