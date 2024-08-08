import {
  filterNonNullableKeys,
  LazyHydrate,
  RenderType,
  type TypeRenderer,
} from '@graphcommerce/next-ui'
import React from 'react'
import { Page_DataFragment } from './Page_Data.gql'

type PageRowTypeRenderer = TypeRenderer<
  NonNullable<NonNullable<NonNullable<Page_DataFragment['rows']>>[number]>
>

export type PageRowsProps = {
  page: Page_DataFragment | null | undefined
  renderer?: PageRowTypeRenderer
  loadingEager?: number
}

export const PageRows = React.memo((props: PageRowsProps) => {
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
