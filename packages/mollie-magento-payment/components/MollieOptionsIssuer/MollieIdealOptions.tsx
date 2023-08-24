import { PaymentOptionsProps } from '@graphcommerce/magento-cart-payment-method'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'
import { MollieIssuerOptions } from './MollieIssuerOptions'

export function MollieIdealOptions(props: PaymentOptionsProps) {
  return (
    <MollieIssuerOptions label={i18n._(/* i18n */ 'Choose your bank')} {...props}>
      <Box
        component='ul'
        sx={(theme) => ({ typography: 'body2', paddingLeft: theme.spacings.xs, margin: 0 })}
      >
        <li>
          <Trans id='Choose your bank, and place your order.' />
        </li>
        <li>
          <Trans id='Complete the payment on your bank’s website.' />
        </li>
        <li>
          <Trans id='As soon as the payment is completed, you will automatically return to the webshop.' />
        </li>
      </Box>
    </MollieIssuerOptions>
  )
}
