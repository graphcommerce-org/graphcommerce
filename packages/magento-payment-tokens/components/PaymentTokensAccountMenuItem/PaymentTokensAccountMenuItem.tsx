import {
  AccountDashboardDocument,
  AccountMenuItem,
  useCustomerQuery,
  type AccountMenuItemProps,
} from '@graphcommerce/magento-customer'
import { iconCreditCard } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import type { SetOptional } from 'type-fest'

type PaymentTokensAccountMenuItemProps = SetOptional<
  Omit<AccountMenuItemProps, 'href'>,
  'iconSrc' | 'title'
>

export function PaymentTokensAccountMenuItem(props: PaymentTokensAccountMenuItemProps) {
  const dashboard = useCustomerQuery(AccountDashboardDocument, { fetchPolicy: 'cache-only' })
  const tokens = dashboard.data?.customerPaymentTokens?.items

  if (!tokens || tokens.length === 0) return null

  return (
    <AccountMenuItem
      href='/account/payment-tokens'
      iconSrc={iconCreditCard}
      title={<Trans id='Stored payment methods'>Stored payment methods</Trans>}
      subtitle={<Trans id='For faster checkout'>For faster checkout</Trans>}
      {...props}
    />
  )
}
