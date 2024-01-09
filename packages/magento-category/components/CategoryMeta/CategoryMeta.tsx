import { ProductListParams } from '@graphcommerce/magento-product'
import { PageMetaNew, PageMetaPropsNew } from '@graphcommerce/next-ui/PageMeta/PageMetaNew'
import { i18n } from '@lingui/core'
import { CategoryMetaFragment } from './CategoryMeta.gql'

export type CategoryMetaProps = PageMetaPropsNew & {
  category?: CategoryMetaFragment | null
  params?: ProductListParams
}

export function CategoryMeta(props: CategoryMetaProps) {
  const { params, metadata, category } = props

  let title = metadata?.title?.absolute ?? ''
  if (!title && category?.meta_title) title = category?.meta_title
  if (!title && category?.name) title = category?.name

  let metaDescription = metadata?.description ?? ''
  if (!metaDescription && category?.meta_description) metaDescription = category.meta_description

  let canonical = metadata?.alternates?.canonical?.url ?? null
  if (!canonical) canonical = `/${params?.url}`

  const anyFilterActive =
    Object.keys(params?.filters ?? {}).filter((k) => k !== 'category_uid').length > 0

  const currentPage = params?.currentPage ?? 1
  const isPaginated = currentPage > 1 && !anyFilterActive

  const titleTrans =
    title && isPaginated
      ? i18n._(/* i18n */ '{title} - Page {currentPage}', { title, currentPage })
      : title

  const sortActive = params?.sort && Object.keys(params?.sort).length !== 0
  const limitAcitve = !!params?.pageSize
  const noIndex = anyFilterActive || sortActive || limitAcitve

  return (
    <PageMetaNew
      metadata={{
        ...metadata,
        robots: {
          basic: noIndex ? 'noindex' : metadata?.robots?.basic ?? null,
          googleBot: metadata?.robots?.googleBot ?? null,
        },
        alternates: {
          languages: {},
          media: {},
          types: {},
          ...metadata?.alternates,
          canonical: {
            ...metadata?.alternates?.canonical,
            url: canonical,
          },
        },
        title: { template: null, absolute: titleTrans },
        description:
          metaDescription && isPaginated
            ? i18n._(/* i18n */ '{metaDescription} - Page {currentPage}', {
                metaDescription,
                currentPage,
              })
            : metaDescription,
        openGraph: {
          type: 'website',
          url: canonical,
          title: { template: null, absolute: titleTrans },
          images: category?.image ? [new URL(category?.image)] : [],
        },
      }}
    />
  )
}
