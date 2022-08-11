import { usePageContext } from '@graphcommerce/framer-next-pages'
import { addBasePath } from 'next/dist/client/add-base-path'
import { addLocale } from 'next/dist/client/add-locale'
import { getDomainLocale } from 'next/dist/client/get-domain-locale'
import { NextRouter, resolveHref } from 'next/dist/shared/lib/router/router'
import Head from 'next/head'
import { useRouter } from 'next/router'

// https://developers.google.com/search/docs/advanced/robots/robots_meta_tag#directives
export type MetaRobots =
  | 'noindex'
  | 'nofollow'
  | 'noarchive'
  | 'nosnippet'
  | 'notranslate'
  | 'noimageindex'
  | `unavailable_after:${string}`
  | `max-snippet:${number}`
  | `max-image-preview:${'none' | 'standard' | 'large'}`
  | `max-video-preview:${number}`
type MetaRobotsAll = ['all' | 'none']

type Canonical = `http://${string}` | `https://${string}` | `/${string}` | string

export type PageMetaProps = {
  title: string
  canonical?: Canonical
  metaDescription?: string
  metaRobots?: MetaRobotsAll | MetaRobots[]
}

type PartialNextRouter = Pick<
  NextRouter,
  'pathname' | 'locale' | 'locales' | 'isLocaleDomain' | 'domainLocales' | 'defaultLocale'
>
export function canonicalize(router: PartialNextRouter, incomming?: Canonical) {
  let canonical = incomming

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
    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      if (process.env.NODE_ENV !== 'production') {
        throw Error('NEXT_PUBLIC_SITE_URL is not defined in .env')
      }
    }

    let [href, as] = resolveHref(router as NextRouter, canonical, true)

    const curLocale = router.locale

    // Copied from here https://github.com/vercel/next.js/blob/213c42f446874d29d07fa2cca6e6b11fc9c3b711/packages/next/client/link.tsx#L512
    const localeDomain =
      router.isLocaleDomain &&
      getDomainLocale(as, curLocale, router && router.locales, router.domainLocales)

    href = localeDomain || addBasePath(addLocale(as, curLocale, router.defaultLocale))

    let siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    if (siteUrl && siteUrl.endsWith('/')) {
      siteUrl = siteUrl.slice(0, -1)
    }

    canonical = `${siteUrl}${href}`
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

export function useCanonical(incomming?: Canonical) {
  const router = useRouter()
  return canonicalize(router, incomming)
}

export function PageMeta(props: PageMetaProps) {
  const { active } = usePageContext()
  const { title, canonical: canonicalBare, metaDescription, metaRobots = ['all'] } = props

  const canonical = useCanonical(canonicalBare)

  if (!active) return null
  return (
    <Head>
      <title>{title.trim()}</title>
      {metaDescription && (
        <meta name='description' content={metaDescription.trim()} key='meta-description' />
      )}
      <meta name='robots' content={metaRobots.join(',')} key='meta-robots' />
      {canonical && <link rel='canonical' href={canonical} key='canonical' />}
    </Head>
  )
}
