import { makeStyles, Theme } from '@material-ui/core'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import React from 'react'
import AccountAddress from '../AccountAddress'
import { AccountAddressesFragment } from './AccountAddresses.gql'

export type AccountAddressesProps = AccountAddressesFragment

// const useStyles = makeStyles(
//   (theme: Theme) => ({
//     //
//   }),
//   { name: 'AccountAddresses' },
// )

export default function AccountAddresses(props: AccountAddressesProps) {
  const { addresses } = props
  // const classes = useStyles()

  return (
    <SectionContainer label='Shipping addresses' borderBottom>
      {addresses?.map((address) => (
        <AccountAddress key={address?.id} {...address} />
      ))}
    </SectionContainer>
  )
}
