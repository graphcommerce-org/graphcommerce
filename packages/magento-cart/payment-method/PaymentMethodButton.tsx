import { ArrowForwardIos } from '@material-ui/icons'
import Button, { ButtonProps } from '@reachdigital/next-ui/Button'
import React, { ReactNode } from 'react'
import { usePaymentMethodContext } from './PaymentMethodContext'

export default function PaymentMethodButton(props: ButtonProps) {
  const { selectedMethod, selectedModule, setError, setLoading } = usePaymentMethodContext()
  const PaymentButton = selectedModule?.PaymentButton

  const onPaymentStart = () => {
    setLoading(true)
  }
  const onPaymentComplete = () => {}
  const onPaymentError = (error: ReactNode) => {
    setLoading(false)
    setError(error)
  }

  return (
    <>
      {!PaymentButton || !selectedMethod?.code ? (
        <Button {...props} />
      ) : (
        <PaymentButton
          {...selectedMethod}
          {...props}
          onPaymentStart={onPaymentStart}
          onPaymentComplete={onPaymentComplete}
          onPaymentError={onPaymentError}
        />
      )}
    </>
  )
}
