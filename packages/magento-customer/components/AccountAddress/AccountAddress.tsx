import { extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Link, SxProps, Theme, Typography } from '@mui/material'
import { AddressMultiLine } from '../AddressMultiLine/AddressMultiLine'
import { DeleteCustomerAddressForm } from '../DeleteCustomerAddressForm/DeleteCustomerAddressForm'
import { UpdateDefaultAddressForm } from '../UpdateDefaultAddressForm/UpdateDefaultAddressForm'
import { AccountAddressFragment } from './AccountAddress.gql'

export type AccountAddressProps = AccountAddressFragment & { sx?: SxProps<Theme> }

const name = 'AccountAddress'
const parts = ['root', 'address', 'switches', 'actions'] as const
const { classes } = extendableComponent(name, parts)

export function AccountAddress(props: AccountAddressProps) {
  const { id, sx = [], ...addressProps } = props

  return (
    <Box
      className={classes.root}
      sx={[
        (theme) => ({
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: theme.spacings.md,
          paddingBottom: theme.spacings.md,
          typography: 'body2',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box className={classes.address} sx={{ '& > span': { display: 'block' } }}>
        <AddressMultiLine id={id} {...addressProps} />
        <Typography variant='body1' component='div'>{addressProps.telephone}</Typography>
        <Box className={classes.switches} sx={(theme) => ({ paddingTop: theme.spacings.xxs })}>
          <UpdateDefaultAddressForm id={id} {...addressProps} />
        </Box>
      </Box>
      <Box
        className={classes.actions}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          textAlign: 'right',
        }}
      >
        <Link href={`/account/addresses/edit?addressId=${id}`} color='primary' underline='hover'>
          <Trans id='Edit' />
        </Link>
        <DeleteCustomerAddressForm addressId={id ?? undefined} />
      </Box>
    </Box>
  )
}
