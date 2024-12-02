import { usePageContext } from '@graphcommerce/framer-next-pages'
import type {} from '@graphcommerce/next-config'
import Head from 'next/head'
import type { Canonical } from './canonicalize'
import { useCanonical } from './canonicalize'

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

export type PageMetaProps = {
  title: string
  canonical?: Canonical
  metaDescription?: string
  metaRobots?: MetaRobotsAll | MetaRobots[]
  children?: React.ReactNode
  ogImage?: string | null
  ogImageUseFallback?: boolean
  ogType?: string | null
}

export function PageMeta(props: PageMetaProps) {
  const { active } = usePageContext()
  const {
    children,
    title,
    canonical: canonicalBare,
    metaDescription,
    ogImage,
    ogType,
    ogImageUseFallback = false,
    metaRobots = ['all'],
  } = props

  const canonical = useCanonical(canonicalBare)

  if (!active) return null
  return (
    <Head>
      <title>{title.trim()}</title>
      {metaDescription && (
        <>
          <meta name='description' content={metaDescription.trim()} key='meta-description' />
          <meta property='og:description' content={metaDescription.trim()} key='og-description' />
        </>
      )}
      <meta name='robots' content={metaRobots.join(',')} key='meta-robots' />
      {canonical && <link rel='canonical' href={canonical} key='canonical' />}
      <meta property='og:title' content={title.trim()} key='og-title' />
      <meta property='og:type' content={ogType ?? 'website'} key='og-type' />
      <meta property='og:url' content={canonical} key='og-url' />
      {(ogImage || ogImageUseFallback) && (
        <meta property='og:image' content={ogImage ?? '/open-graph-image.jpg'} key='og-image' />
      )}

      {children}
    </Head>
  )
}
