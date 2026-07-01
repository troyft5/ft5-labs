import { NextRequest, NextResponse } from 'next/server'
import { submitLead, crmContactUrl } from '@/lib/crm'
import { confirmationEmail, internalNotificationEmail } from '@/lib/email-templates'

const TO = 'troy@fintech5group.com'
const FROM = 'FinTech 5 <no-reply@fintech5group.com>'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      firstName, lastName, email, phone, business, volume, industry,
      notes, fileData, currentProcessor, hardwareType, cardMethod,
      referralPartner, referralSource,
    } = body

    if (!firstName || !email) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const contactId = await submitLead('estimate', {
      email,
      firstName,
      lastName: lastName || undefined,
      phone: phone || undefined,
      industry: industry || undefined,
      message: [notes, referralSource ? `Referred by: ${referralSource}` : null].filter(Boolean).join('\n') || undefined,
      monthlyVolume: volume || undefined,
      currentProcessor: currentProcessor || undefined,
      hardwareType: hardwareType || undefined,
      cardMethod: cardMethod || undefined,
      businessName: business || undefined,
      createDeal: true,
      statementFile: fileData ?? undefined,
      sourceUrl: req.headers.get('referer') || undefined,
    })

    const apiKey = process.env.RESEND_API_KEY
    if (apiKey && apiKey !== 'missing' && apiKey.startsWith('re_')) {
      const { Resend } = await import('resend')
      const resend = new Resend(apiKey)

      const attachments = fileData
        ? [{ filename: fileData.name, content: fileData.content, contentType: fileData.type }]
        : []

      const crmUrl = contactId ? crmContactUrl(contactId) : null
      const fileName = fileData ? fileData.name : null

      const results = await Promise.all([
        resend.emails.send({
          from: FROM,
          to: TO,
          replyTo: email,
          subject: `New Savings Estimate Request — ${business || firstName}`,
          attachments,
          html: internalNotificationEmail({
            category: 'New Savings Estimate Request',
            headline: business || firstName,
            rows: [
              { label: 'Name', value: `${firstName} ${lastName || ''}`.trim() },
              { label: 'Email', value: `<a href="mailto:${email}" style="color:#16a34a;font-weight:700;text-decoration:none">${email}</a>` },
              { label: 'Phone', value: phone || '—' },
              { label: 'Business', value: business || '—' },
              { label: 'Monthly Volume', value: volume || '—', highlight: true },
              { label: 'Industry', value: industry || '—' },
              { label: 'Current Processor', value: currentProcessor || '—' },
              { label: 'Hardware / Terminal', value: hardwareType || '—' },
              { label: 'Card Method', value: cardMethod || '—' },
              { label: 'Notes', value: notes || '—' },
              { label: 'Statement', value: fileName ? '✓ Attached' : '—' },
              ...(referralSource ? [{ label: 'Referred By', value: referralSource, highlight: true }] : []),
            ],
            crmUrl,
            replyToEmail: email,
          }),
        }),
        resend.emails.send({
          from: FROM,
          to: email,
          replyTo: TO,
          subject: `We received your request — FinTech 5`,
          html: confirmationEmail({
            firstName,
            heading: `We received your request, ${firstName}.`,
            body: `Our team is reviewing your submission. You'll hear back from us within <strong style="color:#ffffff">one business day</strong> with a full breakdown of your current fees and what competitive pricing looks like for your business.`,
            stepsTitle: 'What happens next',
            steps: [
              'We analyze your statement line by line',
              'We compare against 10+ processors in our network',
              'We send you the full report — free, no obligation',
            ],
          }),
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
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
