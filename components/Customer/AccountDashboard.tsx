import { useQuery } from '@apollo/client'
import useHeaderSpacing from 'components/AppShell/useHeaderSpacing'
import { CustomerDocument } from 'generated/documents'
import React from 'react'
import SignOutForm from './SignOutForm'

export default function AccountDashboard() {
  const { data } = useQuery(CustomerDocument)
  const asdf = useHeaderSpacing()
  return (
    <div className={asdf.marginTop}>
      {data?.customer?.prefix} {data?.customer?.firstname} {data?.customer?.lastname}
      <SignOutForm />
    </div>
  )
}
