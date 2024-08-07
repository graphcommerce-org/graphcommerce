import {
  filterNonNullableKeys,
  LazyHydrate,
  RenderType,
  type TypeRenderer,
} from '@graphcommerce/next-ui'
import React from 'react'
import { GcPageQuery } from '../../queries/GcPage.gql'
import { GcPage_RowsFragment } from '../../queries/GcPage_Rows.gql'

export type GcRowTypeRenderer = TypeRenderer<
  NonNullable<NonNullable<NonNullable<GcPage_RowsFragment['rows']>>[number]>
>

export type GcPageRowsProps = GcPageQuery & {
  rowRenderer?: Partial<GcRowTypeRenderer>
  loadingEager?: number
}

export const GcPageRows = React.memo<GcPageRowsProps>((props) => {
  const { rowRenderer, page, loadingEager = 2 } = props

  return (
    <>
      {filterNonNullableKeys(page?.rows)?.map((item, index) => (
        <LazyHydrate key={item.id} hydrated={index < loadingEager ? true : undefined} height={500}>
          <RenderType renderer={rowRenderer as GcRowTypeRenderer} {...item} />
        </LazyHydrate>
      ))}
    </>
  )
})
