/* eslint-disable @typescript-eslint/no-unsafe-argument */
const isProduction = process.env.VERCEL_ENV === 'production'
const DEV_SITE_URL = process.env.VERCEL_URL || 'http://localhost:3000'
const PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || DEV_SITE_URL
const PUBLIC_LOCALE_STORES = process.env.NEXT_PUBLIC_LOCALE_STORES

const indexableIfProduction =
  isProduction && !process.env.VERCEL_URL.includes('vercel')
    ? []
    : [
        { userAgent: '*', disallow: '/' },
        { userAgent: 'Googlebot-Image', disallow: '/' },
      ]

/** @link https://github.com/iamvishnusankar/next-sitemap */
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: isProduction ? PUBLIC_SITE_URL : DEV_SITE_URL,
  generateRobotsTxt: true,
  // eslint-disable-next-line @typescript-eslint/require-await
  transform: async (config, path) => {
    // @todo: split into sitemap per language https://github.com/iamvishnusankar/next-sitemap/issues/370
    const locales = Object.keys(JSON.parse(PUBLIC_LOCALE_STORES))
    if (locales.some((locale) => path.includes(locale))) {
      return null
    }

    // define alternative hreflangs as required https://github.com/iamvishnusankar/next-sitemap
    const alternateRefs = locales.slice(1).map((locale) => ({
      ...locale,
      href: `${isProduction ? PUBLIC_SITE_URL : DEV_SITE_URL}/${locale}`,
      hreflang: locale,
    }))

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: alternateRefs.length === 0 ? null : alternateRefs,
    }
  },

  exclude: [
    '*/account*',
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
      { userAgent: '*', disallow: ['/switch-stores', '/search', '/account', '/cart', '/checkout'] },
      { userAgent: 'AhrefsSiteAudit', allow: '/' },
      { userAgent: 'AhrefsBot', allow: '/' },
      { userAgent: 'SiteAuditBot', allow: '/' },
    ],
  },
}
