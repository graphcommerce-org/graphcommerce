import type { TypeRenderer } from '@graphcommerce/next-ui'
import { RenderType } from '@graphcommerce/next-ui'
import React from 'react'
import type { RefinementFilterChipProps } from './FilterChip/RefinementFilterChip'
import { RefinementFilterChip } from './FilterChip/RefinementFilterChip'
import type { RefinementRangeChipProps } from './FilterChip/RefinementRangeChip'
import { RefinementRangeChip } from './FilterChip/RefinementRangeChip'
import type { SortChipProps } from './SortChip/SortChip'
import { SortChip } from './SortChip/SortChip'

interface RenderChipProps
  extends RefinementFilterChipProps,
    RefinementRangeChipProps,
    SortChipProps {
  __typename: string
}

const renderer: TypeRenderer<{ __typename: string }, Omit<RenderChipProps, '__typename'>> = {
  FilterEqualTypeInput: RefinementFilterChip,
  FilterRangeTypeInput: RefinementRangeChip,
  FilterMatchTypeInput: () => <div>Not implemented</div>,
  Sort: SortChip,
}

export function RenderChip(props: RenderChipProps) {
  const { __typename, ...rest } = props
  return <RenderType renderer={renderer} __typename={__typename} {...rest} />
}
