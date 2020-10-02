import { useQuery } from '@apollo/client'
import { CustomerDocument } from 'generated/documents'
import React from 'react'
import SignOutForm from './SignOutForm'

export default function AccountDashboard() {
  const { data } = useQuery(CustomerDocument)
  return (
    <div>
      {data?.customer?.prefix} {data?.customer?.firstname} {data?.customer?.lastname}
      <SignOutForm />
    </div>
  )
}
