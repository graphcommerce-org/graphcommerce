import type { ProductListItemProps } from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { Box } from '@mui/material'
import { CompareProductToggle } from '../components'
import type { CompareProductIdInternalFragment } from '../graphql'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
  ifConfig: 'compare',
}

export function ProductListItem(props: PluginProps<ProductListItemProps>) {
  const { Prev, ...rest } = props
  const { children, topRight } = props
  if (import.meta.graphCommerce.layout?.compareVariant === 'CHECKBOX')
    return (
      <Prev topRight={topRight} {...rest}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CompareProductToggle {...rest} product={props as CompareProductIdInternalFragment} />
        </Box>
        {children}
      </Prev>
    )

  if (
    import.meta.graphCommerce.layout?.compareVariant === 'ICON' ||
    !import.meta.graphCommerce.layout?.compareVariant
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
