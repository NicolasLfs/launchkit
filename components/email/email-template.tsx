type EmailTemplateType = 'welcome' | 'verify_email' | 'reset_password' | 'generic';

interface EmailTemplateProps {
  template?: EmailTemplateType;
  firstName?: string;
  actionUrl?: string;
  actionText?: string;
  description?: string;
}

const makeDisplayName = (firstName?: string) => firstName?.trim() || 'there';

export function EmailTemplate({
  template = 'welcome',
  firstName = 'there',
  actionUrl,
  actionText,
  description,
}: EmailTemplateProps) {
  const displayName = makeDisplayName(firstName);

  const getTitle = () => {
    switch (template) {
      case 'verify_email':
        return `Verify your email, ${displayName}`;
      case 'reset_password':
        return `Reset your password, ${displayName}`;
      case 'generic':
        return `Hello, ${displayName}`;
      case 'welcome':
      default:
        return `Welcome, ${displayName}!`;
    }
  };

  const getSubtitle = () => {
    switch (template) {
      case 'verify_email':
        return 'Confirm your email address so you can sign in and receive notifications.';
      case 'reset_password':
        return 'Use the button below to set a new password for your account.';
      case 'generic':
        return description ?? 'Here is an update from our team.';
      case 'welcome':
      default:
        return "Thanks for joining us. We're excited to have you on board.";
    }
  };

  return (
    <html>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f3f4f6' }}>
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          border={0}
          style={{ backgroundColor: '#f3f4f6' }}
        >
          <tbody>
            <tr>
              <td align="center" style={{ padding: '32px 16px' }}>
                <table
                  width="600"
                  cellPadding={0}
                  cellSpacing={0}
                  border={0}
                  style={{ backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden' }}
                >
                  <tbody>
                    <tr>
                      <td style={{ padding: '32px', fontFamily: 'Arial, Helvetica, sans-serif', color: '#111111' }}>
                        <h1 style={{ margin: 0, fontSize: '28px', lineHeight: '36px' }}>
                          {getTitle()}
                        </h1>
                        <p style={{ margin: '16px 0 0', fontSize: '16px', lineHeight: '24px', color: '#6b7280' }}>
                          {getSubtitle()}
                        </p>

                        {actionUrl && actionText ? (
                          <table cellPadding={0} cellSpacing={0} border={0} style={{ marginTop: '28px' }}>
                            <tbody>
                              <tr>
                                <td
                                  align="center"
                                  style={{
                                    backgroundColor: '#2563eb',
                                    borderRadius: '8px',
                                  }}
                                >
                                  <a
                                    href={actionUrl}
                                    style={{
                                      display: 'inline-block',
                                      padding: '14px 24px',
                                      color: '#ffffff',
                                      textDecoration: 'none',
                                      fontSize: '16px',
                                      lineHeight: '24px',
                                      fontWeight: 600,
                                    }}
                                  >
                                    {actionText}
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        ) : null}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
