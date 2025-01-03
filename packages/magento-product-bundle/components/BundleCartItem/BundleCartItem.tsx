import { SelectedCustomizableOptions } from '@graphcommerce/magento-cart-items'
import { Money } from '@graphcommerce/magento-store'
import { Typography } from '@mui/material'
import type { BundleProductCartItemOptionsProps } from '../BundleProductCartItemOptions/BundleProductCartItemOptions'

/**
 * @deprecated
 * @public
 */
export function BundleCartItem(props: BundleProductCartItemOptionsProps) {
  const { bundle_options } = props
  return (
    <>
      {bundle_options.map((option) => {
        if (!option?.uid) return null
        return (
          <div key={option.uid}>
            {option.values.map((value) => {
              if (!value?.uid) return null
              return (
                <Typography variant='body2' component='div' key={value.uid}>
                  {value.quantity > 1 && <>{value.quantity} &times; </>}
                  <Typography variant='subtitle2' component='span'>
                    {value.label}
                  </Typography>{' '}
                  {value.price > 0 && <Money value={value.price} />}
                </Typography>
              )
            })}
          </div>
        )
      })}
      <SelectedCustomizableOptions {...props} />
    </>
  )
}
