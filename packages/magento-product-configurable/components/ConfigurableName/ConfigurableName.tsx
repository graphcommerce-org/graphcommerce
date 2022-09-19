import { ConfigurableOptionsFragment } from '../../graphql/ConfigurableOptions.gql'
import { useConfigurableOptionsSelection } from '../../hooks/useConfigurableOptionsSelection'

type ConfigurableNameProps = {
  product: ConfigurableOptionsFragment
}

export function ConfigurableName(props: ConfigurableNameProps) {
  const { product } = props
  const { configured } = useConfigurableOptionsSelection()

  return <>{configured?.configurable_product_options_selection?.variant?.name ?? product.name}</>
}
