import { ProductListParams } from '@graphcommerce/magento-product'
import { PageMeta } from '@graphcommerce/magento-store'
import { PageMetaProps } from '@graphcommerce/next-ui'
import { CategoryMetaFragment } from './CategoryMeta.gql'

type CategoryMetaProps = CategoryMetaFragment &
  Omit<PageMetaProps, 'title' | 'metaDescription'> & {
    params?: ProductListParams
    current_page?: number | null | undefined
  }

export function CategoryMeta(props: CategoryMetaProps) {
  const { name, meta_title, meta_description, current_page, params, ...pageMetaProps } = props
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const anyFilterActive = Object.keys(params?.filters ?? {}).length > 0

  return (
    <PageMeta
      title={`${meta_title ?? name ?? ''} ${
        current_page && current_page > 1 ? `- Page ${current_page}` : ''
      }`}
      metaDescription={`${meta_description ?? undefined} ${
        current_page && current_page > 1 ? `- Page ${current_page}` : ''
      }`}
      metaRobots={anyFilterActive ? ['noindex'] : undefined}
      canonical={`/${params?.url}${
        (params?.currentPage ?? 1) > 1 ? `/q/page/${params?.currentPage}` : ''
      }`}
      {...pageMetaProps}
    />
  )
}
