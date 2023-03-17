/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */

const { loadConfig } = require('@graphcommerce/next-config')
require('dotenv').config()

const config = loadConfig(process.cwd())
const allowRobots = config.robotsAllow

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
    additionalSitemaps: config.storefront.map((storefront) => {
      if (!storefront.canonicalBaseUrl) {
        const prefix = storefront.defaultLocale ? '' : `/${storefront.locale}`
        return `${config.canonicalBaseUrl}${prefix}/products-sitemap.xml`
      }
      return `${storefront.canonicalBaseUrl}/products-sitemap.xml`
    }),
  },
}
