module.exports = {
  siteUrl: 'https://graphcommerce.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', disallow: '/' }],
  },
}
