"use client"

import { useState } from "react"
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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    const cleanedEmail = email.trim()
    if (!cleanedEmail) {
      setError("Informe seu e-mail para receber o link de redefinição.")
      setIsLoading(false)
      return
    }

    const { error: requestError } = await authClient.requestPasswordReset({
      email: cleanedEmail,
      redirectTo: `${window.location.origin}/reset-password`,
    })

    setIsLoading(false)

    if (requestError) {
      setError(requestError.message ?? "Não foi possível enviar o link de redefinição.")
      return
    }

    setSuccess("Se esse e-mail estiver cadastrado, você receberá um link para redefinir sua senha.")
    setEmail("")
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
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">Redefinir senha</CardTitle>
            <CardDescription className="text-muted-foreground">
              Informe seu e-mail e enviaremos um link para redefinir sua senha.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">E-mail</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="seu@email.com"
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
                    {isLoading ? "Enviando..." : "Enviar link"}
                  </Button>
                </Field>

                <Field>
                  <Link href="/login" className="text-sm text-primary hover:underline underline-offset-4">
                    Voltar para o login
                  </Link>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
