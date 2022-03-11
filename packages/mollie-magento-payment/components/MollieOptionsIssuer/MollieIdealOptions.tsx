import { PaymentOptionsProps } from '@graphcommerce/magento-cart-payment-method'
import { MollieIssuerOptions } from './MollieIssuerOptions'

export function MollieIdealOptions(props: PaymentOptionsProps) {
  return <MollieIssuerOptions label='Choose your bank' {...props} />
}
