"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
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
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isResendingVerification, setIsResendingVerification] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")

    if (!email || !password) {
      setError("Informe seu e-mail e sua senha.")
      setIsLoading(false)
      return
    }

    const redirectOrigin = typeof window !== "undefined" ? window.location.origin : ""

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
      callbackURL: `${redirectOrigin}/dashboard`,
    })

    setIsLoading(false)

    if (signInError) {
      const message = signInError.message ?? "Não foi possível entrar. Verifique suas credenciais."

      if (signInError.status === 403 || /verif|email/i.test(message)) {
        setError("Seu e-mail ainda não foi verificado. Reenvie o link de confirmação abaixo.")
      } else {
        setError(message)
      }

      return
    }

    router.push("/dashboard")
  }

  async function resendVerificationEmail() {
    const emailInput = document.getElementById("email") as HTMLInputElement | null
    const email = emailInput?.value?.trim()

    if (!email) {
      setError("Informe seu e-mail antes de reenviar a verificação.")
      return
    }

    setIsResendingVerification(true)
    setError(null)
    setSuccess(null)

    const redirectOrigin = typeof window !== "undefined" ? window.location.origin : ""

    const { error: resendError } = await authClient.sendVerificationEmail({
      email,
      callbackURL: `${redirectOrigin}/login`,
    })

    setIsResendingVerification(false)

    if (resendError) {
      setError(resendError.message ?? "Não foi possível reenviar a verificação.")
      return
    }

    setSuccess("E-mail de verificação reenviado com sucesso.")
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-border bg-card/95 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_12px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            LaunchKit
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">Bem-vindo de volta</CardTitle>
          <CardDescription className="text-muted-foreground">
            Entre para continuar com sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field className="grid grid-cols-2 gap-3">
                <Button variant="outline" type="button" className="flex items-center justify-center gap-2 border-border bg-background text-foreground hover:bg-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Apple
                </Button>
                <Button variant="outline" type="button" className="flex items-center justify-center gap-2 border-border bg-background text-foreground hover:bg-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-medium">
                ou continue com
              </FieldSeparator>
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" title="Password">Senha</FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto text-xs text-primary hover:underline underline-offset-4"
                  >
                    Esqueci minha senha
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-11 border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
                  required
                />
              </Field>
              {error ? (
                <Field>
                  <p className="text-sm text-destructive text-center">{error}</p>
                </Field>
              ) : null}

              {success ? (
                <Field>
                  <p className="text-sm text-primary text-center">{success}</p>
                </Field>
              ) : null}

              <Field>
                <Button type="submit" disabled={isLoading} className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={resendVerificationEmail}
                  disabled={isResendingVerification || isLoading}
                  className="mt-2 h-9 w-full text-primary hover:bg-primary/5 hover:text-primary"
                >
                  {isResendingVerification ? "Reenviando..." : "Reenviar verificação"}
                </Button>

                <FieldDescription className="mt-2 text-center text-sm text-muted-foreground">
                  Ainda não tem conta? <Link href="/signup" className="font-medium text-primary hover:underline">Criar conta</Link>
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
