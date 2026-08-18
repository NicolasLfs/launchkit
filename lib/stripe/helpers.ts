import type Stripe from "stripe";

export function getSubscriptionPeriod(stripeSubscription: Stripe.Subscription) {
  const item = stripeSubscription.items.data[0];

  return {
    start: item?.current_period_start
      ? new Date(item.current_period_start * 1000)
      : null,
    end: item?.current_period_end
      ? new Date(item.current_period_end * 1000)
      : null,
  };
}

export function getInvoiceSubscriptionId(invoice: Stripe.Invoice): string | null {
  const parent = invoice.parent;

  if (parent?.type === "subscription_details") {
    const subscription = parent.subscription_details?.subscription;

    if (typeof subscription === "string") {
      return subscription;
    }

    if (subscription && typeof subscription === "object" && "id" in subscription) {
      return subscription.id;
    }
  }

  const legacySubscription = (
    invoice as Stripe.Invoice & {
      subscription?: string | Stripe.Subscription | null;
    }
  ).subscription;

  if (typeof legacySubscription === "string") {
    return legacySubscription;
  }

  if (legacySubscription && typeof legacySubscription === "object") {
    return legacySubscription.id;
  }

  return null;
}
