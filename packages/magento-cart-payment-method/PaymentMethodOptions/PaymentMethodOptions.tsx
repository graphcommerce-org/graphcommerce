import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

export type PaymentMethodOptionsProps = Record<string, unknown>

export default function PaymentMethodOptions(props: PaymentMethodOptionsProps) {
  const { selectedMethod, selectedModule } = usePaymentMethodContext()
  const PaymentOptions = selectedModule?.PaymentOptions

  if (!PaymentOptions || !selectedMethod?.code) return null
  return <PaymentOptions {...selectedMethod} />
}
