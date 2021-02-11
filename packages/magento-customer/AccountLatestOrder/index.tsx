import SectionHeader from '@reachdigital/next-ui/SectionHeader'
import React from 'react'
import OrderCard from '../OrderCard'
import { AccountLatestOrderFragment } from './AccountLatestOrder.gql'

export type AccountLatestOrderProps = AccountLatestOrderFragment

export default function AccountLatestOrder(props: AccountLatestOrderProps) {
  const { orders } = props

  const latestOrder = orders?.items?.[0]

  return (
    <div>
      <SectionHeader labelLeft='Latest order' />
      latestOrder && <OrderCard {...latestOrder} />
    </div>
  )
}
