import { useQuery } from '@apollo/client'
import Head from 'next/head'
import { StoreConfigDocument } from './StoreConfig.gql'

type PageMetaProps = {
  title: string
  metaDescription: string
  metaRobots: string
}

export default function PageMeta({ title, metaDescription, metaRobots }: PageMetaProps) {
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
      <meta name='description' content={metaDescription} />
      <meta name='robots' content={metaRobots} />
    </Head>
  )
}
