import { Image } from '@graphcommerce/image'
import type { PaymentMethodActionCardProps } from '@graphcommerce/magento-cart-payment-method'
import { ActionCard } from '@graphcommerce/next-ui'

type MollieActionCardProps = PaymentMethodActionCardProps

export function MollieActionCard(props: MollieActionCardProps) {
  const { mollie_meta } = props

  return (
    <ActionCard
      {...props}
      image={mollie_meta?.image && <Image layout='fill' unoptimized src={mollie_meta.image} />}
    />
  )
}
