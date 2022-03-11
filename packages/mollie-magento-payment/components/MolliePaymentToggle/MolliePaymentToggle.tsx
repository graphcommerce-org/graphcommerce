import { Image } from '@graphcommerce/image'
import { PaymentToggleProps } from '@graphcommerce/magento-cart-payment-method'

export function PaymentToggle(props: PaymentToggleProps) {
  const { mollie_meta, title } = props

  return (
    <>
      {mollie_meta?.image && (
        <Image layout='fixed' src={mollie_meta?.image} unoptimized alt={title} />
      )}
      &nbsp;
      {title}
    </>
  )
}
