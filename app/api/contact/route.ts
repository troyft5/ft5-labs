import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO = 'info@fintech5group.com'

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, businessType, message } = await req.json()

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'FinTech 5 Website <no-reply@fintech5group.com>',
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
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[/api/contact]', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
