import { makeStyles, Theme } from '@material-ui/core'
import { CountryRegionsQuery } from '@reachdigital/magento-store/CountryRegions.gql'
import Button from '@reachdigital/next-ui/Button'
import FormActions from '@reachdigital/next-ui/Form/FormActions'
import PageLink from 'next/link'
import React from 'react'
import AddressMultiLine from '../AddressMultiLine'
import UpdateDefaultAddressForm from '../UpdateDefaultAddressForm'
import { AccountAddressFragment } from './AccountAddress.gql'

export type AccountAddressProps = AccountAddressFragment & CountryRegionsQuery

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacings.md,
      paddingBottom: theme.spacings.md,
      ...theme.typography.body2,
    },
    address: {
      '& > span': {
        display: 'block',
      },
    },
    switches: {
      paddingTop: theme.spacings.xxs,
    },
  }),
  { name: 'AccountAddress' },
)

export default function AccountAddress(props: AccountAddressProps) {
  const { id, countries } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.address}>
        <AddressMultiLine {...props} countries={countries} />

        <div className={classes.switches}>
          <UpdateDefaultAddressForm {...props} />
        </div>
      </div>
      <FormActions>
        <PageLink href={`/account/addresses/edit?addressId=${id}`} passHref>
          <Button variant='text' color='primary'>
            Edit
          </Button>
        </PageLink>
      </FormActions>
    </div>
  )
}
