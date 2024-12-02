import type {} from '@graphcommerce/next-config'
import { addBasePath } from 'next/dist/client/add-base-path'
import { addLocale } from 'next/dist/client/add-locale'
import { getDomainLocale } from 'next/dist/client/get-domain-locale'
import { resolveHref } from 'next/dist/client/resolve-href'
import type { NextRouter } from 'next/dist/shared/lib/router/router'
import { useRouter } from 'next/router'
import type { LiteralUnion } from 'type-fest'
import { storefrontConfig } from '../utils/storefrontConfig'

type PartialNextRouter = Pick<
  NextRouter,
  'pathname' | 'locale' | 'locales' | 'isLocaleDomain' | 'domainLocales' | 'defaultLocale'
>

export function canonicalize(router: PartialNextRouter, incoming?: Canonical) {
  let canonical = incoming

  if (!canonical) return canonical

  if (!canonical.startsWith('http') && !canonical.startsWith('/')) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `canonical is relative (${canonical}), a canonical must start with '/', 'http://' or 'https://'`,
      )
    }
    canonical = `/${canonical}`
  }

  if (canonical.startsWith('/')) {
    let [href, as = href] = resolveHref(router as NextRouter, canonical, true)

    const curLocale = router.locale

    // Copied from here https://github.com/vercel/next.js/blob/213c42f446874d29d07fa2cca6e6b11fc9c3b711/packages/next/client/link.tsx#L512
    const localeDomain = getDomainLocale(
      as,
      curLocale,
      router && router.locales,
      router.domainLocales,
    )

    if (localeDomain) {
      canonical = localeDomain
    } else {
      const conf = storefrontConfig(router.locale)

      href = addBasePath(
        addLocale(as, curLocale, conf?.domain ? conf.locale : router.defaultLocale),
      )

      let siteUrl = conf?.canonicalBaseUrl || import.meta.graphCommerce.canonicalBaseUrl

      if (conf?.domain && !conf?.canonicalBaseUrl) siteUrl = `https://${conf.domain}`

      if (siteUrl.endsWith('/')) siteUrl = siteUrl.slice(0, -1)

      canonical = `${siteUrl}${href}`
    }
  }

  if (!canonical.startsWith('http')) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        `canonical must start with '/', 'http://' or 'https://', '${canonical}' given`,
      )
    }
    canonical = undefined
  }

  return canonical
}

export type Canonical = LiteralUnion<
  `http://${string}` | `https://${string}` | `/${string}`,
  string
>

export function useCanonical(incoming?: Canonical) {
  const router = useRouter()
  return canonicalize(router, incoming)
}
