import { RowColumnOneProps } from './type'
import { Default, Message } from './variant'

type VariantRenderer = Record<
  NonNullable<RowColumnOneProps['variant']>,
  React.FC<RowColumnOneProps>
>

const defaultRenderer: Partial<VariantRenderer> = {
  Default,
  Message,
}

export function RowColumnOne(props: RowColumnOneProps & { renderer?: VariantRenderer }) {
  const { renderer, ...rest } = props
  let { variant } = props

  const mergedRenderer = { ...defaultRenderer, ...renderer } as VariantRenderer

  if (!variant) variant = 'Default'

  const RenderType =
    mergedRenderer?.[variant] ??
    (() => {
      if (process.env.NODE_ENV !== 'production') return <>renderer for {variant} not found</>
      return null
    })

  return <RenderType {...rest} />
}
