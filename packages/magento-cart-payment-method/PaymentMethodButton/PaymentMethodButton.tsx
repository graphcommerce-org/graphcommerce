import Button, { ButtonProps } from '@reachdigital/next-ui/Button'
import React from 'react'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

export type PaymentMethodButtonProps = ButtonProps

export default function PaymentMethodButton(props: PaymentMethodButtonProps) {
  const { children } = props
  const { selectedMethod, selectedModule } = usePaymentMethodContext()

  const PaymentButton = selectedModule?.PaymentButton
  return (
    <>
      {!PaymentButton || !selectedMethod?.code ? (
        <Button {...props}>
          {children}
          {selectedMethod?.title && (
            <>
              {' '}
              (<em>{selectedMethod?.title}</em>)
            </>
          )}
        </Button>
      ) : (
        <PaymentButton {...selectedMethod} buttonProps={props} />
      )}
    </>
  )
}
