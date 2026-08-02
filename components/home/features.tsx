import { Container, Lock, Database, CreditCard, LayoutTemplate, BookOpen } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Container,
      title: "Docker Compose",
      description:
        "Um comando sobe tudo: app, banco, auth, Stripe. Dev e produção com o mesmo arquivo.",
    },
    {
      icon: Lock,
      title: "Auth Completo",
      description:
        "OAuth Google/GitHub, Magic Link, MFA e RBAC. Sessões seguras, pronto para usar.",
    },
    {
      icon: Database,
      title: "PostgreSQL",
      description:
        "Schema type-safe com Drizzle, migrations automáticas, seed de dados, índices otimizados.",
    },
    {
      icon: CreditCard,
      title: "Stripe",
      description:
        "Checkout, webhooks testáveis localmente, portal de billing. Planos Free, Pro, Enterprise.",
    },
    {
      icon: LayoutTemplate,
      title: "Landing Page",
      description:
        "SEO otimizado, blog com MDX, analytics. Pronto para converter visitantes em clientes.",
    },
    {
      icon: BookOpen,
      title: "Documentação",
      description:
        "Cada decisão explicada. Não só 'como', mas 'por que'. Deploy, troubleshooting, scaling.",
    },
  ];

  return (
    <section className="py-24 max-w-6xl mx-auto px-4">
      <h2
        className="text-white text-center font-semibold"
        style={{ fontSize: 30 }}
      >
        Tudo pronto para começar
      </h2>
      <p className="text-[#a1a1aa] text-center text-lg mt-2 mb-12">
        O essencial para lançar seu SaaS, sem configuração manual.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="bg-[#171717] border border-[#262626] rounded-xl p-6 hover:border-emerald-500/30 transition-all duration-200"
          >
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
              <Icon size={20} className="text-emerald-500" />
            </div>
            <h3 className="text-white font-semibold text-lg mt-2">{title}</h3>
            <p className="text-[#a1a1aa] text-sm leading-relaxed mt-2">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
