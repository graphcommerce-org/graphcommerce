import {
  TypeRenderer,
  filterNonNullableKeys,
  LazyHydrate,
  RenderType,
} from '@graphcommerce/next-ui'
import { PageRows_CategoryDataFragment } from './PageRows_CategoryData.gql'
import { ProductPageRowsFragment } from './ProductPageRows.gql'
import { ProductPageRows_ProductDataFragment } from './ProductPageRows_ProductData.gql'

type PageRowTypeRenderer = TypeRenderer<
  NonNullable<NonNullable<NonNullable<ProductPageRowsFragment['rows']>>[number]>
>

export type PageProductRowsProps<P extends ProductPageRows_ProductDataFragment> = {
  page: ProductPageRowsFragment | null | undefined
  renderer?: PageRowTypeRenderer
  loadingEager?: number
  product: P
}

export function ProductPageRows<
  P extends ProductPageRows_ProductDataFragment & PageRows_CategoryDataFragment,
>(props: PageProductRowsProps<P>) {
  const { renderer, page, loadingEager = 2 } = props

  if (!renderer || !page) return null

  return (
    <>
      {filterNonNullableKeys(page?.rows)?.map((item, index) => (
        <LazyHydrate key={item.id} hydrated={index < loadingEager ? true : undefined} height={500}>
          <RenderType renderer={renderer} {...item} />
        </LazyHydrate>
      ))}
    </>
  )
}
