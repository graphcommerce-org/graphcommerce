import { useQuery } from '@graphcommerce/graphql'
import {
  PageMetaProps as NextPageMetaProps,
  PageMetaOld,
  isPageMetaPropsNew,
} from '@graphcommerce/next-ui'
import { PageMetaNew } from '@graphcommerce/next-ui/PageMeta/PageMetaNew'
import { StoreConfigDocument } from './StoreConfig.gql'

type PageMetaProps = NextPageMetaProps

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

  if (isPageMetaPropsNew(props)) {
    const { metadata } = props

    return (
      <PageMetaNew
        {...props}
        metadata={{
          ...metadata,
          title: {
            absolute: addPrefix(metadata?.title?.absolute ?? ''),
            template: null,
          },
        }}
      />
    )
  }

  const { title, ...pageMetaProps } = props
  return <PageMetaOld title={addPrefix(title ?? '')} {...pageMetaProps} />
}
