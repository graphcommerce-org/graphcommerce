import { PaymentStatusEnum } from '@graphcommerce/graphql-mesh'
import { Trans } from '@lingui/react'

export const successStatusses: PaymentStatusEnum[] = ['AUTHORIZED', 'COMPLETED', 'PAID', 'SHIPPING']

export function PaymentStatus({ paymentStatus }: { paymentStatus: PaymentStatusEnum }) {
  switch (paymentStatus) {
    case 'AUTHORIZED':
      return <Trans id='The payment has been completed, but the transaction did not yet occure.' />
    case 'CANCELED':
      return <Trans id='The payment has been canceled.' />
    case 'EXPIRED':
      return <Trans id='The payment has expired.' />
    case 'PENDING':
      return <Trans id="The payment process has been started, but it's not complete yet." />
    case 'REFUNDED':
      return <Trans id='You have refunded your purchase.' />
    default:
      return <Trans id='Payment failed with status: {paymentStatus}' values={{ paymentStatus }} />
  }
}
