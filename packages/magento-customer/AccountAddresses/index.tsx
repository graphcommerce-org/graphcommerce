import { makeStyles, Theme } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { CountryRegionsQuery } from '@reachdigital/magento-store'
import Button from '@reachdigital/next-ui/Button'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import MessageSnackbar from '@reachdigital/next-ui/Snackbar/MessageSnackbar'
import PageLink from 'next/link'
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
      maxWidth: 'max-content',
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
        <Button className={classes.button} variant='contained' color='primary' text='bold' disabled>
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

      <MessageSnackbar open={router.query.confirm_delete !== undefined}>
        <>Address was deleted</>
      </MessageSnackbar>

      <Button
        className={classes.button}
        variant='contained'
        color='primary'
        text='bold'
        href='/account/addresses/add'
      >
        Add new address
      </Button>
    </SectionContainer>
  )
}
