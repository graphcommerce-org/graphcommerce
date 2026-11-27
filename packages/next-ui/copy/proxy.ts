export { proxy } from '@graphcommerce/next-ui/proxy'

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets (_next/static, _next/image,
     * api routes, and files with extensions like .png, .js, .css, etc.).
     * Further filtering is handled by proxy plugins.
     */
    '/((?!api|_next/static|_next/image|.*\\..*).*)',
  ],
}
