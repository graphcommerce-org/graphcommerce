import { Image } from '@graphcommerce/image'
import type { PaymentMethodActionCardProps } from '@graphcommerce/magento-cart-payment-method'
import { ActionCard, responsiveVal as rv } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'

export function MSPPaymentActionCard(props: PaymentMethodActionCardProps) {
  const { child, multisafepay_additional_data } = props
  const iconSize = rv(30, 44)

  return (
    <ActionCard
      {...props}
      details={child === 'ideal' && <Trans id='Pay with iDEAL' />}
      image={
        multisafepay_additional_data?.image && (
          <Image
            layout='fixed'
            width={100}
            height={100}
            sx={{ width: iconSize, height: iconSize, objectFit: 'contain' }}
            sizes={iconSize}
            unoptimized
            src={multisafepay_additional_data?.image}
          />
        )
      }
    />
  )
}
