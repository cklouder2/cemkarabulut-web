import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Turkish URL mappings
const turkishUrls: Record<string, string> = {
  '/hakkimda': '/about',
  '/deneyim': '/experience', 
  '/projeler': '/projects',
  '/yetenekler': '/skills',
  '/iletisim': '/contact'
}

// Reverse mapping for redirects
const englishUrls: Record<string, string> = {
  '/about': '/hakkimda',
  '/experience': '/deneyim',
  '/projects': '/projeler', 
  '/skills': '/yetenekler',
  '/contact': '/iletisim'
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Remove trailing slash for matching
  const cleanPathname = pathname.replace(/\/$/, '')
  
  // Check if it's a Turkish URL
  if (turkishUrls[cleanPathname]) {
    // Rewrite to English URL internally but keep Turkish URL in browser
    const url = request.nextUrl.clone()
    url.pathname = turkishUrls[cleanPathname]
    return NextResponse.rewrite(url)
  }
  
  // Check if it's an English URL and we should redirect to Turkish
  // This is optional - you can remove this if you want to keep English URLs as default
  if (englishUrls[cleanPathname]) {
    // For now, we'll keep English URLs as default
    // Uncomment below if you want to redirect English URLs to Turkish
    /*
    const url = request.nextUrl.clone()
    url.pathname = englishUrls[cleanPathname]
    return NextResponse.redirect(url)
    */
  }
  
  return NextResponse.next()
}

export const config = {
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