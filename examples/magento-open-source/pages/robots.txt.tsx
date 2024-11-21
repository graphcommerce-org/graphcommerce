import {
  canonicalize,
  getServerSidePropsRobotsTxt,
  robotsTxt,
  storefrontAll,
  storefrontConfig,
} from '@graphcommerce/next-ui'
import type { GetServerSideProps } from 'next'

const sitemapRoutes = ['/sitemap/content.xml', '/sitemap/categories.xml', '/sitemap/products.xml']

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context
  const storefront = storefrontConfig(locale)

  if (!storefront) return { notFound: true }

  const allStores = storefront.domain
    ? storefrontAll.filter((store) => store.domain === storefront.domain)
    : storefrontAll.filter((store) => !store.domain)

  const checkStore = allStores.find((store) => store.defaultLocale) ?? allStores[0]
  if (storefront !== checkStore) return { notFound: true }

  const robotsAllow =
    typeof storefront.robotsAllow === 'boolean'
      ? storefront.robotsAllow
      : import.meta.graphCommerce.robotsAllow

  const sitemaps = allStores
    .flatMap((store) =>
      sitemapRoutes.map((route) => {
        const options = {
          defaultLocale: storefront.locale,
          pathname: '/',
          isLocaleDomain: false,
          locale: store.locale,
        }
        const url = canonicalize(options, route)
        return `Sitemap: ${url}`
      }),
    )
    .join('\n')

  const robots = robotsTxt`
    ${!robotsAllow && 'User-agent: *'}
    ${!robotsAllow && 'Disallow: /'}

    User-agent: *
    Disallow: /switch-stores
    Disallow: /search
    Disallow: /account
    Disallow: /cart
    Disallow: /checkout
    Disallow: /wishlist

    User-agent: AhrefsSiteAudit
    Allow: /

    User-agent: AhrefsBot
    Allow: /

    User-agent: SiteAuditBot
    Allow: /

    # Sitemaps
    ${sitemaps}
  `
  return getServerSidePropsRobotsTxt(context, robots)
}

export default function RobotsTxt() {}
