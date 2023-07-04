import type { ProductPageProps } from '@graphcommerce/magento-product'
import type { PluginProps } from '@graphcommerce/next-config'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductPageMeta'
export const exported = '@graphcommerce/magento-product'

type ConfigurableProductShortDescriptionProps = ProductPageProps & {
  index?: number
}

function ConfigurableProductShortDescription(
  props: PluginProps<ConfigurableProductShortDescriptionProps>,
) {
  const {
    Prev,
    index = 0,
    sku,
    categories,
    price_range,
    media_gallery,
    name,
    meta_title,
    meta_description,
    url_key,
    __typename,
    ...rest
  } = props
  const { configured } = useConfigurableOptionsSelection({ url_key, index })

  const configurableOption = configured?.configurable_product_options_selection?.variant

  return (
    <Prev
      sku={configurableOption?.sku ?? sku}
      categories={configurableOption?.categories ?? categories}
      price_range={configurableOption?.price_range ?? price_range}
      media_gallery={configurableOption?.media_gallery ?? media_gallery}
      name={configurableOption?.name ?? name}
      meta_title={configurableOption?.meta_title ?? meta_title}
      meta_description={configurableOption?.meta_description ?? meta_description}
      url_key={configurableOption?.url_key ?? url_key}
      __typename={configurableOption?.__typename ?? __typename}
      {...rest}
    />
  )
}
export const Plugin = ConfigurableProductShortDescription
