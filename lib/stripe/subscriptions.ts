import { eq } from "drizzle-orm";
import type Stripe from "stripe";
import db from "@/lib/db/db";
import { subscription } from "@/lib/db/schema";
import { getSubscriptionPeriod } from "@/lib/stripe/helpers";
import { getPlanById, getPlanPriceId, type PlanId } from "@/lib/stripe/plans";

function resolvePlanId(priceId: string): PlanId {
  if (priceId === getPlanPriceId("enterprise")) {
    return "enterprise";
  }

  return "pro";
}

export async function upsertSubscriptionFromStripe(
  stripeSubscription: Stripe.Subscription,
  userId: string,
) {
  const priceId = stripeSubscription.items.data[0]?.price.id;

  if (!priceId) {
    throw new Error("Assinatura Stripe sem price ID.");
  }

  const planId = resolvePlanId(priceId);
  const plan = getPlanById(planId);
  const period = getSubscriptionPeriod(stripeSubscription);

  const [existing] = await db
    .select()
    .from(subscription)
    .where(eq(subscription.stripeSubscriptionId, stripeSubscription.id))
    .limit(1);

  const values = {
    userId,
    stripeSubscriptionId: stripeSubscription.id,
    stripeCustomerId:
      typeof stripeSubscription.customer === "string"
        ? stripeSubscription.customer
        : stripeSubscription.customer.id,
    stripePriceId: priceId,
    status: stripeSubscription.status,
    plan: planId,
    planName: plan?.name ?? planId,
    currentPeriodStart: period.start,
    currentPeriodEnd: period.end,
    cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
  };

  if (existing) {
    await db
      .update(subscription)
      .set(values)
      .where(eq(subscription.id, existing.id));
    return existing.id;
  }

  const id = crypto.randomUUID();
  await db.insert(subscription).values({ id, ...values });
  return id;
}

export async function deleteSubscriptionByStripeId(stripeSubscriptionId: string) {
  await db
    .update(subscription)
    .set({ status: "canceled" })
    .where(eq(subscription.stripeSubscriptionId, stripeSubscriptionId));
}
