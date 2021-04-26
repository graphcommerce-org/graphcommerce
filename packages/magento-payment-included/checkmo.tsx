import { PaymentModule } from '@reachdigital/magento-cart/payment-method/PaymentMethod'
import { usePaymentMethodContext } from '@reachdigital/magento-cart/payment-method/PaymentMethodContext'
import Button from '@reachdigital/next-ui/Button'

const checkmo: PaymentModule = {
  PaymentButton: (props) => {
    const { loading } = usePaymentMethodContext()
    const {
      child,
      title,
      onPaymentComplete,
      onPaymentStart,
      onPaymentError,
      code,
      preferred,
      buttonProps,
    } = props

    function onClick() {
      onPaymentStart()
      onPaymentComplete()
    }

    return (
      <Button {...buttonProps} onClick={onClick} loading={loading}>
        {buttonProps.children} (<em>{title}</em>)
      </Button>
    )
  },
}

export default checkmo
