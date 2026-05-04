import { NextResponse } from 'next/server'

// This is a demo middleware to show how it works in the learning portal
export function proxy() {
  // In a real app, you would check for a session token here
  // const token = request.cookies.get('session')
  
  // Example: Add a custom header to all requests
  const response = NextResponse.next()
  response.headers.set('x-learn-next-version', '1.0.0')
  
  return response
}

export const config = {
  // Matcher allows you to filter Middleware to run on specific paths
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
