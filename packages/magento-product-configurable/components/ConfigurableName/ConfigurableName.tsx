import { ConfigurableOptionsFragment } from '../../graphql/ConfigurableOptions.gql'
import { useConfigurableOptionsSelection } from '../../hooks/useConfigurableOptionsSelection'

type ConfigurableNameProps = {
  product: ConfigurableOptionsFragment
  index?: number
}

export function ConfigurableName(props: ConfigurableNameProps) {
  const { product, index = 0 } = props
  const { configured } = useConfigurableOptionsSelection({ url_key: product.url_key, index })

  return <>{configured?.configurable_product_options_selection?.variant?.name ?? product.name}</>
}
