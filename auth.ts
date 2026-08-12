import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "./lib/db/db";
import { account, session, user, verification } from "./lib/db/schema";
import { sendAuthEmail } from "./lib/email/email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification },
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      void sendAuthEmail({
        to: user.email,
        subject: "Reset your password",
        title: `Reset your password, ${user.name?.split(" ")[0] ?? "there"}`,
        description: "Use the button below to create a new password for your account.",
        firstName: user.name?.split(" ")[0],
        actionUrl: url,
        actionText: "Reset password",
      });
    },
    onPasswordReset: async ({ user }) => {
      console.log(`Password reset successful for ${user.email}`);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    sendVerificationEmail: async ({ user, url }) => {
      void sendAuthEmail({
        to: user.email,
        subject: "Verify your email address",
        title: `Verify your email, ${user.name?.split(" ")[0] ?? "there"}`,
        description: "Confirm your email address so you can access your account and start using LaunchKit.",
        firstName: user.name?.split(" ")[0],
        actionUrl: url,
        actionText: "Verify email",
      });
    },
  },
});
