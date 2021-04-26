import { Alert } from '@material-ui/lab'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import React from 'react'
import { usePaymentMethodContext } from './PaymentMethodContext'

export default function PaymentMethodError() {
  const { error, setError } = usePaymentMethodContext()

  if (!error) return null
  return (
    <AnimatedRow>
      <Alert severity={error.severity ?? 'info'} onClose={() => setError(undefined)}>
        {error.message}
      </Alert>
    </AnimatedRow>
  )
}
