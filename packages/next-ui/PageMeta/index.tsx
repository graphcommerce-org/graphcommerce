import { usePageContext } from '@graphcommerce/framer-next-pages'
import Head from 'next/head'

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
  canonical?: `http://${string}` | `https://${string}` | string
  metaDescription?: string
  metaRobots?: MetaRobotsAll | MetaRobots[]
}

export default function PageMeta(props: PageMetaProps) {
  const { active } = usePageContext()
  const { title, canonical, metaDescription, metaRobots = ['all'] } = props

  if (!(canonical ?? 'http').startsWith('http'))
    throw new Error(`canonical must start with http:// or https://, '${canonical}' given`)

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
