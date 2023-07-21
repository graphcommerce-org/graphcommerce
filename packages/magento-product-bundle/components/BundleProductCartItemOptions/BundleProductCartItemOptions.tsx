import { SelectedCustomizableOptions } from '@graphcommerce/magento-cart-items'
import { Box } from '@mui/material'
import { ConfigurableCartItemFragment } from '../../ConfigurableCartItem/ConfigurableCartItem.gql'
import { BundleProductOptionsFragment } from '../BundleProductOptions/BundleProductOptions.gql'
import { BundleCartItemFragment } from '../BundleCartItem/BundleCartItem.gql'
import { Money } from '@graphcommerce/magento-store'

type BundleProductCartItemOptionsProps = BundleCartItemFragment

export function BundleProductCartItemOptions(props: BundleProductCartItemOptionsProps) {
  const { bundle_options, customizable_options, prices } = props

  return (
    <>
      {bundle_options?.map((option) =>
        option?.values.map((option_value) => (
          <Box
            key={option_value?.uid}
            sx={(theme) => ({ display: 'flex', gap: theme.spacings.xxs })}
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
