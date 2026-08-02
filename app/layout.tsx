import type { Metadata } from "next";
import { Montserrat} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toast";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LaunchKit — SaaS pronto em 5 minutos",
  description: "Starter kit com filosofia Docker First. Sobe auth, PostgreSQL, Stripe e landing page com um único comando. Documentado em português.",
  openGraph: {
    title: 'LaunchKit — SaaS pronto em 5 minutos',
    description: 'Docker First starter kit para desenvolvedores brasileiros.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-black">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange 
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
