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
  renderer?: GcRowTypeRenderer
  loadingEager?: number
}

export const GcPageRows = React.memo((props: GcPageRowsProps) => {
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
})
