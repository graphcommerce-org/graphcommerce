import { RowProductFragment } from './RowProduct.gql'

type VariantRenderer = Record<
  NonNullable<RowProductFragment['variant']>,
  React.VFC<RowProductFragment>
>

type RowProductProps = RowProductFragment & { renderer: VariantRenderer }

export default function RowProduct(props: RowProductProps) {
  const { renderer, variant, ...RowProductProps } = props

  if (!variant) return <></>

  const RenderType = renderer[variant]

  return <RenderType {...RowProductProps} />
}
