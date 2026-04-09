import { NextRequest, NextResponse } from 'next/server'

// HubSpot submission endpoint
// Set HUBSPOT_PORTAL_ID and HUBSPOT_CONTACT_FORM_ID in your .env.local
const PORTAL_ID   = process.env.HUBSPOT_PORTAL_ID
const FORM_ID     = process.env.HUBSPOT_CONTACT_FORM_ID

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, phone, businessType, message } = body

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    // If HubSpot credentials are configured, submit there
    if (PORTAL_ID && FORM_ID) {
      const hsRes = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [
              { name: 'firstname',    value: firstName },
              { name: 'lastname',     value: lastName || '' },
              { name: 'email',        value: email },
              { name: 'phone',        value: phone || '' },
              { name: 'company',      value: businessType || '' },
              { name: 'message',      value: message },
            ],
            context: {
              pageUri: 'https://fintech5group.com/contact-us',
              pageName: 'Contact Us',
            },
          }),
        }
      )

      if (!hsRes.ok) {
        const err = await hsRes.text()
        console.error('HubSpot error:', err)
        return NextResponse.json({ error: 'Failed to submit to CRM.' }, { status: 502 })
      }
    }

    // Always log on server for visibility
    console.log('[Contact form submission]', { firstName, lastName, email, phone, businessType })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[/api/contact]', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
