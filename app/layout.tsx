import type { Metadata } from "next";
import { Montserrat} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Launch Kit",
  description: "Launch Kit is a platform for creating and launching products SaaS.",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
