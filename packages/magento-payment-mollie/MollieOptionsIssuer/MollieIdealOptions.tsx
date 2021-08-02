import { PaymentOptionsProps } from '@reachdigital/magento-cart-payment-method'
import React from 'react'
import MollieIssuerOptions from './MollieIssuerOptions'

export default function MollieIdealOptions(props: PaymentOptionsProps) {
  return <MollieIssuerOptions label='Bank' {...props} />
}
