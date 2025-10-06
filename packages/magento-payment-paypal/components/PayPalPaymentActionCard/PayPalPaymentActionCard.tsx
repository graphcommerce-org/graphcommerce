import { Image } from '@graphcommerce/image'
import type { PaymentMethodActionCardProps } from '@graphcommerce/magento-cart-payment-method'
import { ActionCard, useIconSvgSize } from '@graphcommerce/next-ui'
import paypalMark from '../../icons/paypal.jpg'

export function PayPalExpressActionCard(props: PaymentMethodActionCardProps) {
  const iconSize = useIconSvgSize('large')

  return (
    <ActionCard
      {...props}
      image={
        <Image
          layout='fixed'
          sx={{ width: iconSize, height: iconSize, objectFit: 'contain' }}
          unoptimized
          src={paypalMark}
        />
      }
    />
  )
}
