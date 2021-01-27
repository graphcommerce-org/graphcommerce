import { Alert, AlertTitle } from '@material-ui/lab'
import AnimatedRow from '@reachdigital/next-ui/AnimatedForm/AnimatedRow'
import React from 'react'
import { usePaymentMethodContext } from './PaymentMethodContext'

export default function PaymentMethodError() {
  const { error, setError, selectedMethod } = usePaymentMethodContext()

  if (!error) return null
  return (
    <AnimatedRow>
      <Alert severity='warning' onClose={() => setError(undefined)}>
        {error}
      </Alert>
    </AnimatedRow>
  )
}
