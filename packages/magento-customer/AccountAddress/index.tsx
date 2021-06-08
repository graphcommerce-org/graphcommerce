import { Link, makeStyles, Theme } from '@material-ui/core'
import { CountryRegionsQuery } from '@reachdigital/magento-store/CountryRegions.gql'
import React from 'react'
import AddressMultiLine from '../AddressMultiLine'
import DeleteCustomerAddressForm from '../DeleteCustomerAddressForm'
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
    deleteAddress: {
      color: theme.palette.primary.contrastText,
      '&:hover': {
        textDecoration: 'none',
      },
    },
    actions: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      textAlign: 'right',
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
      <div className={classes.actions}>
        <Link color='primary' href={`/account/addresses/edit?addressId=${id}`}>
          Edit
        </Link>
        <DeleteCustomerAddressForm addressId={id ?? undefined} />
      </div>
    </div>
  )
}
