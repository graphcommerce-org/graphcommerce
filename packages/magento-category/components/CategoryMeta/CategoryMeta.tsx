import { ProductListParams } from '@graphcommerce/magento-product'
import { PageMeta } from '@graphcommerce/magento-store'
import { PageMetaProps } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { CategoryMetaFragment } from './CategoryMeta.gql'

export type CategoryMetaProps = CategoryMetaFragment &
  Partial<PageMetaProps> & {
    params?: ProductListParams
    current_page?: number | null | undefined
  }

export function CategoryMeta(props: CategoryMetaProps) {
  const { meta_title, meta_description, name, params, current_page } = props
  const {
    title = meta_title ?? name ?? '',
    metaDescription = meta_description ?? undefined,
    metaRobots,
    canonical = params?.url,
  } = props

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const anyFilterActive = Object.keys(params?.filters ?? {}).length > 0
  const currentPage = params?.currentPage ?? 1
  const isPaginated = currentPage > 1 && !anyFilterActive

  const titleTrans =
    title && isPaginated
      ? i18n._(/* i18n */ '{title} - Page {currentPage}', { title, currentPage })
      : title

  const metaDescriptionTrans =
    metaDescription && isPaginated
      ? i18n._(/* i18n */ '{description} - Page {currentPage}', { metaDescription, currentPage })
      : metaDescription

  return (
    <PageMeta
      title={titleTrans}
      metaDescription={metaDescriptionTrans}
      metaRobots={anyFilterActive ? ['noindex'] : metaRobots}
      canonical={isPaginated ? `/${canonical}/q/page/${currentPage}` : canonical}
    />
  )
}
