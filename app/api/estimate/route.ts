import { NextRequest, NextResponse } from 'next/server'
import { submitLead } from '@/lib/hubspot'

const TO = 'info@fintech5group.com'
const FROM = 'FinTech 5 <no-reply@fintech5group.com>'

const confirmationHtml = (firstName: string) => `
<div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0f1a0f;color:#ffffff;border-radius:12px;overflow:hidden">
  <div style="height:4px;background:linear-gradient(90deg,#2d5500,#6fc200)"></div>
  <div style="padding:40px 36px">
    <img src="https://fintech5group.com/Logos/FT5_White_Green.svg" alt="FinTech 5" style="height:36px;margin-bottom:32px" />
    <h1 style="font-size:24px;font-weight:900;margin:0 0 12px;color:#ffffff">We received your request, ${firstName}.</h1>
    <p style="color:#94a3b8;line-height:1.6;margin:0 0 24px">
      Our team is reviewing your submission. You'll hear back from us within <strong style="color:#ffffff">one business day</strong> with a full breakdown of your current fees and what competitive pricing looks like for your business.
    </p>
    <div style="background:rgba(78,144,0,0.1);border:1px solid rgba(78,144,0,0.25);border-radius:10px;padding:20px 24px;margin-bottom:28px">
      <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#6fc200;text-transform:uppercase;letter-spacing:0.1em">What happens next</p>
      <ul style="margin:0;padding-left:20px;color:#94a3b8;line-height:2">
        <li>We analyze your statement line by line</li>
        <li>We compare against 10+ processors in our network</li>
        <li>We send you the full report — free, no obligation</li>
      </ul>
    </div>
    <p style="color:#64748b;font-size:13px;margin:0 0 24px">
      Questions in the meantime? Reply to this email or call us at <a href="tel:6469417853" style="color:#6fc200;text-decoration:none">(646) 941-7853</a>.
    </p>
    <a href="https://fintech5group.com" style="display:inline-block;background:#4e9000;color:#ffffff;font-weight:900;font-size:14px;padding:14px 28px;border-radius:8px;text-decoration:none">Visit FinTech 5</a>
  </div>
  <div style="padding:20px 36px;border-top:1px solid rgba(255,255,255,0.06)">
    <p style="margin:0;font-size:11px;color:#475569">FinTech 5 Group · info@fintech5group.com · (646) 941-7853<br>You're receiving this because you submitted a savings estimate request.</p>
  </div>
</div>
`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      firstName, lastName, email, phone, business, volume, industry,
      notes, fileData, currentProcessor, hardwareType, cardMethod,
    } = body

    if (!firstName || !email) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const leadSummary = `
New Savings Estimate Request
-----------------------------
Name:              ${firstName} ${lastName || ''}
Email:             ${email}
Phone:             ${phone || '—'}
Business:          ${business || '—'}
Volume:            ${volume || '—'}
Industry:          ${industry || '—'}
Current Processor: ${currentProcessor || '—'}
Hardware/Terminal: ${hardwareType || '—'}
Card Method:       ${cardMethod || '—'}
Notes:             ${notes || '—'}
Statement:         ${fileData ? `Yes — ${fileData.name}` : 'No'}
    `.trim()

    console.log('[lead]', leadSummary)

    const tasks: Promise<unknown>[] = [
      submitLead({
        email,
        firstname: firstName,
        lastname: lastName || undefined,
        phone: phone || undefined,
        industry: industry || undefined,
        message: notes || undefined,
        lifecyclestage: 'lead',
        hs_lead_status: 'NEW',
        monthly_processing_volume: volume || undefined,
        current_processor: currentProcessor || undefined,
        hardware_type: hardwareType || undefined,
        card_acceptance_method: cardMethod || undefined,
        businessName: business || undefined,
        createDeal: true,
      }),
    ]

    const apiKey = process.env.RESEND_API_KEY
    if (apiKey && apiKey !== 'missing' && apiKey.startsWith('re_')) {
      const { Resend } = await import('resend')
      const resend = new Resend(apiKey)

      const attachments = fileData
        ? [{ filename: fileData.name, content: fileData.content, contentType: fileData.type }]
        : []

      tasks.push(
        // Internal notification
        resend.emails.send({
          from: FROM,
          to: TO,
          replyTo: email,
          subject: `New Savings Estimate Request — ${business || firstName}`,
          attachments,
          html: `
            <h2 style="font-family:sans-serif">New Savings Estimate Request</h2>
            <table cellpadding="6" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
              <tr><td><strong>Name</strong></td><td>${firstName} ${lastName || ''}</td></tr>
              <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td><strong>Phone</strong></td><td>${phone || '—'}</td></tr>
              <tr><td><strong>Business</strong></td><td>${business || '—'}</td></tr>
              <tr><td><strong>Monthly Volume</strong></td><td>${volume || '—'}</td></tr>
              <tr><td><strong>Industry</strong></td><td>${industry || '—'}</td></tr>
              <tr><td><strong>Current Processor</strong></td><td>${currentProcessor || '—'}</td></tr>
              <tr><td><strong>Hardware / Terminal</strong></td><td>${hardwareType || '—'}</td></tr>
              <tr><td><strong>Card Method</strong></td><td>${cardMethod || '—'}</td></tr>
              <tr><td><strong>Notes</strong></td><td>${notes || '—'}</td></tr>
              <tr><td><strong>Statement Attached</strong></td><td>${fileData ? `Yes — ${fileData.name}` : 'No'}</td></tr>
            </table>
          `,
        }),
        // Client confirmation
        resend.emails.send({
          from: FROM,
          to: email,
          replyTo: TO,
          subject: `We received your request — FinTech 5`,
          html: confirmationHtml(firstName),
        })
      )
    }

    const results = await Promise.all(tasks)
    for (const r of results) {
      if (r && typeof r === 'object' && 'error' in r && (r as { error?: unknown }).error) {
        console.error('[/api/estimate] resend error', (r as { error: unknown }).error)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[/api/estimate]', err)
    return NextResponse.json({ success: true })
  }
}
