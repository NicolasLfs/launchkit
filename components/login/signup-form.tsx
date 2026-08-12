"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = String(formData.get("name") ?? "")
    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")
    const confirmPassword = String(formData.get("confirm-password") ?? "")

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.")
      setIsLoading(false)
      return
    }

    const redirectOrigin = typeof window !== "undefined" ? window.location.origin : ""

    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: `${redirectOrigin}/dashboard`,
    })

    setIsLoading(false)

    if (signUpError) {
      setError(signUpError.message ?? "Ocorreu um erro ao criar a conta.")
      return
    }

    setSuccess("Conta criada com sucesso. Verifique seu e-mail para ativar o acesso.")
    router.push("/login?registered=success")
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-border bg-card/95 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_12px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            LaunchKit
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">Crie sua conta</CardTitle>
          <CardDescription className="text-muted-foreground">
            Comece em poucos segundos e configure seu workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name" className="text-foreground">Nome completo</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="João da Silva"
                  className="h-11 border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email" className="text-foreground">E-mail</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="h-11 border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
                  required
                />
              </Field>
              <Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="h-11 border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">Confirmar</FieldLabel>
                    <Input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="h-11 border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
                      required
                    />
                  </Field>
                </div>
                <FieldDescription className="text-xs text-muted-foreground">
                  A senha deve ter pelo menos 8 caracteres.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading} className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  {isLoading ? "Criando conta..." : "Criar conta"}
                </Button>
                {error ? (
                  <p className="mt-2 text-center text-sm text-destructive">{error}</p>
                ) : null}
                {success ? (
                  <p className="mt-2 text-center text-sm text-primary">{success}</p>
                ) : null}
                <FieldDescription className="mt-2 text-center text-sm text-muted-foreground">
                  Já tem uma conta? <Link href="/login" className="font-medium text-primary hover:underline">Entrar</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-xs text-muted-foreground">
        Ao continuar, você concorda com nossos <Link href="#" className="underline hover:text-foreground">Termos de uso</Link>{" "}
        e <Link href="#" className="underline hover:text-foreground">Política de privacidade</Link>.
      </FieldDescription>
    </div>
  )
}
