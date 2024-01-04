import { CartItemFragment, SelectedCustomizableOptions } from '@graphcommerce/magento-cart-items'
import { Money } from '@graphcommerce/magento-store'
import { nonNullable } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { BundleCartItemFragment } from '../BundleCartItem/BundleCartItem.gql'

export type BundleProductCartItemOptionsProps = BundleCartItemFragment & CartItemFragment

export function BundleProductCartItemOptions(props: BundleProductCartItemOptionsProps) {
  const { bundle_options, prices } = props

  return (
    <>
      {bundle_options?.map(
        (option) =>
          option?.values.filter(nonNullable).map((option_value) => (
            <Box
              key={option_value.uid}
              sx={(theme) => ({
                display: 'flex',
                gap: theme.spacings.xxs,
                [theme.breakpoints.down('sm')]: {
                  fontSize: theme.typography.caption.fontSize,
                },
              })}
            >
              <Box sx={{ color: 'text.primary' }}>{option_value.label}</Box>
              {option_value.price > 0 && (
                <Box sx={(theme) => ({ position: 'absolute', right: theme.spacings.xs })}>
                  <Money currency={prices?.price.currency} value={option_value.price} />
                </Box>
              )}
            </Box>
          )),
      )}

      <SelectedCustomizableOptions {...props} />
    </>
  )
}
