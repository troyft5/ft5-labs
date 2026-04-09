import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const TO = 'info@fintech5group.com'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? 'missing')
  try {
    const { firstName, lastName, email, phone, business, volume, industry, notes, fileData } = await req.json()

    if (!firstName || !email) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const attachments = fileData
      ? [{ filename: fileData.name, content: fileData.content, type: fileData.type }]
      : []

    await resend.emails.send({
      from: 'FinTech 5 Website <no-reply@fintech5group.com>',
      to: TO,
      replyTo: email,
      subject: `New Savings Estimate Request — ${business || firstName}`,
      attachments,
      html: `
        <h2>New Savings Estimate Request</h2>
        <table cellpadding="6" style="font-family:sans-serif;font-size:14px;">
          <tr><td><strong>Name</strong></td><td>${firstName} ${lastName || ''}</td></tr>
          <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone || '—'}</td></tr>
          <tr><td><strong>Business</strong></td><td>${business || '—'}</td></tr>
          <tr><td><strong>Monthly Volume</strong></td><td>${volume || '—'}</td></tr>
          <tr><td><strong>Industry</strong></td><td>${industry || '—'}</td></tr>
          <tr><td><strong>Notes</strong></td><td>${notes || '—'}</td></tr>
          <tr><td><strong>Statement Attached</strong></td><td>${fileData ? `Yes — ${fileData.name}` : 'No'}</td></tr>
        </table>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[/api/estimate]', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
