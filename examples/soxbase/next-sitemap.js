module.exports = {
  siteUrl: process.env.VERCEL_URL ?? 'http://localhost:3000',
  generateRobotsTxt: true,
  exclude: ['*/account*', '*/cart*', '*/checkout*', '*/test'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', disallow: '/' }],
  },
}
