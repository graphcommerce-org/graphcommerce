import { useQuery } from '@apollo/client'
import React from 'react'
import SectionContainer from '../../next-ui/SectionContainer'
import { AccountOrdersFragment } from '../AccountOrders/AccountOrders.gql'
import NoOrdersFound from '../NoOrdersFound'
import OrderCard from '../OrderCard'
import useOrderCardItems from '../OrderCardItem/useOrderCardItems'
import useOrderCardItemImages from '../OrderCardItemImage/useOrderCardItemImages'
import { OrderCardItemImagesDocument } from '../OrderCardItemImages/OrderCardItemImages.gql'

type AccountLatestOrderProps = AccountOrdersFragment & {
  loading: boolean
  locale?: string
}

export default function AccountLatestOrder(props: AccountLatestOrderProps) {
  const { orders, loading, locale } = props
  const latestOrderCard = orders?.items?.[orders?.items?.length - 1]
  const images = useOrderCardItemImages(orders)

  // TODO: when Magento's fixes their API sorting
  // const latestOrderCard = orders?.items?.[0]

  return (
    <SectionContainer label='Latest order'>
      {!loading && (
        <>
          {!latestOrderCard && <NoOrdersFound />}
          {latestOrderCard && <OrderCard {...latestOrderCard} images={images} locale={locale} />}
        </>
      )}

      {loading && <OrderCard locale={locale} loading />}
    </SectionContainer>
  )
}
