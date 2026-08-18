"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import type { Plan, PlanId } from "@/lib/stripe/plans";

type SubscribeButtonProps = {
  plan: Plan;
};

export default function SubscribeButton({ plan }: SubscribeButtonProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubscribe() {
    setError(null);

    if (plan.id === "starter") {
      router.push("/signup");
      return;
    }

    if (!session?.user) {
      router.push(`/login?redirect=/pricing&plan=${plan.id}`);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id satisfies PlanId }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Não foi possível iniciar o checkout.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
      setLoading(false);
    }
  }

  const label =
    plan.id === "starter"
      ? "Começar grátis"
      : loading
        ? "Redirecionando..."
        : "Assinar agora";

  return (
    <div className="w-full">
      <Button
        className="w-full"
        size="lg"
        variant={plan.highlighted ? "default" : "outline"}
        onClick={handleSubscribe}
        disabled={loading || isPending}
        aria-busy={loading}
      >
        {loading ? <Loader2 className="animate-spin" aria-hidden /> : null}
        {label}
      </Button>
      {error ? (
        <p className="mt-2 text-xs text-destructive text-center" role="alert">
          {error}
        </p>
      ) : null}
      {plan.id !== "starter" && !session?.user && !isPending ? (
        <p className="mt-2 text-xs text-muted-foreground text-center">
          <Link href="/login" className="text-primary hover:underline">
            Entre
          </Link>{" "}
          para assinar com seus dados
        </p>
      ) : null}
    </div>
  );
}
