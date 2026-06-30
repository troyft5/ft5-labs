import { NextRequest, NextResponse } from 'next/server'
import { submitLead } from '@/lib/hubspot'

const TO = 'info@fintech5group.com'

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
        ? [{ filename: fileData.name, content: fileData.content, type: fileData.type }]
        : []

      tasks.push(
        resend.emails.send({
          from: 'FinTech 5 Website <no-reply@fintech5group.com>',
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
        })
      )
    }

    await Promise.all(tasks)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[/api/estimate]', err)
    return NextResponse.json({ success: true })
  }
}
