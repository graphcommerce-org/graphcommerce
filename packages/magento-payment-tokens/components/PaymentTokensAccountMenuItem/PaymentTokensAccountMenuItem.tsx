import {
  AccountDashboardDocument,
  AccountMenuItem,
  useCustomerQuery,
  type AccountMenuItemProps,
} from '@graphcommerce/magento-customer'
import { Trans } from '@lingui/macro'
import type { SetOptional } from 'type-fest'
import { useRewardPointsConfig } from '../../hooks/useRewardPointsEnabled'
import { RewardPointsAmount } from '../RewardPointsAmount/RewardPointsAmount'
import { iconRewardPoints } from '../RewardPointsAmount/rewardPointsIcon'

type RewardPointsAccountMenuItemProps = SetOptional<
  Omit<AccountMenuItemProps, 'href'>,
  'iconSrc' | 'title'
>

export function RewardPointsAccountMenuItem(props: RewardPointsAccountMenuItemProps) {
  const dashboard = useCustomerQuery(AccountDashboardDocument, { fetchPolicy: 'cache-only' })
  const customer = dashboard.data?.customer

  const config = useRewardPointsConfig()

  if (!config.enabled) return null

  if (!customer?.reward_points?.balance?.points) return null

  return (
    <AccountMenuItem
      href='/account/reward-points'
      iconSrc={iconRewardPoints}
      title={<Trans id='Store Credit'>Reward Points</Trans>}
      subtitle={<RewardPointsAmount points={customer?.reward_points?.balance?.points} />}
      {...props}
    />
  )
}
