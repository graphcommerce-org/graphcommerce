import { Image } from '@graphcommerce/image'
import { PaymentMethodActionCardProps } from '@graphcommerce/magento-cart-payment-method'
import { ActionCard } from '@graphcommerce/next-ui'

type MollieActionCardProps = PaymentMethodActionCardProps & { icon: any }

export function MollieActionCard(props: MollieActionCardProps) {
  const { mollie_meta, icon } = props
  const iconSize = '30px'

  return (
    <ActionCard
      {...props}
      image={
        mollie_meta?.image && (
          <Image
            layout='fixed'
            sx={{ width: iconSize, height: iconSize, objectFit: 'contain' }}
            unoptimized
            src={icon}
          />
        )
      }
    />
  )
}
