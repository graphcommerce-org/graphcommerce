import { useQuery } from '@graphcommerce/graphql'
import { PageMetaProps, PageMeta as PageMetaBase } from '@graphcommerce/next-ui'
import { StoreConfigDocument } from './StoreConfig.gql'

export function PageMeta(props: PageMetaProps) {
  const config = useQuery(StoreConfigDocument)

  const prefix = config.data?.storeConfig?.title_prefix ?? ''
  const separator = config.data?.storeConfig?.title_separator ?? ''
  const defaultTitle = config.data?.storeConfig?.default_title ?? ''
  const suffix = config.data?.storeConfig?.title_suffix ?? ''

  function addPrefix(title: string) {
    let pageTitle = prefix ?? ''
    if (title ?? defaultTitle) pageTitle += ` ${title ?? defaultTitle}`
    if (separator && suffix) pageTitle += ` ${separator}`
    if (suffix) pageTitle += ` ${suffix}`
    return pageTitle
  }

  const { title, ...pageMetaProps } = props
  return <PageMetaBase title={addPrefix(title ?? '')} {...pageMetaProps} />
}
