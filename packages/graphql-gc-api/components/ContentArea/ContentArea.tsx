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

export type ContentAreaProps = GcPageQuery & {
  renderer?: Partial<GcRowTypeRenderer>
  loadingEager?: number
}

export const ContentArea = React.memo<ContentAreaProps>((props) => {
  const { renderer, page, loadingEager = 2 } = props
  const mergedRenderer = { ...renderer } as GcRowTypeRenderer

  const rows = page?.rows
  if (!rows) return null

  return (
    <>
      {filterNonNullableKeys(rows)?.map((item, index) => (
        <LazyHydrate key={item.id} hydrated={index < loadingEager ? true : undefined} height={500}>
          <RenderType renderer={mergedRenderer} {...item} />
        </LazyHydrate>
      ))}
    </>
  )
})
