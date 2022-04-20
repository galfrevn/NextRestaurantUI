import { NextResponse } from 'next/server'

export function middleware(req) {
  const basicAuth = req.headers.get('authorization')

  if (basicAuth) {
    const auth = basicAuth.split(' ')[1]
    const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':')

    if (user === 'admin' && pwd === 'admin') {
      return NextResponse.next()
    }
  }

  return new Response('Auth is required for admin powers', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}