import { RowColumnOneProps } from './input'
import { Default, Message } from './variant'

type VariantRenderer = Record<
  NonNullable<RowColumnOneProps['rowColumnOneVariant']>,
  React.FC<RowColumnOneProps>
>

const defaultRenderer: Partial<VariantRenderer> = {
  Default,
  Message,
}

export function RowColumnOne(props: RowColumnOneProps & { renderer?: VariantRenderer }) {
  const { renderer, ...rest } = props
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

  return <RenderType {...rest} />
}
