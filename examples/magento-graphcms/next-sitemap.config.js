/* eslint-disable @typescript-eslint/no-unsafe-argument */
const isProduction = process.env.VERCEL_ENV === 'production'
const DEV_SITE_URL = process.env.VERCEL_URL || 'http://localhost:3000'
const PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || DEV_SITE_URL

/** @link https://github.com/iamvishnusankar/next-sitemap */
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: isProduction ? PUBLIC_SITE_URL : DEV_SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    '/products-sitemap.xml',
    '*/product*',
    '*/account*',
    '*/wishlist*',
    '*/cart*',
    '*/modal*',
    '*/checkout*',
    '*/test/*',
    '/test/*',
    '*/404',
    '*/no-route',
    '*/home',
    '*/switch-stores',
    '*/search',
    '*/account',
    '*/wishlist',
    '*/cart',
    '*/checkout',
  ],
  robotsTxtOptions: {
    policies: [
      ...(isProduction && !process.env.VERCEL_URL.includes('vercel')
        ? []
        : [
            { userAgent: '*', disallow: '/' },
            { userAgent: 'Googlebot-Image', disallow: '/' },
          ]),
      {
        userAgent: '*',
        disallow: ['/switch-stores', '/search', '/account', '/cart', '/checkout', '/wishlist'],
      },
      { userAgent: 'AhrefsSiteAudit', allow: '/' },
      { userAgent: 'AhrefsBot', allow: '/' },
      { userAgent: 'SiteAuditBot', allow: '/' },
    ],
    additionalSitemaps: [`${isProduction ? PUBLIC_SITE_URL : DEV_SITE_URL}/products-sitemap.xml`],
  },
}
