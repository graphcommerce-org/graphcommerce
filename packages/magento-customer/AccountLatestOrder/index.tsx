import React from 'react'
import SectionContainer from '../../next-ui/SectionContainer'
import { AccountOrdersFragment } from '../AccountOrders/AccountOrders.gql'
import NoOrdersFound from '../NoOrdersFound'
import OrderCard from '../OrderCard'

type AccountLatestOrderProps = AccountOrdersFragment & {
  loading: boolean
}

export default function AccountLatestOrder(props: AccountLatestOrderProps) {
  const { orders, loading } = props
  const latestOrderCard = orders?.items?.[orders?.items?.length - 1]

  // TODO: when Magento's fixes their API sorting
  // const latestOrderCard = orders?.items?.[0]

  return (
    <SectionContainer label='Latest order'>
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
