import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import PricingGrid from "@/components/pricing/pricing-grid";
import { CreditCard, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Planos — LaunchKit",
  description:
    "Escolha o plano ideal para lançar seu SaaS. Pagamento via cartão ou boleto com Stripe Checkout.",
};

export default function PricingPage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-background">
      <Header />

      <main className="flex-1 w-full">
        <section
          className="py-20 px-4 text-center"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 70%)",
          }}
        >
          <div className="max-w-3xl mx-auto">
            <h1
              className="text-foreground font-bold tracking-tight"
              style={{ fontSize: "clamp(32px, 5vw, 44px)" }}
            >
              Planos simples, prontos para lançar
            </h1>
            <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
              Assine em segundos com Stripe Checkout. Aceitamos cartão de crédito
              e boleto bancário.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-16">
          <PricingGrid />
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-24">
          <div className="rounded-xl border border-border bg-card/50 p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CreditCard size={18} className="text-primary" aria-hidden />
              </div>
              <div>
                <p className="font-medium text-foreground">Pagamento seguro</p>
                <p className="text-sm text-muted-foreground">
                  Processado pela Stripe com criptografia de ponta a ponta.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:ml-auto">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShieldCheck size={18} className="text-primary" aria-hidden />
              </div>
              <div>
                <p className="font-medium text-foreground">Boleto e cartão</p>
                <p className="text-sm text-muted-foreground">
                  Métodos habilitados no Dashboard da Stripe para o Brasil.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
