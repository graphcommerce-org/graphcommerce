import { Image } from '@graphcommerce/image'
import { PaymentMethodActionCardProps } from '@graphcommerce/magento-cart-payment-method'
import { ActionCard, useIconSvgSize } from '@graphcommerce/next-ui'
import afterpayMark from '../../icons/afterpay.png'

export function AfterpayPaymentActionCard(props: PaymentMethodActionCardProps) {
  const iconSize = useIconSvgSize('large')

  return (
    <ActionCard
      {...props}
      image={
        <Image
          layout='fixed'
          sx={{ width: iconSize, height: iconSize, objectFit: 'contain' }}
          unoptimized
          src={afterpayMark}
        />
      }
    />
  )
}
