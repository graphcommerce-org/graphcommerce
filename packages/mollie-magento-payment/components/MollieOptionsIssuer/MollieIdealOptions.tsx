import { PaymentOptionsProps } from '@graphcommerce/magento-cart-payment-method'
import { Trans } from '@lingui/macro'
import { Box } from '@mui/material'
import { MollieIssuerOptions } from './MollieIssuerOptions'

export function MollieIdealOptions(props: PaymentOptionsProps) {
  return (
    <MollieIssuerOptions label='Choose your bank' {...props}>
      <Box
        component='ul'
        sx={(theme) => ({ typography: 'body2', paddingLeft: theme.spacings.xs, margin: 0 })}
      >
        <li>
          <Trans>Choose your bank, and place your order.</Trans>
        </li>
        <li>
          <Trans>Complete the payment on your bank’s website.</Trans>
        </li>
        <li>
          <Trans>
            As soon as the payment is completed, you will automatically return to the webshop.
          </Trans>
        </li>
      </Box>
    </MollieIssuerOptions>
  )
}
