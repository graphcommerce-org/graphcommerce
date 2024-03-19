import { ProductListItemProps } from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { Box } from '@mui/material'
import { CompareProductToggle } from '../components'

export const component = 'ProductListItem'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'compare'

function CompareAbleProductListItem(props: PluginProps<ProductListItemProps>) {
  const { Prev, ...rest } = props
  const { children, topRight } = props
  if (import.meta.graphCommerce.compareVariant === 'CHECKBOX')
    return (
      <Prev topRight={topRight} {...rest}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CompareProductToggle {...rest} product={props} />
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
            <CompareProductToggle {...rest} product={props} />
          </>
        }
      >
        {children}
      </Prev>
    )
}
export const Plugin = CompareAbleProductListItem
