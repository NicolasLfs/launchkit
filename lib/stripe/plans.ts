export type PlanId = "starter" | "pro" | "enterprise";

export type Plan = {
  id: PlanId;
  name: string;
  description: string;
  price: number;
  currency: "BRL";
  interval: "month" | null;
  features: string[];
  highlighted?: boolean;
  badge?: string;
};

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Para explorar o LaunchKit e validar sua ideia.",
    price: 0,
    currency: "BRL",
    interval: null,
    features: [
      "Auth com email e senha",
      "PostgreSQL com Drizzle ORM",
      "Landing page responsiva",
      "Docker Compose local",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Early Access — tudo que você precisa para lançar.",
    price: 97,
    currency: "BRL",
    interval: "month",
    highlighted: true,
    badge: "Early Access",
    features: [
      "Tudo do Starter",
      "Stripe Checkout integrado",
      "Webhooks e billing portal",
      "Dashboard completo",
      "Suporte prioritário",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Para times que precisam escalar com segurança.",
    price: 297,
    currency: "BRL",
    interval: "month",
    features: [
      "Tudo do Pro",
      "Multi-tenant e RBAC",
      "SLA dedicado",
      "Onboarding personalizado",
      "Consultoria de arquitetura",
    ],
  },
];

const PRICE_ENV_KEYS: Record<Exclude<PlanId, "starter">, string> = {
  pro: "STRIPE_PRICE_PRO",
  enterprise: "STRIPE_PRICE_ENTERPRISE",
};

export function getPlanById(planId: PlanId): Plan | undefined {
  return PLANS.find((plan) => plan.id === planId);
}

export function getPlanPriceId(planId: Exclude<PlanId, "starter">): string | undefined {
  const envKey = PRICE_ENV_KEYS[planId];
  return process.env[envKey];
}

export function formatPlanPrice(plan: Plan): string {
  if (plan.price === 0) {
    return "Grátis";
  }

  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: plan.currency,
    minimumFractionDigits: 0,
  }).format(plan.price);

  return plan.interval ? `${formatted}/mês` : formatted;
}
