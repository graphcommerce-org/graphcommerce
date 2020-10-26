import { useQuery } from '@apollo/client'
import React from 'react'
import { CustomerDocument } from './Customer.graphql'

export default function AccountDashboard() {
  const { data } = useQuery(CustomerDocument)
  return (
    <div>
      {data?.customer?.prefix} {data?.customer?.firstname} {data?.customer?.lastname}
    </div>
  )
}
