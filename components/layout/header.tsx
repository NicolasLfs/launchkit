import { Rocket } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 h-16 backdrop-blur-md border-b border-border flex items-center w-full bg-background/80">
      <div className="max-w-6xl mx-auto px-4 w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Rocket size={20} className="text-primary" />
          <span className="text-foreground font-semibold text-lg tracking-tight">
            LaunchKit
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            href="/login"
            className="text-muted-foreground hover:text-foreground text-sm font-medium px-3 py-2 rounded-md transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/signup"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium px-4 py-2 rounded-md transition-colors"
          >
            Cadastrar
          </Link>
        </nav>
      </div>
    </header>
  );
}
