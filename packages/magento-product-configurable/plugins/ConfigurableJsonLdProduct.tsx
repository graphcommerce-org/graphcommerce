import { mergeDeep } from '@graphcommerce/graphql'
import { JsonLdProductFragment } from '@graphcommerce/magento-product/components/JsonLdProduct/JsonLdProduct.gql'
import type { PluginProps } from '@graphcommerce/next-config'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'jsonLdProduct'
export const exported = '@graphcommerce/magento-product'

type ConfigurableJsonLdProductProps = JsonLdProductFragment & {
  index?: number
}

function ConfigurableJsonLdProduct(props: PluginProps<ConfigurableJsonLdProductProps>) {
  const {
    Prev,
    name,
    sku,
    media_gallery,
    categories,
    description,
    url_key,
    index = 0,
    ...rest
  } = props
  const { configured } = useConfigurableOptionsSelection({ url_key, index })
  const configurableOption = configured?.configurable_product_options_selection?.variant
  const configurableMediaGallery = mergeDeep(configurableOption?.media_gallery, media_gallery)

  return (
    <Prev
      name={configurableOption?.name ?? name}
      sku={configurableOption?.sku ?? sku}
      media_gallery={configurableMediaGallery ?? media_gallery}
      categories={configurableOption?.categories ?? categories}
      description={configurableOption?.description ?? description}
      {...rest}
    />
  )
}

export const Plugin = ConfigurableJsonLdProduct
