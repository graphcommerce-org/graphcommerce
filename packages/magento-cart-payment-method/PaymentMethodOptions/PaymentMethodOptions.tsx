import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import { AnimatePresence } from 'framer-motion'
import { PaymentMethodOptionsProps } from '../Api/PaymentMethod'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

export default function PaymentMethodOptions(props: PaymentMethodOptionsProps) {
  const { selectedMethod, selectedModule } = usePaymentMethodContext()

  return (
    <AnimatePresence initial={false}>
      {selectedModule && selectedMethod && (
        <AnimatedRow key={selectedMethod.code}>
          <selectedModule.PaymentOptions {...selectedMethod} {...props} />
        </AnimatedRow>
      )}
    </AnimatePresence>
  )
}
