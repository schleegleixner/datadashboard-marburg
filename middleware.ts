// middleware.ts – Edge Runtime
import { NextRequest, NextResponse } from 'next/server'

const password = process.env.PASSWORD
const cookie_name = '__edge_auth'

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl
  const host = req.headers.get('host') ?? 'localhost:3000'
  const protocol = req.headers.get('x-forwarded-proto') ?? 'http'

  // Basis-Response anlegen, URL reinpacken
  const res = NextResponse.next()
  res.headers.set('x-full-url', `${protocol}://${host}${pathname}${search}`)

  if (pathname.startsWith('/api')) {
    res.headers.set('Access-Control-Allow-Origin', '*')
    res.headers.set(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE',
    )
    res.headers.set(
      'Access-Control-Allow-Headers',
      req.headers.get('Access-Control-Request-Headers') ?? 'Content-Type',
    )

    if (req.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200, headers: res.headers })
    }

    return res
  }

  if (!password || pathname.startsWith('/_next')) {
    return res
  }

  // Cookie-Check
  const cookie = req.cookies.get(cookie_name)?.value
  if (cookie === password) return res

  // Header-Check
  const auth_header = req.headers.get('authorization') ?? ''
  const [scheme, encoded] = auth_header.split(' ')
  if (scheme === 'Basic' && encoded) {
    const [user, pass] = atob(encoded).split(':')
    if (user === 'marburg' && pass === password) {
      res.cookies.set({
        name: cookie_name,
        value: password,
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 Woche
      })
      return res
    }
  }

  return new NextResponse('Auth required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Locked Area"' },
  })
}

/* Läuft überall – wir regeln intern, was rausfliegt. */
export const config = { matcher: '/:path*' }
