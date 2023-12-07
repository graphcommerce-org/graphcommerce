import type { RowColumnOneFragment } from './RowColumnOne.gql'
import { rowColumnOneInput } from './input'
import { Default, Message } from './variant'

type VariantRenderer = Record<
  NonNullable<RowColumnOneFragment['rowColumnOneVariant']>,
  React.VFC<RowColumnOneFragment>
>

export type RowColumnOneProps = RowColumnOneFragment & {
  renderer?: Partial<VariantRenderer>
  __typename?: string
}

const defaultRenderer: Partial<VariantRenderer> = {
  Default,
  Message,
}

export function RowColumnOne(props: RowColumnOneProps) {
  const { renderer, ...RowColumnOneProps } = props
  let { rowColumnOneVariant } = props

  const mergedRenderer = { ...defaultRenderer, ...renderer } as VariantRenderer

  if (!rowColumnOneVariant) rowColumnOneVariant = 'Default'

  const RenderType =
    mergedRenderer?.[rowColumnOneVariant] ??
    (() => {
      if (process.env.NODE_ENV !== 'production')
        return <>renderer for {rowColumnOneVariant} not found</>
      return null
    })

  console.log(20, RowColumnOneProps)
  return <RenderType {...RowColumnOneProps} colOne={rowColumnOneInput.colOne} />
}
