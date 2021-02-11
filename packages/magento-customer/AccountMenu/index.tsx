import { AccountMenuFragment } from './AccountMenu.gql'

export type AccountMenuProps = AccountMenuFragment

export default function AccountMenu(props: AccountMenuProps) {
  const { reviews, orders } = props
  const hasReviews = (reviews.page_info.total_pages ?? 0) > 0
  const hasOrders = (orders?.page_info?.total_pages ?? 0) > 0

  return (
    <div>
      {hasReviews && 'has reviews'}
      {hasOrders && 'has orders'}
    </div>
  )
}
