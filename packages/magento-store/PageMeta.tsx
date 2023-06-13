import { useQuery } from '@graphcommerce/graphql'
import {
  PageMeta as NextPageMeta,
  PageMetaProps as NextPageMetaProps,
} from '@graphcommerce/next-ui'
import { StoreConfigDocument } from './StoreConfig.gql'

type PageMetaProps = Pick<
  NextPageMetaProps,
  'title' | 'metaDescription' | 'metaRobots' | 'children' | 'openGraphImage'
> & {
  canonical?: string
}

export function PageMeta(props: PageMetaProps) {
  const { children, title, ...pageMetaProps } = props
  const config = useQuery(StoreConfigDocument)

  const prefix = config.data?.storeConfig?.title_prefix ?? ''
  const separator = config.data?.storeConfig?.title_separator ?? ''
  const defaultTitle = config.data?.storeConfig?.default_title ?? ''
  const suffix = config.data?.storeConfig?.title_suffix ?? ''

  let pageTitle = prefix ?? ''
  if (title ?? defaultTitle) pageTitle += ` ${title ?? defaultTitle}`
  if (separator && suffix) pageTitle += ` ${separator}`
  if (suffix) pageTitle += ` ${suffix}`

  return (
    <NextPageMeta title={pageTitle ?? ''} {...pageMetaProps}>
      {children}
    </NextPageMeta>
  )
}
