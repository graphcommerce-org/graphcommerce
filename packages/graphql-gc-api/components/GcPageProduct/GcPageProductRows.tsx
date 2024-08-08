import {
  TypeRenderer,
  filterNonNullableKeys,
  LazyHydrate,
  RenderType,
} from '@graphcommerce/next-ui'
import { GcPage_Product_DataFragment } from '../GcPage/GcPage_Product_Data.gql'
import { GcPageProduct_DataFragment } from './GcPageProduct_Data.gql'
import { GcPageProduct_Product_DataFragment } from './GcPageProduct_Product_Data.gql'

type GcRowTypeRenderer = TypeRenderer<
  NonNullable<NonNullable<NonNullable<GcPageProduct_DataFragment['rows']>>[number]>
>

export type GcPageProductRowsProps<P extends GcPageProduct_Product_DataFragment> = {
  page: GcPageProduct_DataFragment | null | undefined
  rowRenderer?: GcRowTypeRenderer
  loadingEager?: number
  product: P
}

export function GcPageProductRows<
  P extends GcPageProduct_Product_DataFragment & GcPage_Product_DataFragment,
>(props: GcPageProductRowsProps<P>) {
  const { rowRenderer, page, loadingEager = 2 } = props

  if (!rowRenderer || !page) return null

  return (
    <>
      {filterNonNullableKeys(page?.rows)?.map((item, index) => (
        <LazyHydrate key={item.id} hydrated={index < loadingEager ? true : undefined} height={500}>
          <RenderType renderer={rowRenderer} {...item} />
        </LazyHydrate>
      ))}
    </>
  )
}
