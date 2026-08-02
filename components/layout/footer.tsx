export function Footer() {
  return (
    <footer className="py-8 border-t border-[#262626] bg-[#171717] w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-2 text-[#71717a] text-sm">
          <span className="text-[#a1a1aa] font-medium">LaunchKit</span>
          {["Documentação", "GitHub", "Suporte"].map((link) => (
            <span key={link} className="flex items-center gap-2">
              <span className="text-[#404040]">·</span>
              <a href="#" className="hover:text-white transition-colors">
                {link}
              </a>
            </span>
          ))}
        </div>
        <p className="text-center text-[#52525b] text-xs mt-4">
          © 2026 LaunchKit. Feito no Brasil.
        </p>
      </div>
    </footer>
  );
}
