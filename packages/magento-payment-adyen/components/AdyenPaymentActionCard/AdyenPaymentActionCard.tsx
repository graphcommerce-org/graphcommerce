import { Image } from '@graphcommerce/image'
import type { PaymentMethodActionCardProps } from '@graphcommerce/magento-cart-payment-method'
import { ActionCard, useIconSvgSize } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useAdyenPaymentMethod } from '../../hooks/useAdyenPaymentMethod'

export function AdyenPaymentActionCard(props: PaymentMethodActionCardProps) {
  const { child } = props
  const iconSize = useIconSvgSize('large')

  const icon = useAdyenPaymentMethod(child)?.icon

  return (
    <ActionCard
      {...props}
      details={child === 'ideal' && <Trans id='Pay with iDEAL' />}
      image={
        !!icon?.url &&
        !!icon?.width &&
        !!icon?.height && (
          <Image
            layout='fixed'
            width={icon.width}
            height={icon.height}
            sx={{ width: `calc(${iconSize} / ${icon.height} *  ${icon.width})`, height: iconSize }}
            sizes={iconSize}
            unoptimized
            src={icon.url}
          />
        )
      }
    />
  )
}
