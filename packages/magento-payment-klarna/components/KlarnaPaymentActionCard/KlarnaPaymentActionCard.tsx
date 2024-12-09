import Script from 'next/script'
import { Image } from '@graphcommerce/image'
import { PaymentMethodActionCardProps } from '@graphcommerce/magento-cart-payment-method'
import { ActionCard, useIconSvgSize } from '@graphcommerce/next-ui'
import klarnaMark from '../../icons/klarna.png'

export function KlarnaPaymentActionCard(props: PaymentMethodActionCardProps) {
  const iconSize = useIconSvgSize('large')

  return (
    <>
      <Script src='https://x.klarnacdn.net/kp/lib/v1/api.js' strategy='lazyOnload' />
      <ActionCard
        {...props}
        image={
          <Image
            layout='fixed'
            sx={{ width: iconSize, height: iconSize, objectFit: 'contain' }}
            unoptimized
            src={klarnaMark}
          />
        }
      />
    </>
  )
}
