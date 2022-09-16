import { ConfigurableOptionsFragment } from '../../graphql/ConfigurableOptions.gql'
import { useConfigurableTypeProduct } from '../../hooks/useConfigurableTypeProduct'

type ConfigurableNameProps = {
  product: ConfigurableOptionsFragment
}

export function ConfigurableName(props: ConfigurableNameProps) {
  const { product } = props
  const { configured } = useConfigurableTypeProduct()

  return <>{configured?.configurable_product_options_selection?.variant?.name ?? product.name}</>
}
