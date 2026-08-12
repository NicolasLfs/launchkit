"use client"

import { LoginForm } from "@/components/login/login-form"
import { Rocket } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-semibold text-lg tracking-tight">
          <Rocket className="size-6 text-primary" />
          <span className="text-foreground">LaunchKit</span>
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
