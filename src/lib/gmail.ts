import { google } from 'googleapis'

function getGmailClient(accessToken: string) {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  )
  auth.setCredentials({ access_token: accessToken })
  return google.gmail({ version: 'v1', auth })
}

/** Strips any CR or LF from a header value to prevent injection. */
function sanitiseHeader(value: string): string {
  return value.replace(/[\r\n]/g, '')
}

function makeRawEmail(to: string, subject: string, html: string): string {
  const safeTo = sanitiseHeader(to)
  const safeSubject = sanitiseHeader(subject)
  const lines = [
    `To: ${safeTo}`,
    `Subject: ${safeSubject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    '',
    html,
  ]
  return Buffer.from(lines.join('\r\n'))
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export async function sendEmail(
  accessToken: string,
  to: string,
  subject: string,
  html: string
): Promise<void> {
  const gmail = getGmailClient(accessToken)
  const raw = makeRawEmail(to, subject, html)
  await gmail.users.messages.send({ userId: 'me', requestBody: { raw } })
}
