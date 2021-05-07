import { useQuery } from '@apollo/client'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import StorePageMeta, { PageMetaProps as StorePageMetaProps } from '@reachdigital/next-ui/PageMeta'

type PageMetaProps = Pick<
  Omit<StorePageMetaProps, 'url'>,
  'title' | 'metaDescription' | 'metaRobots'
> & {
  urlPath?: string
}

export default function PageMeta(props: PageMetaProps) {
  const config = useQuery(StoreConfigDocument)

  const pageMetaProps = {
    ...props,
    prefix: config.data?.storeConfig?.title_prefix ?? '',
    separator: config.data?.storeConfig?.title_separator ?? '',
    defaultTitle: config.data?.storeConfig?.default_title ?? '',
    suffix: config.data?.storeConfig?.title_suffix ?? '',
    url: config.data?.storeConfig?.base_link_url ?? '',
  }

  return <StorePageMeta {...pageMetaProps} />
}
