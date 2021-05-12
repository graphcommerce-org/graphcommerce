import { useQuery } from '@apollo/client'
import NextPageMeta, { PageMetaProps as NextPageMetaProps } from '@reachdigital/next-ui/PageMeta'
import { StoreConfigDocument } from './StoreConfig.gql'

type PageMetaProps = Pick<NextPageMetaProps, 'title' | 'metaDescription' | 'metaRobots'> & {
  canonical?: string
}

export default function PageMeta(props: PageMetaProps) {
  const { title, canonical, ...pageMetaProps } = props
  const config = useQuery(StoreConfigDocument)

  const prefix = config.data?.storeConfig?.title_prefix ?? ''
  const separator = config.data?.storeConfig?.title_separator ?? ''
  const defaultTitle = config.data?.storeConfig?.default_title ?? ''
  const suffix = config.data?.storeConfig?.title_suffix ?? ''

  let pageTitle = prefix ?? ''
  if (title ?? defaultTitle) pageTitle += ` ${title ?? defaultTitle}`
  if (separator && suffix) pageTitle += ` ${separator}`
  if (suffix) pageTitle += ` ${suffix}`

  const urlPath = ((canonical ?? '').startsWith('/') && canonical?.substr(1)) || canonical

  return (
    <NextPageMeta
      title={pageTitle ?? ''}
      canonical={`${config.data?.storeConfig?.secure_base_link_url ?? ''}${urlPath}`}
      {...pageMetaProps}
    />
  )
}
