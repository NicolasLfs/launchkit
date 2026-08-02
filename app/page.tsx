"use client";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import CTA from "@/components/home/cta";
import { useEffect } from "react";
import { toast } from "@/components/ui/toast";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import Stack from "@/components/home/stack";

export default function Home() {
  useEffect(() => {
    toast.add({
      title: "🚀 LaunchKit está rodando!",
      description: "Configure suas variáveis de ambiente em .env",
      type: "success",
    });
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-1 w-full flex-col items-center justify-between bg-background">
        <Header />
        <Hero />
        <Features />
        <Stack />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
