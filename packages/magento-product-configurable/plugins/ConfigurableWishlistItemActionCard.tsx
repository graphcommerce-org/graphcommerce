import type { WishlistItemActionCard } from '@graphcommerce/magento-wishlist'
import type { PluginProps } from '@graphcommerce/next-config'
import { Box } from '@mui/material'
import { ConfigurableWishlistItemAction } from '../components/ConfigurableWishlistItemAction/ConfigurableWishlistItemAction'
import { ConfigurableWishlistItem } from '@graphcommerce/graphql-mesh'

export const component = 'WishlistItemActionCard'
export const exported =
  '@graphcommerce/magento-wishlist/components/WishlistItemActionCard/WishlistItemActionCard'

export function ConfigurableWishlistItemActionCard(
  props: PluginProps<
    React.ComponentProps<typeof WishlistItemActionCard> & ConfigurableWishlistItem
  >,
) {
  const { Prev, configurable_options, ...rest } = props

  if (rest.__typename !== 'ConfigurableWishlistItem') return <Prev {...props} />

  return (
    <Prev
      {...props}
      secondaryAction={
        <ConfigurableWishlistItemAction configurable_options={configurable_options} {...rest} />
      }
      details={
        configurable_options && (
          <Box sx={(theme) => ({ mb: `calc(${theme.spacings.xxs} / 2)` })}>
            {configurable_options?.map((option) => (
              <Box key={option?.configurable_product_option_uid}>{option?.value_label}</Box>
            ))}
          </Box>
        )
      }
    />
  )
}

export const Plugin = ConfigurableWishlistItemActionCard
