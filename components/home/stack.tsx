export default function Stack() {
  const stack = [
    "Next.js 15",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
    "PostgreSQL",
    "Drizzle ORM",
    "Better Auth",
    "Stripe",
    "Docker",
    "GitHub Actions",
  ];
  
  return (
    <section className="py-16 border-y border-color bg-[#171717]/50 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-white font-semibold text-center"
          style={{ fontSize: 24 }}
        >
          Stack moderna, testada em produção
        </h2>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {stack.map((tech) => (
            <div
              key={tech}
              className="bg-[#171717] border border-[#262626] rounded-lg px-4 py-2 text-[#d4d4d8] text-sm font-medium hover:border-[#404040] transition-colors"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
