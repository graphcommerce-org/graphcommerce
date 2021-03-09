import { makeStyles, Theme } from '@material-ui/core'
import { CountryRegionsQuery } from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import React from 'react'
import AccountAddress from '../AccountAddress'
import { AccountAddressesFragment } from './AccountAddresses.gql'

export type AccountAddressesProps = AccountAddressesFragment & CountryRegionsQuery

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      '& > div:not(:last-child)': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
  }),
  { name: 'AccountAddresses' },
)

export default function AccountAddresses(props: AccountAddressesProps) {
  const { addresses, countries } = props
  const classes = useStyles()

  return (
    <SectionContainer label='Shipping addresses' borderBottom>
      <div className={classes.root}>
        {addresses?.map((address) => (
          <AccountAddress key={address?.id} {...address} countries={countries} />
        ))}
      </div>
    </SectionContainer>
  )
}
