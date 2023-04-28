import { RenderType, TypeRenderer } from '@graphcommerce/next-ui'
import React from 'react'
import { RefinementFilterChip, RefinementFilterChipProps } from './FilterChip/RefinementFilterChip'
import { RefinementRangeChip, RefinementRangeChipProps } from './FilterChip/RefinementRangeChip'
import { SortChip, SortChipProps } from './SortChip/SortChip'

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
