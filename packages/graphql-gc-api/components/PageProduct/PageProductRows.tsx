import {
  TypeRenderer,
  filterNonNullableKeys,
  LazyHydrate,
  RenderType,
} from '@graphcommerce/next-ui'
import { Page_Product_DataFragment } from '../Page/Page_Product_Data.gql'
import { PageProduct_DataFragment } from './PageProduct_Data'
import { PageProduct_Product_DataFragment } from './PageProduct_Product_Data'

type PageRowTypeRenderer = TypeRenderer<
  NonNullable<NonNullable<NonNullable<PageProduct_DataFragment['rows']>>[number]>
>

export type PageProductRowsProps<P extends PageProduct_Product_DataFragment> = {
  page: PageProduct_DataFragment | null | undefined
  renderer?: PageRowTypeRenderer
  loadingEager?: number
  product: P
}

export function PageProductRows<
  P extends PageProduct_Product_DataFragment & Page_Product_DataFragment,
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
