import {
  TypeRenderer,
  filterNonNullableKeys,
  LazyHydrate,
  RenderType,
} from '@graphcommerce/next-ui'
import { PageCategory_DataFragment } from './PageCategory_Data.gql'
import { PageRows_CategoryDataFragment } from './PageRows_CategoryData.gql'

type PageRowTypeRenderer = TypeRenderer<
  NonNullable<NonNullable<NonNullable<PageCategory_DataFragment['rows']>>[number]>
>

export type PageProductRowsProps<P extends PageRows_CategoryDataFragment> = {
  page: PageCategory_DataFragment | null | undefined
  renderer?: PageRowTypeRenderer
  loadingEager?: number
  category: P
}

export function PageCategoryRows<P extends PageRows_CategoryDataFragment>(
  props: PageProductRowsProps<P>,
) {
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
