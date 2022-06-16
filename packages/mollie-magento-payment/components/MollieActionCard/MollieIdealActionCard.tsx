import { Image } from '@graphcommerce/image'
import { PaymentMethodActionCardProps } from '@graphcommerce/magento-cart-payment-method'
import { ActionCard, useIconSvgSize } from '@graphcommerce/next-ui'

type MollieActionCardProps = PaymentMethodActionCardProps & { icon: any }

export function MollieActionCard(props: MollieActionCardProps) {
  const { mollie_meta } = props
  const iconSize = useIconSvgSize('large')

  return (
    <ActionCard
      {...props}
      image={
        mollie_meta?.image && (
          <Image
            layout='fixed'
            sx={{ width: iconSize, height: iconSize }}
            unoptimized
            src={idealIcon}
          />
        )
      }
    />
  )
}
