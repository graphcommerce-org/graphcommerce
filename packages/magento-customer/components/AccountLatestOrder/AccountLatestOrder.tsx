import { SectionContainer } from '@graphcommerce/next-ui'
import React from 'react'
import useOrderCardItemImages from '../../hooks/useOrderCardItemImages'
import { AccountOrdersFragment } from '../AccountOrders/AccountOrders.gql'
import { NoOrdersFound } from '../NoOrdersFound/NoOrdersFound'
import { OrderCard } from '../OrderCard/OrderCard'

export type AccountLatestOrderProps = AccountOrdersFragment & {
  loading: boolean
}

export function AccountLatestOrder(props: AccountLatestOrderProps) {
  const { orders, loading } = props
  const latestOrderCard = orders?.items?.[(orders?.items?.length ?? 1) - 1]
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
