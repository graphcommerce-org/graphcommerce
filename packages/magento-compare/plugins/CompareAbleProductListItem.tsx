import { ProductListItemProps } from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { Box } from '@mui/material'
import { CompareProductToggle } from '../components'
import { CompareProductIdInternalFragment } from '../graphql'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
  ifConfig: 'compare',
}

export function ProductListItem(props: PluginProps<ProductListItemProps>) {
  const { Prev, ...rest } = props
  const { children, topRight } = props
  if (import.meta.graphCommerce.compareVariant === 'CHECKBOX')
    return (
      <Prev topRight={topRight} {...rest}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CompareProductToggle {...rest} product={props as CompareProductIdInternalFragment} />
        </Box>
        {children}
      </Prev>
    )

  if (
    import.meta.graphCommerce.compareVariant === 'ICON' ||
    !import.meta.graphCommerce.compareVariant
  )
    return (
      <Prev
        {...rest}
        topRight={
          <>
            {topRight}
            <CompareProductToggle {...rest} product={props as CompareProductIdInternalFragment} />
          </>
        }
      >
        {children}
      </Prev>
    )
}
