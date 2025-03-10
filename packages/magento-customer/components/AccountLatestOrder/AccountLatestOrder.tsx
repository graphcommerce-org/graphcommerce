import { SectionContainer } from '@graphcommerce/next-ui'
import type { AccountOrdersFragment } from '../AccountOrders/AccountOrders.gql'
import { NoOrdersFound } from '../NoOrdersFound/NoOrdersFound'
import { OrderCard } from '../Order'

export type AccountLatestOrderProps = AccountOrdersFragment & {
  loading: boolean
}

/**
 * @deprecated
 * @public
 */
export function AccountLatestOrder(props: AccountLatestOrderProps) {
  const { orders, loading } = props
  const latestOrderCard = orders?.items?.[(orders?.items?.length ?? 1) - 1]

  // TODO: when Magento fixes their API sorting
  // const latestOrderCard = orders?.items?.[0]

  return (
    <SectionContainer labelLeft='Latest order'>
      {!loading && (
        <>
          {!latestOrderCard && <NoOrdersFound />}
          {latestOrderCard && <OrderCard {...latestOrderCard} />}
        </>
      )}
      {loading && <OrderCard loading />}
    </SectionContainer>
  )
}
