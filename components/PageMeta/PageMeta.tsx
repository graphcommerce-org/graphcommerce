import { useStoreConfigQuery } from 'generated/apollo'
import Head from 'next/head'

type PageMetaProps = {
  title: string
  metaDescription: string
  metaRobots: string
}

export default function PageMeta({ title, metaDescription, metaRobots }: PageMetaProps) {
  const { data: storeConfigQuery } = useStoreConfigQuery()

  const title_prefix = storeConfigQuery?.storeConfig?.title_prefix
  const title_separator = storeConfigQuery?.storeConfig?.title_separator
  const default_title = storeConfigQuery?.storeConfig?.default_title
  const title_suffix = storeConfigQuery?.storeConfig?.title_suffix

  // todo migrate to PageMeta component that accepts the cms page meta as child
  let resultingTitle = title_prefix ?? ''
  const metaTitle = title ?? default_title
  if (metaTitle) resultingTitle += ` ${metaTitle}`

  if (title_separator && title_suffix) resultingTitle += ` ${title_separator}`
  if (title_suffix) resultingTitle += ` ${title_suffix}`

  return (
    <Head>
      <title>{resultingTitle}</title>
      <meta name='description' content={metaDescription} />
      <meta name='robots' content={metaRobots} />
    </Head>
  )
}
