import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { eq } from "drizzle-orm";
import db from "@/lib/db/db";
import { stripeCustomer } from "@/lib/db/schema";
import { getStripeClient } from "@/lib/stripe/client";
import { getInvoiceSubscriptionId } from "@/lib/stripe/helpers";
import {
  deleteSubscriptionByStripeId,
  upsertSubscriptionFromStripe,
} from "@/lib/stripe/subscriptions";

export const runtime = "nodejs";

async function resolveUserId(
  metadata: Stripe.Metadata | null,
  customerId: string | Stripe.Customer | Stripe.DeletedCustomer | null,
): Promise<string | null> {
  if (metadata?.userId) {
    return metadata.userId;
  }

  if (typeof customerId !== "string") {
    return null;
  }

  const [record] = await db
    .select()
    .from(stripeCustomer)
    .where(eq(stripeCustomer.stripeCustomerId, customerId))
    .limit(1);

  return record?.userId ?? null;
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  if (session.mode !== "subscription" || !session.subscription) {
    return;
  }

  const userId = await resolveUserId(
    session.metadata,
    session.customer,
  );

  if (!userId) {
    console.error("[stripe/webhook] userId não encontrado para checkout session", session.id);
    return;
  }

  const stripe = getStripeClient();
  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription.id;

  const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);
  await upsertSubscriptionFromStripe(stripeSubscription, userId);
}

async function handleSubscriptionEvent(stripeSubscription: Stripe.Subscription) {
  const userId = await resolveUserId(
    stripeSubscription.metadata,
    stripeSubscription.customer,
  );

  if (!userId) {
    console.error(
      "[stripe/webhook] userId não encontrado para subscription",
      stripeSubscription.id,
    );
    return;
  }

  if (
    stripeSubscription.status === "canceled" ||
    stripeSubscription.status === "incomplete_expired"
  ) {
    await deleteSubscriptionByStripeId(stripeSubscription.id);
    return;
  }

  await upsertSubscriptionFromStripe(stripeSubscription, userId);
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const subscriptionId = getInvoiceSubscriptionId(invoice);

  if (!subscriptionId) {
    return;
  }

  const stripe = getStripeClient();
  const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);
  await handleSubscriptionEvent(stripeSubscription);
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("[stripe/webhook] STRIPE_WEBHOOK_SECRET não configurada.");
    return NextResponse.json(
      { error: "Webhook não configurado." },
      { status: 500 },
    );
  }

  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Assinatura ausente." },
      { status: 400 },
    );
  }

  const stripe = getStripeClient();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("[stripe/webhook] Falha na verificação de assinatura:", error);
    return NextResponse.json(
      { error: "Assinatura inválida." },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;
      case "checkout.session.async_payment_failed":
        console.warn(
          "[stripe/webhook] Pagamento assíncrono falhou:",
          (event.data.object as Stripe.Checkout.Session).id,
        );
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionEvent(event.data.object as Stripe.Subscription);
        break;
      case "customer.subscription.deleted":
        await deleteSubscriptionByStripeId(
          (event.data.object as Stripe.Subscription).id,
        );
        break;
      case "invoice.paid":
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;
      case "invoice.payment_failed":
        console.warn(
          "[stripe/webhook] Pagamento de fatura falhou:",
          (event.data.object as Stripe.Invoice).id,
        );
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(`[stripe/webhook] Erro ao processar ${event.type}:`, error);
    return NextResponse.json(
      { error: "Erro ao processar evento." },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}
