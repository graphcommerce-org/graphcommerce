import { Default, Message } from './variant'

type RowColumnOneProps = {
  __typename: string
  id: string
  rowColumnOneVariant?: 'Default' | 'Message' | null | undefined
  colOne: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    raw: any
  }
} & {
  renderer?: Partial<VariantRenderer>
}

type VariantRenderer = Record<
  NonNullable<RowColumnOneProps['rowColumnOneVariant']>,
  React.FC<RowColumnOneProps>
>

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
