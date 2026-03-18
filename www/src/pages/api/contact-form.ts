import type { APIRoute } from 'astro'
import { resolveCmsUrl } from '../../lib/cms'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type IncomingSubmission = {
  redirectTo?: string
  name?: string
  email?: string
  company?: string
  phone?: string
  subject?: string
  message?: string
  consent?: string
  contactVariant?: string
  blockId?: string
  pagePath?: string
  pageUrl?: string
  company_website?: string
}

type RuntimeLocals = {
  runtime?: {
    env?: Record<string, unknown>
  }
}

type EmailNotificationConfig = {
  resendApiKey?: string
  to: string[]
  from?: string
  replyToSubmitter: boolean
}

type SubmissionPayload = {
  name: string
  email: string
  company: string
  phone: string
  subject: string
  message: string
  variant: string
  blockId: string
  pagePath: string
  pageUrl: string
  consentAccepted: boolean
}

function getEnvValue(locals: RuntimeLocals, key: string): string | undefined {
  const runtimeValue = locals?.runtime?.env?.[key]
  if (typeof runtimeValue === 'string' && runtimeValue.trim().length > 0) {
    return runtimeValue.trim()
  }

  const buildValue = (import.meta.env as any)?.[key]
  if (typeof buildValue === 'string' && buildValue.trim().length > 0) {
    return buildValue.trim()
  }

  return undefined
}

function parseEmailList(raw: string | undefined): string[] {
  if (!raw) return []

  return raw
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter((entry) => EMAIL_REGEX.test(entry))
}

