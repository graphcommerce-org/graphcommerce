import { SelectedCustomizableOptions } from '@graphcommerce/magento-cart-items'
import { Money } from '@graphcommerce/magento-store'
import { Box } from '@mui/material'
import { BundleCartItemFragment } from '../BundleCartItem/BundleCartItem.gql'

type BundleProductCartItemOptionsProps = BundleCartItemFragment

export function BundleProductCartItemOptions(props: BundleProductCartItemOptionsProps) {
  const { bundle_options, customizable_options, prices } = props

  return (
    <>
      {bundle_options?.map((option) =>
        option?.values.map((option_value) => (
          <Box
            key={option_value?.uid}
            sx={(theme) => ({
              display: 'flex',
              gap: theme.spacings.xxs,
              [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.caption.fontSize,
              },
            })}
          >
            <Box sx={{ color: 'text.primary' }}>{option_value?.label}</Box>
            <Money currency={prices?.price.currency} value={option_value?.price} />
          </Box>
        )),
      )}

      <SelectedCustomizableOptions customizable_options={customizable_options} />
    </>
  )
}
