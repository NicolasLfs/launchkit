import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getOrCreateStripeCustomer } from "@/lib/stripe/customers";
import { getStripeClient } from "@/lib/stripe/client";
import { getPlanById, getPlanPriceId, type PlanId } from "@/lib/stripe/plans";

type CheckoutPlanId = Exclude<PlanId, "starter">;

const CHECKOUT_PLANS: CheckoutPlanId[] = ["pro", "enterprise"];

function isCheckoutPlan(value: unknown): value is CheckoutPlanId {
  return typeof value === "string" && CHECKOUT_PLANS.includes(value as CheckoutPlanId);
}

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Você precisa estar autenticado para assinar um plano." },
        { status: 401 },
      );
    }

    const body = (await request.json()) as { planId?: unknown };

    if (!isCheckoutPlan(body.planId)) {
      return NextResponse.json(
        { error: "Plano inválido." },
        { status: 400 },
      );
    }

    const plan = getPlanById(body.planId);
    const priceId = getPlanPriceId(body.planId);

    if (!plan || !priceId) {
      return NextResponse.json(
        {
          error:
            "Price ID do plano não configurado. Defina STRIPE_PRICE_PRO ou STRIPE_PRICE_ENTERPRISE no .env.",
        },
        { status: 500 },
      );
    }

    const stripeCustomerId = await getOrCreateStripeCustomer({
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
    });

    const baseUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
    const stripe = getStripeClient();

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: stripeCustomerId,
      client_reference_id: session.user.id,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing?canceled=true`,
      locale: "pt-BR",
      metadata: {
        userId: session.user.id,
        planId: plan.id,
      },
      subscription_data: {
        metadata: {
          userId: session.user.id,
          planId: plan.id,
        },
      },
      integration_identifier: `launchkit_checkout_${plan.id}_a8f3k2m1`,
    });

    if (!checkoutSession.url) {
      return NextResponse.json(
        { error: "Não foi possível criar a sessão de checkout." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("[stripe/checkout]", error);
    return NextResponse.json(
      { error: "Erro ao iniciar checkout. Tente novamente." },
      { status: 500 },
    );
  }
}
