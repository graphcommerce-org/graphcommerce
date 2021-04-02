const siteUrls = {
  development: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000',
  production: process.env.NEXT_PUBLIC_SITE_URL,
}

module.exports = {
  siteUrl: siteUrls[process.env.NODE_ENV] || siteUrls.development,
  generateRobotsTxt: true,
  exclude: ['*/account*', '*/cart*', '*/checkout*', '*/test/*', '/test/*'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', disallow: '/' }],
  },
}
