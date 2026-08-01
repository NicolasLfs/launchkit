"use client"
import Link from "next/link";
import { ModeToggle } from "../theme/toggle-theme";

export function Header() {
  return (
    <header className="w-full">
      <div className="flex w-full max-w-7xl mx-auto items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold">LaunchKit</h1>
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
}