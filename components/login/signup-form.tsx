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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-card border-border">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">Create your account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name" className="text-foreground">Full Name</FieldLabel>
                <Input id="name" type="text" placeholder="John Doe" className="bg-background border-border focus:ring-primary" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email" className="text-foreground">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-background border-border focus:ring-primary"
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" className="bg-background border-border focus:ring-primary" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" className="bg-background border-border focus:ring-primary" required />
                  </Field>
                </Field>
                <FieldDescription className="text-xs text-muted-foreground">
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Create Account</Button>
                <FieldDescription className="text-center text-sm text-muted-foreground mt-2">
                  Already have an account? <Link href="/login" className="text-primary hover:underline font-medium">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our <Link href="#" className="underline hover:text-foreground">Terms of Service</Link>{" "}
        and <Link href="#" className="underline hover:text-foreground">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  )
}
