import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { submitLead, crmContactUrl } from '@/lib/crm'
import { confirmationEmail, internalNotificationEmail } from '@/lib/email-templates'
import { verifyTurnstile } from '@/lib/turnstile'
import { isRateLimited } from '@/lib/rate-limit'

const TO   = 'troy@fintech5group.com'
const FROM = 'FinTech 5 <info@mail.fintech5group.com>'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? 'missing')
  try {
    const { firstName, lastName, email, phone, business, businessType, message, hp, turnstileToken } = await req.json()

    // Honeypot — bots fill every field, including this hidden one. Pretend success.
    if (hp) return NextResponse.json({ success: true })

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const ip = req.headers.get('cf-connecting-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

    if (isRateLimited(`contact:${ip}`, 5, 10 * 60_000)) {
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 })
    }

    if (!(await verifyTurnstile(turnstileToken, 'contact', ip))) {
      return NextResponse.json({ error: 'Verification failed. Please try again.' }, { status: 403 })
    }

    const contactId = await submitLead('contact', {
      email,
      firstName,
      lastName: lastName || undefined,
      phone: phone || undefined,
      businessName: business || undefined,
      industry: businessType || undefined,
      message: message || undefined,
      createDeal: true,
      sourceUrl: req.headers.get('referer') || undefined,
    })

    const [internalResult, clientResult] = await Promise.all([
      resend.emails.send({
        from: FROM,
        to: TO,
        replyTo: email,
        subject: `New Contact: ${firstName} ${lastName || ''}`.trim(),
        html: internalNotificationEmail({
          category: 'New Contact Form Submission',
          headline: business || `${firstName} ${lastName || ''}`.trim(),
          rows: [
            { label: 'Name', value: `${firstName} ${lastName || ''}`.trim() },
            { label: 'Email', value: `<a href="mailto:${email}" style="color:#16a34a;font-weight:700;text-decoration:none">${email}</a>` },
            { label: 'Phone', value: phone || '-' },
            { label: 'Business', value: business || '-' },
            { label: 'Industry', value: businessType || '-' },
            { label: 'Message', value: message },
          ],
          crmUrl: contactId ? crmContactUrl(contactId) : null,
          replyToEmail: email,
        }),
      }),
      resend.emails.send({
        from: FROM,
        to: email,
        replyTo: TO,
        subject: `We got your message, FinTech 5`,
        html: confirmationEmail({
          firstName,
          heading: `Got it, ${firstName}. We'll be in touch.`,
          body: `Thanks for reaching out. A real person will review this and get back to you. If you sent a statement, most audits come back in about <strong style="color:#ffffff">15 minutes</strong>. A day is the longest it takes.`,
          stepsTitle: 'While you wait',
          steps: [
            'Try our <a href="https://fintech5group.com/calculator" style="color:#6fc200;text-decoration:none">free fee calculator</a> to estimate your savings',
            'Upload a statement for a <a href="https://fintech5group.com/get-your-savings-estimate" style="color:#6fc200;text-decoration:none">full free audit</a>',
            'Browse our <a href="https://fintech5group.com/blog" style="color:#6fc200;text-decoration:none">payment processing insights</a>',
          ],
        }),
      }),
    ])

    if (internalResult.error) console.error('[/api/contact] internal email failed', internalResult.error)
    if (clientResult.error) console.error('[/api/contact] client email failed', clientResult.error)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[/api/contact]', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
