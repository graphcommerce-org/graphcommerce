const isProduction = process.env.NODE_ENV === 'production'
const DEV_SITE_URL = process.env.VERCEL_URL || 'http://localhost:3000'
const PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || DEV_SITE_URL

module.exports = {
  siteUrl: isProduction ? PUBLIC_SITE_URL : DEV_SITE_URL,
  generateRobotsTxt: true,
  exclude: ['*/account*', '*/cart*', '*/checkout*', '*/test/*', '/test/*'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', disallow: '/' }],
  },
}
