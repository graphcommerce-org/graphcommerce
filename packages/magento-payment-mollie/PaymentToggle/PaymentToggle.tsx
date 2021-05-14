import { PaymentToggleProps } from '@reachdigital/magento-cart-payment-method'

export default function MollieToggle(props: PaymentToggleProps) {
  const { mollie_meta, title } = props

  return (
    <>
      {mollie_meta?.image && <img src={mollie_meta?.image} alt={title} />}
      &nbsp;
      {title}
    </>
  )
}
