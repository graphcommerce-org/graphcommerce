import { PaymentMethodActionCardProps } from '@graphcommerce/magento-cart-payment-method'
import { ActionCard, useIconSvgSize } from '@graphcommerce/next-ui'
import { Image } from '@graphcommerce/image'
import { Trans } from '@lingui/react'
import googlepay from './googlepay.svg'
import applepay from './applepay.svg'
import paypal from './paypal.svg'
import scheme from './scheme.svg'

export function AdyenPaymentActionCard(props: PaymentMethodActionCardProps) {
  const { child } = props
  const iconSize = useIconSvgSize('large')

  const icons = {
    scheme: {
      image: scheme,
    },
    adyen_cc: {
      image: scheme,
    },
    applepay: {
      image: applepay,
    },
    googlepay: {
      image: googlepay,
    },
    paypal: {
      image: paypal,
    },
  }
  return (
    <ActionCard
      {...props}
      details={child === 'ideal' && <Trans id='Pay with iDEAL' />}
      image={
        !!icons[child]?.image && (
          <Image
            unoptimized
            layout='fixed'
            loading='eager'
            sizes={iconSize}
            src={icons[child]['image']}
          />
        )
      }
    />
  )
}
