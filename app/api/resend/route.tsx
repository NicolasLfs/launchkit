import { EmailTemplate } from '@/components/email/email-template';
import { resend } from '@/lib/email/email';

const DEFAULT_FROM = process.env.RESEND_FROM_EMAIL ?? 'Acme <onboarding@resend.dev>';

type EmailTemplateName = 'welcome' | 'verify_email' | 'reset_password' | 'generic';

type EmailUserPayload = {
  id: string;
  firstName?: string;
  email?: string;
};

type EmailTemplateData = {
  verificationUrl?: string;
  resetUrl?: string;
  html?: string;
  [key: string]: string | undefined;
};

type EmailSendPayload = {
  to: string[];
  subject: string;
  template: EmailTemplateName;
  user: EmailUserPayload;
  templateData?: EmailTemplateData;
  idempotencyKey?: string;
};

function buildEmailPayload(payload: EmailSendPayload) {
  switch (payload.template) {
    case 'welcome':
      return {
        react: <EmailTemplate template="welcome" firstName={payload.user.firstName} />,
      };

    case 'verify_email':
      return {
        react: (
          <EmailTemplate
            template="verify_email"
            firstName={payload.user.firstName}
            actionUrl={payload.templateData?.verificationUrl}
            actionText="Verify email"
          />
        ),
      };

    case 'reset_password':
      return {
        react: (
          <EmailTemplate
            template="reset_password"
            firstName={payload.user.firstName}
            actionUrl={payload.templateData?.resetUrl}
            actionText="Reset password"
          />
        ),
      };

    case 'generic':
    default:
      if (payload.templateData?.html) {
        return { html: payload.templateData.html };
      }
      return {
        react: (
          <EmailTemplate
            template="generic"
            firstName={payload.user.firstName}
            description={payload.templateData?.html}
          />
        ),
      };
  }
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as Partial<EmailSendPayload>;

  const to = Array.isArray(payload.to) ? payload.to : [];
  const subject = typeof payload.subject === 'string' ? payload.subject : '';
  const template = typeof payload.template === 'string' ? (payload.template as EmailTemplateName) : 'generic';
  const user = typeof payload.user === 'object' && payload.user !== null ? (payload.user as EmailUserPayload) : { id: '' };

  if (!to.length || !subject || !user.id) {
    return Response.json(
      { error: 'Missing required payload: to, subject, and user.id are required.' },
      { status: 400 },
    );
  }

  const idempotencyKey =
    typeof payload.idempotencyKey === 'string'
      ? payload.idempotencyKey
      : `${template}/${user.id}`;

  try {
    const content = buildEmailPayload({
      to,
      subject,
      template,
      user,
      templateData: payload.templateData,
      idempotencyKey,
    });

    const emailPayload = {
      from: DEFAULT_FROM,
      to,
      subject,
      ...content,
    };

    const { data, error } = await resend.emails.send(emailPayload, { idempotencyKey });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