function readEmailNotificationConfig(locals: RuntimeLocals): EmailNotificationConfig {
  const resendApiKey =
    getEnvValue(locals, 'CONTACT_FORM_RESEND_API_KEY') || getEnvValue(locals, 'RESEND_API_KEY')

  const recipients =
    getEnvValue(locals, 'CONTACT_FORM_NOTIFY_TO') ||
    getEnvValue(locals, 'CONTACT_FORM_NOTIFICATION_TO') ||
    ''

  const from = getEnvValue(locals, 'CONTACT_FORM_NOTIFY_FROM') || 'onboarding@resend.dev'
  const replyToSubmitterRaw = getEnvValue(locals, 'CONTACT_FORM_REPLY_TO_SUBMITTER') || 'true'
  const replyToSubmitter = replyToSubmitterRaw.toLowerCase() !== 'false'

  return {
    resendApiKey,
    to: parseEmailList(recipients),
    from,
    replyToSubmitter,
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

async function sendResendNotification(config: EmailNotificationConfig, submission: SubmissionPayload): Promise<void> {
  if (!config.resendApiKey || config.to.length === 0) return

  const textLines = [
    'New contact form submission',
    '',
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Company: ${submission.company || '-'}`,
    `Phone: ${submission.phone || '-'}`,
    `Subject: ${submission.subject || '-'}`,
    `Message: ${submission.message}`,
    '',
    `Page Path: ${submission.pagePath || '-'}`,
    `Page URL: ${submission.pageUrl || '-'}`,
    `Variant: ${submission.variant || '-'}`,
    `Block ID: ${submission.blockId || '-'}`,
    `Consent Accepted: ${submission.consentAccepted ? 'Yes' : 'No'}`,
  ]

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #111827;">
      <h2 style="margin: 0 0 12px;">New Contact Form Submission</h2>
      <p style="margin: 0 0 16px;">A new message was submitted from your website.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
        <tbody>
          <tr><td style="padding: 6px 8px; border: 1px solid #e5e7eb; font-weight: 600;">Name</td><td style="padding: 6px 8px; border: 1px solid #e5e7eb;">${escapeHtml(submission.name)}</td></tr>
          <tr><td style="padding: 6px 8px; border: 1px solid #e5e7eb; font-weight: 600;">Email</td><td style="padding: 6px 8px; border: 1px solid #e5e7eb;">${escapeHtml(submission.email)}</td></tr>
          <tr><td style="padding: 6px 8px; border: 1px solid #e5e7eb; font-weight: 600;">Company</td><td style="padding: 6px 8px; border: 1px solid #e5e7eb;">${escapeHtml(submission.company || '-')}</td></tr>
          <tr><td style="padding: 6px 8px; border: 1px solid #e5e7eb; font-weight: 600;">Phone</td><td style="padding: 6px 8px; border: 1px solid #e5e7eb;">${escapeHtml(submission.phone || '-')}</td></tr>
          <tr><td style="padding: 6px 8px; border: 1px solid #e5e7eb; font-weight: 600;">Subject</td><td style="padding: 6px 8px; border: 1px solid #e5e7eb;">${escapeHtml(submission.subject || '-')}</td></tr>
          <tr><td style="padding: 6px 8px; border: 1px solid #e5e7eb; font-weight: 600;">Message</td><td style="padding: 6px 8px; border: 1px solid #e5e7eb; white-space: pre-wrap;">${escapeHtml(submission.message)}</td></tr>
          <tr><td style="padding: 6px 8px; border: 1px solid #e5e7eb; font-weight: 600;">Page Path</td><td style="padding: 6px 8px; border: 1px solid #e5e7eb;">${escapeHtml(submission.pagePath || '-')}</td></tr>
          <tr><td style="padding: 6px 8px; border: 1px solid #e5e7eb; font-weight: 600;">Page URL</td><td style="padding: 6px 8px; border: 1px solid #e5e7eb;">${escapeHtml(submission.pageUrl || '-')}</td></tr>
          <tr><td style="padding: 6px 8px; border: 1px solid #e5e7eb; font-weight: 600;">Variant</td><td style="padding: 6px 8px; border: 1px solid #e5e7eb;">${escapeHtml(submission.variant || '-')}</td></tr>
          <tr><td style="padding: 6px 8px; border: 1px solid #e5e7eb; font-weight: 600;">Block ID</td><td style="padding: 6px 8px; border: 1px solid #e5e7eb;">${escapeHtml(submission.blockId || '-')}</td></tr>
        </tbody>
      </table>
    </div>
  `

  const resendBody: Record<string, unknown> = {
    from: config.from,
    to: config.to,
    subject: `New inquiry: ${submission.subject || submission.name}`,
    text: textLines.join('\n'),
    html,
  }

  if (config.replyToSubmitter && EMAIL_REGEX.test(submission.email)) {
    resendBody.reply_to = [submission.email]
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${config.resendApiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(resendBody),
    cache: 'no-store',
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '')
    throw new Error(`Resend send failed (${response.status}): ${errorBody.slice(0, 250)}`)
  }
}

function wantsJsonResponse(request: Request): boolean {
  const accept = request.headers.get('accept') || ''
  const contentType = request.headers.get('content-type') || ''
  return accept.includes('application/json') || contentType.includes('application/json')
}

function toText(value: unknown, max = 2000): string {
  return String(value || '')
    .trim()
    .slice(0, max)
}

function getSafeRedirectTarget(request: Request, rawRedirect: unknown, status: 'success' | 'error' | 'validation'): string {
  const redirectPath = toText(rawRedirect, 512)
  const safePath = redirectPath.startsWith('/') ? redirectPath : '/'
  const target = new URL(safePath, request.url)
  target.searchParams.set('contactStatus', status)
  return target.toString()
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}

async function parseIncomingSubmission(request: Request): Promise<IncomingSubmission> {
  const contentType = request.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return (await request.json()) as IncomingSubmission
  }

  const formData = await request.formData()
  const result: Record<string, string> = {}

  formData.forEach((value, key) => {
    if (typeof value === 'string') {
      result[key] = value
    }
  })

  return result as IncomingSubmission
}

export const prerender = false

export const POST: APIRoute = async ({ request, locals }) => {
  const runtimeLocals = (locals || {}) as RuntimeLocals
  const asJson = wantsJsonResponse(request)
  const payload = await parseIncomingSubmission(request)

  if (toText(payload.company_website, 128)) {
    if (asJson) {
      return jsonResponse({ ok: true }, 200)
    }
    return Response.redirect(getSafeRedirectTarget(request, payload.redirectTo, 'success'), 303)
  }

  const name = toText(payload.name, 120)
  const email = toText(payload.email, 180).toLowerCase()
  const company = toText(payload.company, 160)
  const phone = toText(payload.phone, 80)
  const subject = toText(payload.subject, 180) || 'Website contact form submission'
  const message = toText(payload.message, 6000)
  const variant = toText(payload.contactVariant, 80)
  const blockId = toText(payload.blockId, 120)
  const pagePath = toText(payload.pagePath, 500)
  const pageUrl = toText(payload.pageUrl, 1000)
  const consentAccepted = Boolean(payload.consent)

  const validationErrors: string[] = []

  if (name.length < 2) validationErrors.push('Name is required.')
  if (!EMAIL_REGEX.test(email)) validationErrors.push('A valid email is required.')
  if (message.length < 10) validationErrors.push('Message must be at least 10 characters.')

  if (validationErrors.length > 0) {
    if (asJson) {
      return jsonResponse({ ok: false, errors: validationErrors }, 400)
    }

    return Response.redirect(getSafeRedirectTarget(request, payload.redirectTo, 'validation'), 303)
  }

  const cmsEndpoint = resolveCmsUrl('/api/form-submissions')

  if (!cmsEndpoint) {
    if (asJson) {
      return jsonResponse({ ok: false, error: 'Form endpoint is not configured.' }, 500)
    }
    return Response.redirect(getSafeRedirectTarget(request, payload.redirectTo, 'error'), 303)
  }

  try {
    const createResponse = await fetch(cmsEndpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        company: company || undefined,
        phone: phone || undefined,
        subject,
        message,
        variant: variant || undefined,
        blockId: blockId || undefined,
        consentAccepted,
        source: {
          pagePath: pagePath || undefined,
          pageUrl: pageUrl || undefined,
          referrer: request.headers.get('referer') || undefined,
          userAgent: request.headers.get('user-agent') || undefined,
        },
      }),
      cache: 'no-store',
    })

    if (!createResponse.ok) {
      throw new Error(`CMS create failed with status ${createResponse.status}`)
    }

    const notificationConfig = readEmailNotificationConfig(runtimeLocals)
    try {
      await sendResendNotification(notificationConfig, {
        name,
        email,
        company,
        phone,
        subject,
        message,
        variant,
        blockId,
        pagePath,
        pageUrl,
        consentAccepted,
      })
    } catch (notificationError) {
      console.error('[Edge Zero starter/www] contact form email notification failed:', notificationError)
    }

    if (asJson) {
      return jsonResponse({ ok: true }, 201)
    }

    return Response.redirect(getSafeRedirectTarget(request, payload.redirectTo, 'success'), 303)
  } catch (error) {
    console.error('[Edge Zero starter/www] contact form submission failed:', error)

    if (asJson) {
      return jsonResponse({ ok: false, error: 'Submission failed.' }, 502)
    }

    return Response.redirect(getSafeRedirectTarget(request, payload.redirectTo, 'error'), 303)
  }
}
