import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import React from 'react'
import { AccountOrdersFragment } from '../AccountOrders/AccountOrders.gql'
import NoOrdersFound from '../NoOrdersFound'
import OrderCard from '../OrderCard'
import useOrderCardItemImages from '../OrderCardItemImage/useOrderCardItemImages'

type AccountLatestOrderProps = AccountOrdersFragment & {
  loading: boolean
}

export default function AccountLatestOrder(props: AccountLatestOrderProps) {
  const { orders, loading } = props
  const latestOrderCard = orders?.items?.[orders?.items?.length - 1]
  const images = useOrderCardItemImages(orders)

  // TODO: when Magento fixes their API sorting
  // const latestOrderCard = orders?.items?.[0]

  return (
    <SectionContainer labelLeft='Latest order'>
      {!loading && (
        <>
          {!latestOrderCard && <NoOrdersFound />}
          {latestOrderCard && <OrderCard {...latestOrderCard} images={images} />}
        </>
      )}
      {loading && <OrderCard loading />}
    </SectionContainer>
  )
}
