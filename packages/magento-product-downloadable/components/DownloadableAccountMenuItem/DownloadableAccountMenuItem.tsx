import {
  AccountDashboardDocument,
  AccountMenuItem,
  useCustomerQuery,
  type AccountMenuItemProps,
} from '@graphcommerce/magento-customer'
import { filterNonNullableKeys, iconDownload } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import type { SetOptional } from 'type-fest'

type StoreCreditAccountMenuItemProps = SetOptional<
  Omit<AccountMenuItemProps, 'href'>,
  'iconSrc' | 'title'
>

export function DownloadableAccountMenuItem(props: StoreCreditAccountMenuItemProps) {
  const dashboard = useCustomerQuery(AccountDashboardDocument, { fetchPolicy: 'cache-only' })
  const downloadable = dashboard.data?.customerDownloadableProducts

  const items = filterNonNullableKeys(downloadable?.items)
  const count = items.length

  if (!count) return null

  return (
    <AccountMenuItem
      href='/account/downloads'
      iconSrc={iconDownload}
      title={<Trans id='Downloads'>Downloads</Trans>}
      subtitle={<Trans>You have {count} downloads available.</Trans>}
      {...props}
    />
  )
}
