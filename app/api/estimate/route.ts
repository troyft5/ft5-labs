import { NextRequest, NextResponse } from 'next/server'
import { submitLead, contactUrl } from '@/lib/hubspot'

const TO = 'troy@fintech5group.com'
const FROM = 'FinTech 5 <no-reply@fintech5group.com>'

const confirmationHtml = (firstName: string) => `
<div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0f1a0f;color:#ffffff;border-radius:12px;overflow:hidden">
  <div style="height:4px;background:linear-gradient(90deg,#2d5500,#6fc200)"></div>
  <div style="padding:40px 36px">
    <div style="margin-bottom:32px;display:inline-block">
      <span style="font-size:22px;font-weight:900;font-style:italic;color:#ffffff;letter-spacing:-0.5px">Fin<span style="color:#6fc200">Tech</span> 5</span>
    </div>
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

    const contactId = await submitLead({
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
      statementFile: fileData ?? undefined,
    })

    const apiKey = process.env.RESEND_API_KEY
    if (apiKey && apiKey !== 'missing' && apiKey.startsWith('re_')) {
      const { Resend } = await import('resend')
      const resend = new Resend(apiKey)

      const attachments = fileData
        ? [{ filename: fileData.name, content: fileData.content, contentType: fileData.type }]
        : []

      const hsUrl = contactId ? contactUrl(contactId) : null
      const fileName = fileData ? fileData.name : null

      const results = await Promise.all([
        resend.emails.send({
          from: FROM,
          to: TO,
          replyTo: email,
          subject: `New Savings Estimate Request — ${business || firstName}`,
          attachments,
          html: `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
  <div style="background:#0f1a0f;padding:24px 32px;display:flex;align-items:center;gap:12px">
    <span style="font-size:20px;font-weight:900;font-style:italic;letter-spacing:-0.5px;color:#ffffff">Fin<span style="color:#6fc200">Tech</span> 5</span>
    <span style="margin-left:auto;font-size:11px;font-weight:700;color:#6fc200;text-transform:uppercase;letter-spacing:0.15em">Internal Notification</span>
  </div>
  <div style="background:#f0fdf0;border-bottom:1px solid #bbf7d0;padding:20px 32px">
    <p style="margin:0;font-size:11px;font-weight:700;color:#15803d;text-transform:uppercase;letter-spacing:0.1em">New Savings Estimate Request</p>
    <p style="margin:6px 0 0;font-size:24px;font-weight:900;color:#0f1a0f">${business || firstName}</p>
  </div>
  <div style="padding:0 32px 24px">
    <table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;border-collapse:collapse;color:#0f172a">
      <tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#64748b;width:38%;font-size:13px">Name</td><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#0f172a">${firstName} ${lastName || ''}</td></tr>
      <tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px">Email</td><td style="padding:12px 0;border-bottom:1px solid #f1f5f9"><a href="mailto:${email}" style="color:#16a34a;font-weight:600">${email}</a></td></tr>
      <tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px">Phone</td><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#0f172a">${phone || '—'}</td></tr>
      <tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px">Business</td><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#0f172a">${business || '—'}</td></tr>
      <tr style="background:#f0fdf4"><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px;padding-left:8px">Monthly Volume</td><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-weight:800;color:#15803d;font-size:15px">${volume || '—'}</td></tr>
      <tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px">Industry</td><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#0f172a">${industry || '—'}</td></tr>
      <tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px">Current Processor</td><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#0f172a">${currentProcessor || '—'}</td></tr>
      <tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px">Hardware / Terminal</td><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#0f172a">${hardwareType || '—'}</td></tr>
      <tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px">Card Method</td><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#0f172a">${cardMethod || '—'}</td></tr>
      <tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px">Notes</td><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#334155">${notes || '—'}</td></tr>
      <tr><td style="padding:12px 0;color:#64748b;font-size:13px">Statement</td><td style="padding:12px 0;font-weight:700;color:#0f172a">${fileName ? `✓ Attached` : '—'}</td></tr>
    </table>
    <div style="margin-top:20px">
      ${hsUrl ? `<a href="${hsUrl}" style="display:inline-block;background:#15803d;color:#ffffff;font-weight:700;font-size:13px;padding:12px 24px;border-radius:8px;text-decoration:none">View in HubSpot →</a>` : ''}
    </div>
  </div>
  <div style="padding:16px 32px;background:#f8fafc;border-top:1px solid #e2e8f0">
    <p style="margin:0;font-size:11px;color:#94a3b8">FinTech 5 Group · troy@fintech5group.com · (646) 941-7853</p>
  </div>
</div>
          `,
        }),
        resend.emails.send({
          from: FROM,
          to: email,
          replyTo: TO,
          subject: `We received your request — FinTech 5`,
          html: confirmationHtml(firstName),
        }),
      ])
      for (const r of results) {
        if (r && typeof r === 'object' && 'error' in r && (r as { error?: unknown }).error) {
          console.error('[/api/estimate] resend error', (r as { error: unknown }).error)
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[/api/estimate]', err)
    return NextResponse.json({ success: true })
  }
}
