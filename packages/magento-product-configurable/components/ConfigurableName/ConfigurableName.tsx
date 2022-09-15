import { useConfigurableTypeProduct } from '../../hooks/useConfigurableTypeProduct'

export function ConfigurableName(props: { children?: React.ReactNode }) {
  const { children } = props
  const { typeProduct } = useConfigurableTypeProduct()

  return (
    <>
      {typeProduct?.configurable_product_options_selection?.variant?.name ??
        typeProduct?.name ??
        children}
    </>
  )
}
