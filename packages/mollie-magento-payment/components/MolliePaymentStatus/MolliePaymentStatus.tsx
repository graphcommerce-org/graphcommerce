import type { PaymentStatusEnum } from '@graphcommerce/graphql-mesh'
import { Trans } from '@lingui/react/macro'

export const successStatusses: PaymentStatusEnum[] = ['AUTHORIZED', 'COMPLETED', 'PAID', 'SHIPPING']

export function PaymentStatus({ paymentStatus }: { paymentStatus: PaymentStatusEnum }) {
  switch (paymentStatus) {
    case 'CANCELED':
      return <Trans>The payment has been canceled, please try again.</Trans>
    case 'EXPIRED':
      return <Trans>The payment has expired, please try again.</Trans>
    case 'OPEN':
      return <Trans>The payment hasn't been completed yet, please try again.</Trans>
    default:
      return <Trans>Payment failed with status: {paymentStatus}</Trans>
  }
}
