import { eq } from "drizzle-orm";
import db from "@/lib/db/db";
import { stripeCustomer } from "@/lib/db/schema";
import { getStripeClient } from "@/lib/stripe/client";

type UserInfo = {
  id: string;
  name: string;
  email: string;
};

export async function getOrCreateStripeCustomer(user: UserInfo): Promise<string> {
  const [existing] = await db
    .select()
    .from(stripeCustomer)
    .where(eq(stripeCustomer.userId, user.id))
    .limit(1);

  if (existing) {
    return existing.stripeCustomerId;
  }

  const stripe = getStripeClient();
  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name,
    metadata: {
      userId: user.id,
    },
  });

  await db.insert(stripeCustomer).values({
    id: crypto.randomUUID(),
    userId: user.id,
    stripeCustomerId: customer.id,
  });

  return customer.id;
}
