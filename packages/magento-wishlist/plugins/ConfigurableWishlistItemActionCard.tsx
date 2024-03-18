import type { WishlistItemActionCardProps } from '@graphcommerce/magento-wishlist'
import type { PluginProps } from '@graphcommerce/next-config'
import { Box } from '@mui/material'
import { ConfigurableWishlistItemAction } from '../components/WishlistItemActionCard/ConfigurableWishlistItemAction'

export const component = 'WishlistItemActionCard'
export const exported =
  '@graphcommerce/magento-wishlist/components/WishlistItemActionCard/WishlistItemActionCard'

const ConfigurableWishlistItemActionCard = (props: PluginProps<WishlistItemActionCardProps>) => {
  const { Prev, details, item } = props
  if (item.__typename !== 'ConfigurableWishlistItem') return <Prev {...props} />
  const { configurable_options } = item
  return (
    <Prev
      {...props}
      secondaryAction={<ConfigurableWishlistItemAction {...props} />}
      details={
        configurable_options && configurable_options.length > 0 ? (
          <Box sx={(theme) => ({ mb: `calc(${theme.spacings.xxs} / 2)` })}>
            {configurable_options?.map((option) => (
              <Box key={option?.configurable_product_option_uid}>{option?.value_label}</Box>
            ))}
            {details}
          </Box>
        ) : (
          details
        )
      }
    />
  )
}

export const Plugin = ConfigurableWishlistItemActionCard
