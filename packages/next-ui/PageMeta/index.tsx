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
  url: string
  metaDescription?: string
  metaRobots?: MetaRobotsAll | MetaRobots[]
  prefix?: string
  separator?: string
  defaultTitle?: string
  suffix?: string
  urlPath?: string
}

export default function PageMeta(props: PageMetaProps) {
  const {
    title,
    metaDescription,
    metaRobots = ['all'],
    prefix,
    separator,
    defaultTitle,
    suffix,
    url,
    urlPath,
  } = props
  const canonical = url + (urlPath ?? '')

  // todo migrate to PageMeta component that accepts the cms page meta as child
  let pageTitle = prefix ?? ''
  if (title ?? defaultTitle) pageTitle += ` ${title ?? defaultTitle}`
  if (separator && suffix) pageTitle += ` ${separator}`
  if (suffix) pageTitle += ` ${suffix}`

  return (
    <Head>
      <title>{pageTitle}</title>
      {metaDescription && (
        <meta name='description' content={metaDescription} key='meta-description' />
      )}
      <meta name='robots' content={metaRobots.join(',')} key='meta-robots' />
      <link rel='canonical' href={canonical} key='canonical' />
    </Head>
  )
}
