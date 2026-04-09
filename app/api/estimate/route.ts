import { NextRequest, NextResponse } from 'next/server'

// Set HUBSPOT_PORTAL_ID and HUBSPOT_ESTIMATE_FORM_ID in your .env.local
const PORTAL_ID = process.env.HUBSPOT_PORTAL_ID
const FORM_ID   = process.env.HUBSPOT_ESTIMATE_FORM_ID

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, phone, business, volume, industry, notes } = body

    if (!firstName || !email) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    if (PORTAL_ID && FORM_ID) {
      const hsRes = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [
              { name: 'firstname',              value: firstName },
              { name: 'lastname',               value: lastName || '' },
              { name: 'email',                  value: email },
              { name: 'phone',                  value: phone || '' },
              { name: 'company',                value: business || '' },
              { name: 'monthly_processing_volume', value: volume || '' },
              { name: 'industry',               value: industry || '' },
              { name: 'message',                value: notes || '' },
            ],
            context: {
              pageUri: 'https://fintech5group.com/get-your-savings-estimate',
              pageName: 'Get Your Savings Estimate',
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

    console.log('[Estimate form submission]', { firstName, lastName, email, business, volume, industry })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[/api/estimate]', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
