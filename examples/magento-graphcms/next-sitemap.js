const isProduction = process.env.VERCEL_ENV === 'production'
const DEV_SITE_URL = process.env.VERCEL_URL || 'http://localhost:3000'
const PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || DEV_SITE_URL

/** @link https://github.com/iamvishnusankar/next-sitemap */
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: isProduction ? PUBLIC_SITE_URL : DEV_SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    '*/account*',
    '*/cart*',
    '*/checkout*',
    '*/test/*',
    '/test/*',
    '*/404',
    '*/no-route',
    '*/home',
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: '/' },
      { userAgent: 'Googlebot-Image', disallow: '/' },
    ],
  },
}
