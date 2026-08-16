import { Container, CreditCard, Database, GitBranch } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-16 relative"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(16,185,129,0.05) 0%, transparent 70%)",
      }}
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full px-4 py-1.5 text-xs font-medium mb-6">
        <Container size={14} />
        Docker First · Zero Config
      </div>

      {/* H1 */}
      <h1
        className="text-white font-extrabold tracking-tight leading-[1.1] max-w-[600px] mx-auto"
        style={{ fontSize: "clamp(36px, 6vw, 48px)", letterSpacing: "-0.02em" }}
      >
        Seu SaaS está no ar
      </h1>

      {/* Subtitle */}
      <p
        className="text-[#a1a1aa] max-w-[560px] mx-auto mt-4 leading-relaxed"
        style={{ fontSize: "clamp(16px, 2vw, 18px)" }}
      >
        LaunchKit: dev com docker compose (local), produção com CI/CD via GitHub
        Actions. Auth, PostgreSQL, Stripe, landing page. Documentado em português.
      </p>

      {/* CTA Group */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
        <a
          href="#"
          className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-black rounded-md px-6 py-3 text-base font-medium transition-colors"
          style={{ boxShadow: "0 0 20px rgba(16,185,129,0.25)" }}
        >
          Começar agora
        </a>
        <a
          href="#"
          className="w-full sm:w-auto bg-transparent border border-[#404040] text-white rounded-md px-6 py-3 text-base font-medium hover:bg-[#262626] transition-colors"
        >
          Ver documentação
        </a>
      </div>

      {/* Terminal Mock */}
      <div className="mt-12 w-full max-w-[700px] mx-auto rounded-xl border border-[#262626] bg-black overflow-hidden text-left">
        <div className="bg-[#171717]/80 px-4 py-2.5 flex items-center gap-2 border-b border-[#262626]">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
          <span className="text-[#71717a] text-xs font-mono ml-2">bash</span>
        </div>
        <div className="p-6 font-mono text-sm leading-7">
          <div>
            <span className="text-emerald-500">$ </span>
            <span className="text-white">
              git clone github.com/launchkit/core
            </span>
          </div>
          <div>
            <span className="text-emerald-500">$ </span>
            <span className="text-white">
              cd launchkit &amp;&amp; cp .env.example .env
            </span>
          </div>
          <div>
            <span className="text-emerald-500">$ </span>
            <span className="text-white">docker compose up -d</span>
          </div>
          <div className="mt-2" />
          <div>
            <span className="text-emerald-500"> ✓ </span>
            <span className="text-[#a1a1aa]">Postgres ready on port 5432</span>
          </div>
          <div>
            <span className="text-emerald-500"> ✓ </span>
            <span className="text-[#a1a1aa]">Stripe webhook listener active</span>
          </div>
          <div className="mt-2" />
          <div>
            <span className="text-emerald-500">$ </span>
            <span className="text-white">pnpm dev</span>
          </div>
          <div className="mt-2" />
          <div>
            <span className="text-emerald-500"> ✓ </span>
            <span className="text-[#a1a1aa]">
              Next.js dev server ready on localhost:3000
            </span>
          </div>
          <div className="mt-2" />
          <div className="text-emerald-400 font-medium">
            🚀 LaunchKit is running!
          </div>
          <div>
            <span className="text-[#71717a]"> Visit </span>
            <span className="text-emerald-400">http://localhost:3000</span>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
        {[
          { icon: GitBranch, label: "Open Source" },
          { icon: Container, label: "Docker" },
          { icon: Database, label: "PostgreSQL" },
          { icon: CreditCard, label: "Stripe" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 text-[#71717a] text-sm"
          >
            <Icon size={16} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
