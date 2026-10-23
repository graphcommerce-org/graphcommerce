import type { PaymentMethodActionCardProps } from '@graphcommerce/magento-cart-payment-method'
import { ActionCard, iconCreditCard, IconSvg } from '@graphcommerce/next-ui'

export function PaymentMethodActionCard(props: PaymentMethodActionCardProps) {
  return <ActionCard {...props} image={<IconSvg src={iconCreditCard} size='large' />} />
}
