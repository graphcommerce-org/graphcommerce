import type { ProductPageProps } from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductPageMeta'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'configurableVariantValues.meta'

type ConfigurableProductShortDescriptionProps = ProductPageProps & {
  index?: number
}

function ConfigurableProductPageMeta(props: PluginProps<ConfigurableProductShortDescriptionProps>) {
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
  const variant = useConfigurableOptionsSelection({ url_key, index }).configured
    ?.configurable_product_options_selection?.variant

  return (
    <Prev
      sku={variant?.sku ?? sku}
      categories={variant?.categories ?? categories}
      price_range={variant?.price_range ?? price_range}
      media_gallery={variant?.media_gallery ?? media_gallery}
      name={variant?.name ?? name}
      meta_title={variant?.meta_title ?? meta_title}
      meta_description={variant?.meta_description ?? meta_description}
      __typename={variant?.__typename ?? __typename}
      {...rest}
    />
  )
}
export const Plugin = ConfigurableProductPageMeta
