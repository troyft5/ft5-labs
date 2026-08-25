import { NextRequest, NextResponse } from 'next/server'
import { upsertContact } from '@/lib/crm'
import { verifyTurnstile } from '@/lib/turnstile'
import { isRateLimited } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  try {
    const { email, hp, turnstileToken } = await req.json()

    // Honeypot — bots fill every field, including this hidden one. Pretend success.
    if (hp) return NextResponse.json({ success: true })

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    const ip = req.headers.get('cf-connecting-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

    if (isRateLimited(`newsletter:${ip}`, 10, 10 * 60_000)) {
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 })
    }

    if (!(await verifyTurnstile(turnstileToken, 'newsletter', ip))) {
      return NextResponse.json({ error: 'Verification failed. Please try again.' }, { status: 403 })
    }

    await upsertContact({ email })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[/api/newsletter]', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
