import { NextRequest, NextResponse } from 'next/server'
import { upsertContact } from '@/lib/crm'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    await upsertContact({ email })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[/api/newsletter]', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
