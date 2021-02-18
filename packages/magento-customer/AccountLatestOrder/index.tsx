import SectionHeader from '@reachdigital/next-ui/SectionHeader'
import React from 'react'
import OrderCard from '../OrderCard'
import { AccountLatestOrderFragment } from './AccountLatestOrder.gql'

type AccountLatestOrderProps = AccountLatestOrderFragment

export default function AccountLatestOrder(props: AccountLatestOrderProps) {
  const { orders } = props
  const latestOrderCard = orders?.items?.[0]

  return (
    <div>
      <SectionHeader labelLeft='Latest order' />
      {!latestOrderCard && <div>No order found</div>}
      {latestOrderCard && <OrderCard {...latestOrderCard} />}
    </div>
  )
}
