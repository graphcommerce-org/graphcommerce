import {
  FullPageMessage,
  SectionContainer,
  iconHome,
  SvgIcon,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Skeleton, Button, Box, Theme, SxProps } from '@mui/material'
import Link from 'next/link'
import AccountAddress from '../AccountAddress'
import { AccountAddressesFragment } from './AccountAddresses.gql'

export type AccountAddressesProps = AccountAddressesFragment & {
  loading: boolean
  sx?: SxProps<Theme>
}

const name = 'AccountAddresses' as const
const parts = ['root', 'addresses', 'button', 'link'] as const
const { classes } = extendableComponent(name, parts)

export default function AccountAddresses(props: AccountAddressesProps) {
  const { addresses, loading, sx = [] } = props

  if (loading) {
    return (
      <SectionContainer labelLeft='Shipping addresses' sx={sx} className={classes.root}>
        <Box
          className={classes.addresses}
          sx={(theme) => ({ '& > div': { borderBottom: `1px solid ${theme.palette.divider}` } })}
        >
          <Skeleton height={128} />
          <Skeleton height={128} />
          <Skeleton height={128} />
        </Box>
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          disabled
          size='large'
          sx={(theme) => ({
            display: 'block',
            maxWidth: 'max-content',
            margin: `${theme.spacings.md} auto`,
          })}
        >
          <Trans>Add new address</Trans>
        </Button>
      </SectionContainer>
    )
  }

  return (
    <>
      {((addresses && addresses.length === 0) || !addresses) && (
        <FullPageMessage
          title={<Trans>You have no addresses saved yet</Trans>}
          icon={<SvgIcon src={iconHome} size='xxl' />}
          button={
            <Link href='/account/addresses/add' passHref>
              <Button size='large' variant='contained' color='primary'>
                <Trans>Add new address</Trans>
              </Button>
            </Link>
          }
        />
      )}

      {addresses && addresses.length >= 1 && (
        <SectionContainer labelLeft='Shipping addresses'>
          <Box
            className={classes.addresses}
            sx={(theme) => ({ '& > div': { borderBottom: `1px solid ${theme.palette.divider}` } })}
          >
            {addresses?.map((address) => (
              <AccountAddress key={address?.id} {...address} />
            ))}
          </Box>

          <Link href='/account/addresses/add' passHref>
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              size='large'
              sx={(theme) => ({
                display: 'block',
                maxWidth: 'max-content',
                margin: `${theme.spacings.md} auto`,
              })}
            >
              <Trans>Add new address</Trans>
            </Button>
          </Link>
        </SectionContainer>
      )}
    </>
  )
}
