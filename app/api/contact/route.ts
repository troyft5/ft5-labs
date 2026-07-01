import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { submitLead, crmContactUrl } from '@/lib/crm'
import { confirmationEmail, internalNotificationEmail } from '@/lib/email-templates'

const TO   = 'troy@fintech5group.com'
const FROM = 'FinTech 5 <no-reply@fintech5group.com>'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? 'missing')
  try {
    const { firstName, lastName, email, phone, business, businessType, message } = await req.json()

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
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
            { label: 'Phone', value: phone || '—' },
            { label: 'Business', value: business || '—' },
            { label: 'Industry', value: businessType || '—' },
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
        subject: `We got your message — FinTech 5`,
        html: confirmationEmail({
          firstName,
          heading: `Got it, ${firstName}. We'll be in touch.`,
          body: `Thanks for reaching out. A specialist will review your message and get back to you within <strong style="color:#ffffff">one business day</strong>.`,
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
