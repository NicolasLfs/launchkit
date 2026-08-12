"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Rocket } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const token = searchParams.get("token") ?? ""

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!token) {
      setError("Token de redefinição inválido ou ausente.")
      return
    }

    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.")
      return
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.")
      return
    }

    setIsLoading(true)

    const { error: resetError } = await authClient.resetPassword({
      newPassword: password,
      token,
    })

    setIsLoading(false)

    if (resetError) {
      setError(resetError.message ?? "Não foi possível redefinir sua senha.")
      return
    }

    setSuccess("Senha atualizada com sucesso. Redirecionando para o login...")
    setTimeout(() => router.push("/login"), 1200)
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-semibold text-lg tracking-tight text-foreground">
          <Rocket className="size-6 text-primary" />
          <span>LaunchKit</span>
        </Link>

        <Card className="border-border bg-card/95 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_12px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              Segurança
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">Nova senha</CardTitle>
            <CardDescription className="text-muted-foreground">
              Crie uma nova senha para acessar sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="password">Nova senha</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    className="h-11 border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirm-password">Confirmar senha</FieldLabel>
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="••••••••"
                    className="h-11 border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
                    required
                  />
                </Field>

                {error ? (
                  <Field>
                    <p className="text-center text-sm text-destructive">{error}</p>
                  </Field>
                ) : null}

                {success ? (
                  <Field>
                    <p className="text-center text-sm text-primary">{success}</p>
                  </Field>
                ) : null}

                <Field>
                  <Button type="submit" disabled={isLoading} className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    {isLoading ? "Atualizando..." : "Atualizar senha"}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
