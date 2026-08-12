import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  throw new Error("Missing RESEND_API_KEY in environment");
}

export const resend = new Resend(apiKey);

const DEFAULT_FROM = process.env.RESEND_FROM_EMAIL ?? "LaunchKit <onboarding@resend.dev>";

export function buildAuthEmailHtml({
  firstName,
  title,
  description,
  actionUrl,
  actionText,
}: {
  firstName?: string;
  title: string;
  description: string;
  actionUrl?: string;
  actionText?: string;
}) {
  const displayName = firstName?.trim() || "there";

  return `
    <!DOCTYPE html>
    <html>
      <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e4e4e7;">
          <div style="padding:32px 32px 8px;">
            <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#10b981;font-weight:700;">LaunchKit</div>
            <h1 style="margin:18px 0 0;font-size:30px;line-height:1.2;color:#0a0a0a;">${title.replace("{name}", displayName)}</h1>
          </div>
          <div style="padding:0 32px 24px;">
            <p style="margin:0;font-size:16px;line-height:1.7;color:#52525b;">${description}</p>
            ${
              actionUrl && actionText
                ? `<div style="margin-top:28px;"><a href="${actionUrl}" style="display:inline-block;background:#10b981;color:#0a0a0a;text-decoration:none;padding:14px 22px;border-radius:10px;font-weight:700;">${actionText}</a></div>`
                : ""
            }
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function sendAuthEmail({
  to,
  subject,
  title,
  description,
  actionUrl,
  actionText,
  firstName,
}: {
  to: string;
  subject: string;
  title: string;
  description: string;
  actionUrl?: string;
  actionText?: string;
  firstName?: string;
}) {
  if (!to) return;

  const html = buildAuthEmailHtml({
    firstName,
    title,
    description,
    actionUrl,
    actionText,
  });

  await resend.emails.send({
    from: DEFAULT_FROM,
    to: [to],
    subject,
    text: `${subject}\n\n${description}\n${actionUrl ?? ""}`,
    html,
  });
}

