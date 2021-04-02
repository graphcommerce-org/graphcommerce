const siteUrls = {
  development: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000',
  production: 'https://graphcommerce.vercel.app',
}

module.exports = {
  siteUrl: siteUrls[process.env.NODE_ENV] || siteUrls.development,
  generateRobotsTxt: true,
  exclude: ['*/account*', '*/cart*', '*/checkout*', '*/test/*', '/test/*'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', disallow: '/' }],
  },
}
