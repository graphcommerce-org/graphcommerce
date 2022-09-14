import { useConfigurableTypeProduct } from '../../hooks/useConfigurableTypeProduct'

export function ConfigurableName() {
  const { typeProduct } = useConfigurableTypeProduct()

  return (
    <>{typeProduct.configurable_product_options_selection?.variant?.name ?? typeProduct.name}</>
  )
}
