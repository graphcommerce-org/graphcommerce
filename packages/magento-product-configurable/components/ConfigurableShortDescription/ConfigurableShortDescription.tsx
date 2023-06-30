import { ProductShortDescription } from '@graphcommerce/magento-product/components'
import { ConfigurableOptionsFragment } from '../../graphql/ConfigurableOptions.gql'
import { useConfigurableOptionsSelection } from '../../hooks/useConfigurableOptionsSelection'

export type ConfigurableShortDescriptionProps = {
  product: ConfigurableOptionsFragment
  index?: number
}

export function ConfigurableShortDescription(props: ConfigurableShortDescriptionProps) {
  const { product, index = 0 } = props
  const { configured } = useConfigurableOptionsSelection({ url_key: product.url_key, index })
  const configurableShortDescription =
    configured?.configurable_product_options_selection?.variant?.short_description

  return (
    <ProductShortDescription
      short_description={
        configurableShortDescription?.html.length
          ? configurableShortDescription
          : product.short_description
      }
      sx={(theme) => ({ mb: theme.spacings.xs })}
    />
  )
}
