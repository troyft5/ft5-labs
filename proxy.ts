import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // Block direct access to the calculator HTML — logic now lives server-side in /api/calculator
  if (req.nextUrl.pathname.startsWith('/calculator/index.html') ||
      req.nextUrl.pathname === '/calculator/') {
    return NextResponse.redirect(new URL('/calculator', req.url), 301)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/calculator/:path*'],
}
