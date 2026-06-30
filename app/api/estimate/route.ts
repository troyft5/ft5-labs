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
      const hsLink = hsUrl ? `<br><br><a href="${hsUrl}" style="color:#0f6bff">View in HubSpot →</a>` : ''

      const fileName = fileData
        ? fileData.name.length > 60 ? fileData.name.slice(0, 57) + '…' : fileData.name
        : null

      const results = await Promise.all([
        resend.emails.send({
          from: FROM,
          to: TO,
          replyTo: email,
          subject: `New Savings Estimate Request — ${business || firstName}`,
          attachments,
          html: `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0f1a0f;border-radius:12px;overflow:hidden;color:#ffffff">
  <div style="height:4px;background:linear-gradient(90deg,#2d5500,#6fc200)"></div>
  <div style="padding:32px 36px 24px">
    <div style="margin-bottom:20px">
      <span style="font-size:20px;font-weight:900;font-style:italic;letter-spacing:-0.5px">Fin<span style="color:#6fc200">Tech</span> 5</span>
    </div>
    <div style="background:rgba(78,144,0,0.15);border-left:3px solid #6fc200;padding:12px 16px;border-radius:0 8px 8px 0;margin-bottom:24px">
      <p style="margin:0;font-size:13px;font-weight:700;color:#6fc200;text-transform:uppercase;letter-spacing:0.1em">New Savings Estimate Request</p>
      <p style="margin:4px 0 0;font-size:22px;font-weight:900;color:#ffffff">${business || firstName}</p>
    </div>
    <table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;border-collapse:collapse">
      <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#94a3b8;width:40%">Name</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-weight:600">${firstName} ${lastName || ''}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#94a3b8">Email</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07)"><a href="mailto:${email}" style="color:#6fc200">${email}</a></td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#94a3b8">Phone</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-weight:600">${phone || '—'}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#94a3b8">Business</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-weight:600">${business || '—'}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#94a3b8">Monthly Volume</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-weight:600;color:#6fc200">${volume || '—'}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#94a3b8">Industry</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-weight:600">${industry || '—'}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#94a3b8">Current Processor</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-weight:600">${currentProcessor || '—'}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#94a3b8">Hardware / Terminal</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-weight:600">${hardwareType || '—'}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#94a3b8">Card Method</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-weight:600">${cardMethod || '—'}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#94a3b8">Notes</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07)">${notes || '—'}</td></tr>
      <tr><td style="padding:10px 0;color:#94a3b8">Statement</td><td style="padding:10px 0;font-weight:600">${fileName ? `✓ Attached — ${fileName}` : 'None'}</td></tr>
    </table>
    <div style="margin-top:24px">
      ${hsUrl ? `<a href="${hsUrl}" style="display:inline-block;background:#4e9000;color:#ffffff;font-weight:700;font-size:13px;padding:12px 24px;border-radius:8px;text-decoration:none">View in HubSpot →</a>` : ''}
    </div>
  </div>
  <div style="padding:16px 36px;border-top:1px solid rgba(255,255,255,0.06)">
    <p style="margin:0;font-size:11px;color:#475569">FinTech 5 Group · troy@fintech5group.com · (646) 941-7853</p>
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
