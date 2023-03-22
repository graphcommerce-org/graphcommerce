import { PaymentStatusEnum } from '@graphcommerce/graphql-mesh'
import { Trans } from '@lingui/react'

export const successStatusses: PaymentStatusEnum[] = ['AUTHORIZED', 'COMPLETED', 'PAID', 'SHIPPING']

export function PaymentStatus({ paymentStatus }: { paymentStatus: PaymentStatusEnum }) {
  switch (paymentStatus) {
    case 'CANCELED':
      return <Trans id='The payment has been canceled, please try again.' />
    case 'EXPIRED':
      return <Trans id='The payment has expired, please try again.' />
    case 'OPEN':
      return <Trans id={"The payment hasn't been completed yet, please try again."} />
    default:
      return <Trans id='Payment failed with status: {paymentStatus}' values={{ paymentStatus }} />
  }
}
