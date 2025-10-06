import { RichTextProps } from '@graphcommerce/hygraph-ui'
import type { RowColumnOneFragment } from './RowColumnOne.gql'
import { Default, Message } from './variant'

type VariantRenderer = Record<
  NonNullable<RowColumnOneFragment['rowColumnOneVariant']>,
  React.VFC<RowColumnOneFragment>
>

export type RowColumnOneProps = RowColumnOneFragment & {
  renderer?: Partial<VariantRenderer>
  richTextOne?: Omit<RichTextProps, 'raw'>
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

  return <RenderType {...RowColumnOneProps} />
}
