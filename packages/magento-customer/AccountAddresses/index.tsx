import { Button, makeStyles, Theme } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { CountryRegionsQuery } from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import MessageSnackbarLoader from '@reachdigital/next-ui/Snackbar/MessageSnackbarLoader'
import { useRouter } from 'next/router'
import React from 'react'
import AccountAddress from '../AccountAddress'
import { AccountAddressesFragment } from './AccountAddresses.gql'

export type AccountAddressesProps = AccountAddressesFragment &
  CountryRegionsQuery & { loading: boolean }

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
    link: {
      textDecoration: 'none',
    },
  }),
  { name: 'AccountAddresses' },
)

export default function AccountAddresses(props: AccountAddressesProps) {
  const { addresses, countries, loading } = props
  const classes = useStyles()
  const router = useRouter()

  if (loading) {
    return (
      <SectionContainer label='Shipping addresses'>
        <div className={classes.root}>
          <Skeleton height={128} />
          <Skeleton height={128} />
          <Skeleton height={128} />
        </div>
        <Button className={classes.button} variant='contained' color='primary' disabled>
          Add new address
        </Button>
      </SectionContainer>
    )
  }

  return (
    <SectionContainer label='Shipping addresses'>
      <div className={classes.root}>
        {addresses?.map((address) => (
          <AccountAddress key={address?.id} {...address} countries={countries} />
        ))}
      </div>

      <MessageSnackbarLoader
        open={router.query.confirm_delete !== undefined}
        message={<>Address was deleted</>}
      />

      <PageLink href='/account/addresses/add'>
        <a className={classes.link}>
          <Button className={classes.button} variant='contained' color='primary'>
            Add new address
          </Button>
        </a>
      </PageLink>
    </SectionContainer>
  )
}
