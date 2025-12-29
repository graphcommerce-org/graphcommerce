import { useQuery } from '@graphcommerce/graphql'
import { type PaymentOptionsProps } from '@graphcommerce/magento-cart-payment-method'
import { PaymentMethodOptionsNoop } from '@graphcommerce/magento-cart-payment-method/PaymentMethodOptionsNoop/PaymentMethodOptionsNoop'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { SectionContainer } from '@graphcommerce/next-ui'
import React from 'react'

export function CheckmoPaymentOptions(props: PaymentOptionsProps) {
  const config = useQuery(StoreConfigDocument).data?.storeConfig
  const payableTo = config?.check_money_order_make_check_payable_to
  const sendTo = config?.check_money_order_send_check_to?.split('\n')

  if (!payableTo && !sendTo) return <PaymentMethodOptionsNoop {...props} />

  return (
    <PaymentMethodOptionsNoop {...props}>
      <SectionContainer labelLeft='Payable to'>{payableTo}</SectionContainer>
      <SectionContainer labelLeft='Send to'>
        {sendTo?.map((line) => (
          <React.Fragment key={line}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </SectionContainer>
    </PaymentMethodOptionsNoop>
  )
}
