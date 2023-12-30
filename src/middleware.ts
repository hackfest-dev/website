import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

export async function middleware(request: NextRequest) {
  const session = await auth();
  if (!session) {
    console.log('redirecting');
    return NextResponse.redirect(new URL('/api/auth/signin', request.url));
  } else if (session.user.role != 'ADMIN') {
    console.log(session.user.role);
    return NextResponse.redirect(new URL('/', request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
