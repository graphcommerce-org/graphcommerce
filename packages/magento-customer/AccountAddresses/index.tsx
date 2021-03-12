import { Button, Link, makeStyles, Theme } from '@material-ui/core'
import { CountryRegionsQuery } from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import React from 'react'
import AccountAddress from '../AccountAddress'
import { AccountAddressesFragment } from './AccountAddresses.gql'

export type AccountAddressesProps = AccountAddressesFragment & CountryRegionsQuery

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      '& > div': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
    button: {
      display: 'block',
      margin: `${theme.spacings.md} auto`,
      padding: `${theme.spacings.xxs} ${theme.spacings.md}`,
    },
  }),
  { name: 'AccountAddresses' },
)

export default function AccountAddresses(props: AccountAddressesProps) {
  const { addresses, countries } = props
  const classes = useStyles()

  return (
    <SectionContainer label='Shipping addresses'>
      <div className={classes.root}>
        {addresses?.map((address) => (
          <AccountAddress key={address?.id} {...address} countries={countries} />
        ))}
      </div>

      <Link href='/account/addresses/add'>
        <Button className={classes.button} variant='contained' color='primary'>
          Add new address
        </Button>
      </Link>
    </SectionContainer>
  )
}
