import { usePaymentMethodContext } from './PaymentMethodContext'

export default function PaymentMethodOptions() {
  const { selectedMethod, selectedModule } = usePaymentMethodContext()
  const PaymentOptions = selectedModule?.PaymentOptions

  if (!PaymentOptions || !selectedMethod?.code) return null
  return <PaymentOptions {...selectedMethod} />
}
