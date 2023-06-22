import { ProductListParams } from '@graphcommerce/magento-product'
import { PageMeta } from '@graphcommerce/magento-store'
import { PageMetaProps } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { CategoryMetaFragment } from './CategoryMeta.gql'

export type CategoryMetaProps = CategoryMetaFragment &
  Omit<PageMetaProps, 'title' | 'metaDescription' | 'children'> & {
    params?: ProductListParams
    title?: string | null
    metaDescription?: string | null
  }

export function CategoryMeta(props: CategoryMetaProps) {
  const { meta_title, meta_description, name, params, image, ogImageUseFallback } = props
  let { title, metaDescription, metaRobots, canonical, ogImage } = props
  if (!title) title = ''
  if (!metaDescription) metaDescription = ''

  if (!title && meta_title) title = meta_title
  if (!title && name) title = name
  if (!ogImage && image) ogImage = image
  if (!metaDescription && meta_description) metaDescription = meta_description

  if (params?.url && !canonical) canonical = `/${params.url}`

  const anyFilterActive =
    Object.keys(params?.filters ?? {}).filter((k) => k !== 'category_uid').length > 0

  const sortActive = params?.sort && Object.keys(params?.sort).length !== 0
  const limitAcitve = !!params?.pageSize
  const noIndex = anyFilterActive || sortActive || limitAcitve

  const currentPage = params?.currentPage ?? 1
  const isPaginated = currentPage > 1 && !anyFilterActive

  const titleTrans =
    title && isPaginated
      ? i18n._(/* i18n */ '{title} - Page {currentPage}', { title, currentPage })
      : title

  const metaDescriptionTrans =
    metaDescription && isPaginated
      ? i18n._(/* i18n */ '{metaDescription} - Page {currentPage}', {
          metaDescription,
          currentPage,
        })
      : metaDescription

  return (
    <PageMeta
      title={titleTrans}
      metaDescription={metaDescriptionTrans}
      metaRobots={noIndex ? ['noindex'] : metaRobots}
      canonical={isPaginated ? `${canonical}/q/page/${currentPage}` : canonical}
      ogImage={ogImage}
      ogImageUseFallback={ogImageUseFallback}
    />
  )
}
