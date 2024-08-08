import {
  filterNonNullableKeys,
  LazyHydrate,
  RenderType,
  type TypeRenderer,
} from '@graphcommerce/next-ui'
import React from 'react'
import { GcPage_DataFragment } from './GcPage_Data.gql'

type GcRowTypeRenderer = TypeRenderer<
  NonNullable<NonNullable<NonNullable<GcPage_DataFragment['rows']>>[number]>
>

export type GcPageRowsProps = {
  page: GcPage_DataFragment | null | undefined
  rowRenderer?: GcRowTypeRenderer
  loadingEager?: number
}

export const GcPageRows = React.memo((props: GcPageRowsProps) => {
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
})
