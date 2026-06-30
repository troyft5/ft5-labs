import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { submitLead } from '@/lib/hubspot'

const TO   = 'info@fintech5group.com'
const FROM = 'FinTech 5 <no-reply@fintech5group.com>'

const confirmationHtml = (firstName: string) => `
<div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0f1a0f;color:#ffffff;border-radius:12px;overflow:hidden">
  <div style="height:4px;background:linear-gradient(90deg,#2d5500,#6fc200)"></div>
  <div style="padding:40px 36px">
    <img src="https://fintech5group.com/Logos/FT5_White_Green.svg" alt="FinTech 5" style="height:36px;margin-bottom:32px" />
    <h1 style="font-size:24px;font-weight:900;margin:0 0 12px;color:#ffffff">Got it, ${firstName}. We'll be in touch.</h1>
    <p style="color:#94a3b8;line-height:1.6;margin:0 0 24px">
      Thanks for reaching out. A specialist will review your message and get back to you within <strong style="color:#ffffff">one business day</strong>.
    </p>
    <div style="background:rgba(78,144,0,0.1);border:1px solid rgba(78,144,0,0.25);border-radius:10px;padding:20px 24px;margin-bottom:28px">
      <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#6fc200;text-transform:uppercase;letter-spacing:0.1em">While you wait</p>
      <ul style="margin:0;padding-left:20px;color:#94a3b8;line-height:2">
        <li>Try our <a href="https://fintech5group.com/calculator" style="color:#6fc200;text-decoration:none">free fee calculator</a> to estimate your savings</li>
        <li>Upload a statement for a <a href="https://fintech5group.com/get-your-savings-estimate" style="color:#6fc200;text-decoration:none">full free audit</a></li>
        <li>Browse our <a href="https://fintech5group.com/blog" style="color:#6fc200;text-decoration:none">payment processing insights</a></li>
      </ul>
    </div>
    <p style="color:#64748b;font-size:13px;margin:0 0 24px">
      Need something urgent? Call us at <a href="tel:6469417853" style="color:#6fc200;text-decoration:none">(646) 941-7853</a>.
    </p>
    <a href="https://fintech5group.com" style="display:inline-block;background:#4e9000;color:#ffffff;font-weight:900;font-size:14px;padding:14px 28px;border-radius:8px;text-decoration:none">Visit FinTech 5</a>
  </div>
  <div style="padding:20px 36px;border-top:1px solid rgba(255,255,255,0.06)">
    <p style="margin:0;font-size:11px;color:#475569">FinTech 5 Group · info@fintech5group.com · (646) 941-7853<br>You're receiving this because you contacted us through fintech5group.com.</p>
  </div>
</div>
`

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? 'missing')
  try {
    const { firstName, lastName, email, phone, businessType, message } = await req.json()

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const [internalResult, clientResult] = await Promise.all([
      // Internal notification
      resend.emails.send({
        from: FROM,
        to: TO,
        replyTo: email,
        subject: `New Contact: ${firstName} ${lastName || ''}`.trim(),
        html: `
          <h2>New Contact Form Submission</h2>
          <table cellpadding="6" style="font-family:sans-serif;font-size:14px;">
            <tr><td><strong>Name</strong></td><td>${firstName} ${lastName || ''}</td></tr>
            <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td><strong>Phone</strong></td><td>${phone || '—'}</td></tr>
            <tr><td><strong>Industry</strong></td><td>${businessType || '—'}</td></tr>
            <tr><td><strong>Message</strong></td><td>${message}</td></tr>
          </table>
        `,
      }),
      // Client confirmation
      resend.emails.send({
        from: FROM,
        to: email,
        replyTo: TO,
        subject: `We got your message — FinTech 5`,
        html: confirmationHtml(firstName),
      }),
      submitLead({
        email,
        firstname: firstName,
        lastname: lastName || undefined,
        phone: phone || undefined,
        industry: businessType || undefined,
        message: message || undefined,
        lifecyclestage: 'lead',
        hs_lead_status: 'NEW',
        createDeal: true,
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
