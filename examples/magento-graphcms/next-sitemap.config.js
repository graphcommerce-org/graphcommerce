/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */

const { loadConfig } = require('@graphcommerce/next-config')
require('dotenv').config()

const config = loadConfig(process.cwd())
const allowRobots = config.robotsAllow && config.deployEnvironment === 'production'

/** @link https://github.com/iamvishnusankar/next-sitemap */
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: config.canonicalBaseUrl,
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
      ...(allowRobots ? [{ userAgent: '*', disallow: '/' }] : []),
      {
        userAgent: '*',
        disallow: ['/switch-stores', '/search', '/account', '/cart', '/checkout', '/wishlist'],
      },
      { userAgent: 'AhrefsSiteAudit', allow: '/' },
      { userAgent: 'AhrefsBot', allow: '/' },
      { userAgent: 'SiteAuditBot', allow: '/' },
    ],
    additionalSitemaps: config.i18n.map((i18n) => {
      if (!i18n.canonicalBaseUrl) {
        const prefix = i18n.defaultLocale ? '' : `/${i18n.locale}`
        return `${config.canonicalBaseUrl}${prefix}/products-sitemap.xml`
      }
      return `${i18n.canonicalBaseUrl}/products-sitemap.xml`
    }),
  },
}
