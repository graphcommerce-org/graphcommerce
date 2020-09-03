import useHeaderSpacing from 'components/Header/useHeaderSpacing'
import { useCustomerQuery } from 'generated/apollo'
import React from 'react'
import SignOutForm from './SignOutForm'

export default function AccountDashboard() {
  const { data } = useCustomerQuery()
  const asdf = useHeaderSpacing()
  return (
    <div className={asdf.marginTop}>
      {data?.customer?.prefix} {data?.customer?.firstname} {data?.customer?.lastname}
      <SignOutForm />
    </div>
  )
}
