"use client"
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-between px-14 py-10 bg-white dark:bg-black sm:items-start">
        <Header />
        <Footer />
      </main>
    </div>
  );
}
