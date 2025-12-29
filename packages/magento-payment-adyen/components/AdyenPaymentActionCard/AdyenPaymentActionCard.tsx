import { Image } from '@graphcommerce/image'
import type { PaymentMethodActionCardProps } from '@graphcommerce/magento-cart-payment-method'
import { ActionCard, useIconSvgSize } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import { useAdyenPaymentMethod } from '../../hooks/useAdyenPaymentMethod'

export function AdyenPaymentActionCard(props: PaymentMethodActionCardProps) {
  const { child } = props
  const iconSize = useIconSvgSize('large')

  const icon = useAdyenPaymentMethod(child)?.icon

  return (
    <ActionCard
      {...props}
      details={child === 'ideal' && <Trans>Pay with iDEAL</Trans>}
      image={
        !!icon?.url &&
        !!icon?.width &&
        !!icon?.height && (
          <Image
            layout='fixed'
            width={icon.width}
            height={icon.height}
            sx={{
              width: `calc(${iconSize} / ${'var(--icon-height)'} *  ${'var(--icon-width)'})`,
              height: iconSize,
            }}
            sizes={iconSize}
            unoptimized
            src={icon.url}
            style={{
              '--icon-height': icon.height,
              '--icon-width': icon.width,
            }}
          />
        )
      }
    />
  )
}
