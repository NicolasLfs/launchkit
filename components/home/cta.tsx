export default function CTA() {
  return (
    <section
      className="py-24 text-center px-4"
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(16,185,129,0.05) 0%, transparent 70%)",
      }}
    >
      <h2
        className="text-white font-bold"
        style={{ fontSize: "clamp(28px, 4vw, 36px)" }}
      >
        Pronto para construir seu SaaS?
      </h2>
      <p className="text-[#a1a1aa] text-lg mt-4">
        Crie sua conta e comece em 5 minutos.
      </p>
      <a
        href="#"
        className="inline-block bg-emerald-500 hover:bg-emerald-600 text-black rounded-md px-8 py-4 text-lg font-medium mt-8 transition-colors"
        style={{ boxShadow: "0 0 24px rgba(16,185,129,0.25)" }}
      >
        Criar conta gratuita
      </a>
      <div className="mt-4">
        <a
          href="#"
          className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
        >
          Já tem conta? Entrar
        </a>
      </div>
    </section>
  );
}
