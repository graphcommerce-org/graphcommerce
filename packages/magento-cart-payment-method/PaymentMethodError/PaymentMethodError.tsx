import { Alert } from '@material-ui/lab'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import React from 'react'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

export type PaymentMethodErrorProps = Record<string, unknown>

export default function PaymentMethodError(props: PaymentMethodErrorProps) {
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
