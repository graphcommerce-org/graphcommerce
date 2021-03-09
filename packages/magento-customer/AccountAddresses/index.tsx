import { CountryRegionsQuery } from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import React from 'react'
import AccountAddress from '../AccountAddress'
import { AccountAddressesFragment } from './AccountAddresses.gql'

export type AccountAddressesProps = AccountAddressesFragment & CountryRegionsQuery

// const useStyles = makeStyles(
//   (theme: Theme) => ({
//     //
//   }),
//   { name: 'AccountAddresses' },
// )

export default function AccountAddresses(props: AccountAddressesProps) {
  const { addresses, countries } = props
  // const classes = useStyles()

  return (
    <SectionContainer label='Shipping addresses' borderBottom>
      {addresses?.map((address) => (
        <AccountAddress key={address?.id} {...address} countries={countries} />
      ))}
    </SectionContainer>
  )
}
