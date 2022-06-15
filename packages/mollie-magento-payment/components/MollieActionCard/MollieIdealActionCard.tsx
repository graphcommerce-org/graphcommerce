import { Image } from '@graphcommerce/image'
import { PaymentMethodActionCardProps } from '@graphcommerce/magento-cart-payment-method'
import { ActionCard, useIconSvgSize } from '@graphcommerce/next-ui'
import idealIcon from './ideal-logo.svg'

export function MollieActionCard(props: PaymentMethodActionCardProps) {
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
