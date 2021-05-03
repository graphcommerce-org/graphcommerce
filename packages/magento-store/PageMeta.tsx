import { useQuery } from '@apollo/client'
import Head from 'next/head'
import { StoreConfigDocument } from './StoreConfig.gql'

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
  metaDescription?: string
  metaRobots?: MetaRobotsAll | MetaRobots[]
}

export default function PageMeta(props: PageMetaProps) {
  const { title, metaDescription, metaRobots = ['all'] } = props
  const config = useQuery(StoreConfigDocument)

  const prefix = config.data?.storeConfig?.title_prefix
  const separator = config.data?.storeConfig?.title_separator
  const defaultTitle = config.data?.storeConfig?.default_title
  const suffix = config.data?.storeConfig?.title_suffix

  // todo migrate to PageMeta component that accepts the cms page meta as child
  let pageTitle = prefix ?? ''
  if (title ?? defaultTitle) pageTitle += ` ${title ?? defaultTitle}`
  if (separator && suffix) pageTitle += ` ${separator}`
  if (suffix) pageTitle += ` ${suffix}`

  return (
    <Head>
      <title>{pageTitle}</title>
      {metaDescription && <meta name='description' content={metaDescription} />}
      <meta name='robots' content={metaRobots.join(',')} />
    </Head>
  )
}
