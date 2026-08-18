import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Assinatura confirmada — LaunchKit",
  description: "Sua assinatura foi processada com sucesso.",
};

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function PricingSuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const sessionId = params.session_id;

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-background">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <CheckCircle2 size={32} className="text-primary" aria-hidden />
          </div>

          <h1 className="text-2xl font-bold text-foreground">
            Assinatura iniciada!
          </h1>

          <p className="text-muted-foreground mt-3 leading-relaxed">
            {sessionId
              ? "Recebemos sua solicitação. Se pagou com boleto, a confirmação pode levar até 1 dia útil."
              : "Sua assinatura está sendo processada."}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button render={<Link href="/dashboard" />} nativeButton={false} size="lg">
              Ir para o dashboard
            </Button>
            <Button
              render={<Link href="/pricing" />}
              nativeButton={false}
              variant="outline"
              size="lg"
            >
              Ver planos
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
