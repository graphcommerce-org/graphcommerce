import { canonicalize } from '@graphcommerce/next-ui'
import { GetServerSideProps } from 'next'

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale, res, defaultLocale } = context

  if (!locale) throw Error('Locale not found')

  const options = { locale, defaultLocale, pathname: '/', isLocaleDomain: false }
  const configStorefront = import.meta.graphCommerce.storefront
  const storefront = configStorefront.find((s) => s.locale === locale)
  if (!storefront) {
    throw Error(`Locale must be one of: ${configStorefront.map((s) => s.locale).join(', ')}`)
  }

  const sitemaps = ['/sitemap/content.xml', '/sitemap/categories.xml', '/sitemap/products.xml']

  // prettier-ignore
  const robots = [
    ...(
      // Disallow all robots when global setting for robotsAllow is false (or not set)
      !import.meta.graphCommerce.robotsAllow || 
      // or when robotsAllow for the current store is false AND the current store has its own domain or is the default locale 
      // (when a store does not have its own domain, it uses a locale suffix (e.g.: /en-US/). 
      // robot.txt files should always be located in the root, therefore stores without a domain use the global robotsAllow setting)
      (storefront.robotsAllow === false && (storefront.domain || storefront.locale === defaultLocale)) ? 
      [
        `# *`, 
        `User-agent: *`, 
        `Disallow: /`, 
        ``,
      ] : []
    ),

    `# *`,
    `User-agent: *`,
    ...[
      '/switch-stores', 
      '/search', 
      '/account', 
      '/cart', 
      '/checkout', 
      '/wishlist'
    ].map(disallow => `Disallow: ${disallow}`),

    ``,
    `# AhrefsSiteAudit`,
    `User-agent: AhrefsSiteAudit`,
    `Allow: /`,

    ``,
    `# AhrefsBot`,
    `User-agent: AhrefsBot`,
    `Allow: /`,

    ``,
    `# SiteAuditBot`,
    `User-agent: SiteAuditBot`,
    `Allow: /`,

    ``,
    `# Host`,
    `Host: ${canonicalize(options, `/`)}`,

    ``,
    `# Sitemaps`,
    ...(storefront.domain ? 
      // When the current store has its own domain, only show sitemaps for the specific store
      sitemaps.map(sitemap => 
        `Sitemap: ${canonicalize({...options, locale: storefront.locale, defaultLocale: storefront.locale}, `${sitemap}`)}`,
      ) 
      : 
      // When the current store does not have its own domain, show sitemaps for all stores on the same global domain
      configStorefront.filter(store => !store.domain).map((store) => sitemaps.map(sitemap => 
        `Sitemap: ${canonicalize({...options, locale: store.locale}, `${sitemap}`)}`,
      )).flat()
    ),
  ].join(`
`)

  res.setHeader('Content-Type', 'text/plain')
  res.write(robots)
  res.end()

  return {
    props: {},
  }
}

export default function SitemapIndex() {}
