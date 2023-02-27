import { useQuery } from '@graphcommerce/graphql'
import {
  PageMeta as NextPageMeta,
  PageMetaProps as NextPageMetaProps,
} from '@graphcommerce/next-ui'
import { StoreConfigDocument } from './StoreConfig.gql'

export type ProductPageMetaOgTags = {
  sku?: string | null
  name?: string | null
  image?: string | null
  price?: number | null
  salePrice?: number | null
  categories?: string[] | null
}

type PageMetaProps = Pick<NextPageMetaProps, 'title' | 'metaDescription' | 'metaRobots'> & ProductPageMetaOgTags & {
  canonical?: string
}

export function PageMeta(props: PageMetaProps) {
  const { title, ...pageMetaProps } = props
  const config = useQuery(StoreConfigDocument)

  const prefix = config.data?.storeConfig?.title_prefix ?? ''
  const separator = config.data?.storeConfig?.title_separator ?? ''
  const defaultTitle = config.data?.storeConfig?.default_title ?? ''
  const suffix = config.data?.storeConfig?.title_suffix ?? ''

  let pageTitle = prefix ?? ''
  if (title ?? defaultTitle) pageTitle += ` ${title ?? defaultTitle}`
  if (separator && suffix) pageTitle += ` ${separator}`
  if (suffix) pageTitle += ` ${suffix}`

  return <NextPageMeta title={pageTitle ?? ''} {...pageMetaProps} />
}
