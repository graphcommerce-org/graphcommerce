// eslint-disable-next-line import/no-extraneous-dependencies
import { ProductListItemsProps } from '@graphcommerce/magento-graphcms/components/ProductListItems/ProductListItems'
import { AddProductsToCartForm } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { Box } from '@mui/material'

export const component = 'ProductListItems'
export const exported = '@graphcommerce/magento-graphcms'
export const ifConfig: IfConfig = 'demoMode'

/**
 * Example plugin to enable algolia search if the `demoMode` config is set to true
 *
 * You might want to:
 *
 * - Remove the `ifConfig` to always enable this.
 * - Create your own plugins https://www.graphcommerce.org/docs/framework/plugins-react
 */
function AlgoliaSearchPluginPlugin(props: PluginProps<ProductListItemsProps>) {
  const { title } = props

  return (
    <AddProductsToCartForm>
      <Box sx={{ width: 100, height: 100, bgcolor: 'green' }} />
    </AddProductsToCartForm>
  )
}

export const Plugin = AlgoliaSearchPluginPlugin
