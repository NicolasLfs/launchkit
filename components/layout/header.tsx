import { Rocket } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 h-16 backdrop-blur-md border-b border-color flex items-center w-full">
      <div className="max-w-6xl mx-auto px-4 w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Rocket size={20} className="text-emerald-500" />
          <span className="text-white font-semibold text-lg tracking-tight">
            LaunchKit
          </span>
        </div>
        <nav className="flex items-center gap-1">
          <a
            href="#"
            className="text-[#a1a1aa] hover:text-white text-sm font-medium px-3 py-2 rounded-md transition-colors"
          >
            Entrar
          </a>
          <a
            href="#"
            className="bg-emerald-500 hover:bg-emerald-600 text-black text-sm font-medium px-4 py-2 rounded-md transition-colors"
          >
            Cadastrar
          </a>
        </nav>
      </div>
    </header>
  );
}
