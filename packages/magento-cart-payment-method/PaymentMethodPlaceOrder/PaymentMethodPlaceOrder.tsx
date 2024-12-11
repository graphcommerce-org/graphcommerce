import type { UseFormComposeOptions } from '@graphcommerce/react-hook-form'
import { usePaymentMethodContext } from '../PaymentMethodContext/paymentMethodContextType'

export type PaymentMethodPlaceOrderProps = Pick<UseFormComposeOptions, 'step'>

export function PaymentMethodPlaceOrder(props: PaymentMethodPlaceOrderProps) {
  const { step } = props
  const { selectedMethod, selectedModule } = usePaymentMethodContext()

  if (!selectedModule || !selectedMethod?.code || !selectedModule.PaymentPlaceOrder) return null

  return <selectedModule.PaymentPlaceOrder {...selectedMethod} step={step} />
}
