import { NextRequest, NextResponse } from 'next/server'

const APEX = 'fintech5group.com'

export function middleware(req: NextRequest) {
  const host = (req.headers.get('host') || '').replace(/:\d+$/, '')
  if (host === `www.${APEX}`) {
    const url = req.nextUrl.clone()
    url.protocol = 'https:'
    url.hostname = APEX
    url.port = ''
    return NextResponse.redirect(url, 301)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2)$).*)'],
}
