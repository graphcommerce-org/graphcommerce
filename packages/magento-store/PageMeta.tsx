import { useQuery } from '@graphcommerce/graphql'
import type { PageMetaProps as NextPageMetaProps } from '@graphcommerce/next-ui'
import { PageMeta as NextPageMeta } from '@graphcommerce/next-ui'
import { StoreConfigDocument } from './StoreConfig.gql'

type PageMetaProps = Omit<NextPageMetaProps, 'canonical'> & {
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
