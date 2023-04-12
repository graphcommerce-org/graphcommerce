import { ProductListItemProps } from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { Box } from '@mui/material'
import { CompareProductToggle } from '../components'
import { useCompareVariant } from '../hooks/useCompareVariant'

export const component = 'ProductListItem' // Component to extend, required
export const exported = '@graphcommerce/magento-product' // Location where the component is exported, required
export const ifConfig: IfConfig = 'compare'

function CompareAbleProductListItem(props: PluginProps<ProductListItemProps>) {
  const { Prev, ...rest } = props
  const { children, topRight } = props
  const compareVariant = useCompareVariant()

  if (compareVariant === 'checkbox')
    return (
      <Prev topRight={topRight} {...rest}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CompareProductToggle {...rest} product={props} />
        </Box>
        {children}
      </Prev>
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
