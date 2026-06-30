import { NextRequest, NextResponse } from 'next/server'
import { setupHubSpotProperties } from '@/lib/hubspot'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-setup-secret')
  if (secret !== process.env.HUBSPOT_SETUP_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  await setupHubSpotProperties()
  return NextResponse.json({ ok: true })
}
