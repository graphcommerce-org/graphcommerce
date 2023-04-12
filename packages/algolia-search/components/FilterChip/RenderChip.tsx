import { RenderType, TypeRenderer } from '@graphcommerce/next-ui'
import React from 'react'
import { RefinementFilterChip, RefinementFilterChipProps } from './RefinementFilterChip'
import { RefinementRangeChip, RefinementRangeChipProps } from './RefinementRangeChip'

interface RenderChipProps extends RefinementFilterChipProps, RefinementRangeChipProps {
  __typename: string
}

const renderer: TypeRenderer<{ __typename: string }, Omit<RenderChipProps, '__typename'>> = {
  FilterEqualTypeInput: RefinementFilterChip,
  FilterRangeTypeInput: RefinementRangeChip,
  FilterMatchTypeInput: () => <div>Not implemented</div>,
}

export function RenderChip(props: RenderChipProps) {
  const { __typename, ...rest } = props
  return <RenderType renderer={renderer} __typename={__typename} {...rest} />
}
