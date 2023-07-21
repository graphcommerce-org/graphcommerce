import { RichTextProps } from '@graphcommerce/graphcms-ui'
import type { RowColumnOneFragment } from './RowColumnOne.gql'
import { Default, Message } from './variant'

type VariantRenderer = Record<
  NonNullable<RowColumnOneFragment['rowColumnOneVariant']>,
  React.VFC<RowColumnOneFragment>
>

type RowColumnOneProps = RowColumnOneFragment & {
  renderer?: Partial<VariantRenderer>
  richTextOne?: Omit<RichTextProps, 'raw'>
}

const defaultRenderer: Partial<VariantRenderer> = {
  Default,
  Message,
}

export function RowColumnOne(props: RowColumnOneProps) {
  const { renderer, rowColumnOneVariant, ...RowColumnOneProps } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as VariantRenderer

  if (!rowColumnOneVariant) return <Default {...RowColumnOneProps} />

  const RenderType =
    mergedRenderer?.[rowColumnOneVariant] ??
    (() => {
      if (process.env.NODE_ENV !== 'production')
        return <>renderer for {rowColumnOneVariant} not found</>
      return null
    })

  return <RenderType {...RowColumnOneProps} />
}
