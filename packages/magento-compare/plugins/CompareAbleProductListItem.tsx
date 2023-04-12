import { ProductListItemProps } from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useStorefrontConfig } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { CompareProductToggle } from '../components'

export const component = 'ProductListItem' // Component to extend, required
export const exported = '@graphcommerce/magento-product' // Location where the component is exported, required
export const ifConfig: IfConfig = 'compare'

function CompareAbleProductListItem(props: PluginProps<ProductListItemProps>) {
  const { Prev, children, topRight, ...rest } = props
  const explicitCompare =
    useStorefrontConfig().compareCheckbox ?? import.meta.graphCommerce.compareCheckbox

  if (!explicitCompare) {
    return (
      <Prev
        {...rest}
        topRight={
          <>
            {topRight}
            <CompareProductToggle {...rest} />
          </>
        }
      >
        {children}
      </Prev>
    )
  }

  return (
    <Prev topRight={topRight} {...rest}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CompareProductToggle {...rest} />
      </Box>
      {children}
    </Prev>
  )
}
export const Plugin = CompareAbleProductListItem
