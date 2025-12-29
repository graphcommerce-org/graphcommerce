import {
  extendableComponent,
  filterNonNullableKeys,
  FullPageMessage,
  iconHome,
  IconSvg,
  SectionContainer,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box, Button, Skeleton } from '@mui/material'
import { AccountAddress } from '../AccountAddress/AccountAddress'
import type { AccountAddressesFragment } from './AccountAddresses.gql'

export type AccountAddressesProps = AccountAddressesFragment & {
  loading: boolean
  sx?: SxProps<Theme>
}

const name = 'AccountAddresses'
const parts = ['root', 'addresses', 'button', 'link'] as const
const { classes } = extendableComponent(name, parts)

export function AccountAddresses(props: AccountAddressesProps) {
  const { addresses: addressesIncoming, loading, sx = [] } = props

  const addresses = filterNonNullableKeys(addressesIncoming)

  if (loading) {
    return (
      <SectionContainer
        labelLeft={<Trans>Shipping addresses</Trans>}
        sx={sx}
        className={classes.root}
      >
        <Box
          className={classes.addresses}
          sx={(theme) => ({
            '& > div': { borderBottom: `1px solid ${theme.vars.palette.divider}` },
          })}
        >
          <Skeleton height={128} />
          <Skeleton height={128} />
          <Skeleton height={128} />
        </Box>
        <Button
          className={classes.button}
          variant='pill'
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
      {addresses.length === 0 && (
        <FullPageMessage
          title={<Trans>You have no addresses saved yet</Trans>}
          icon={<IconSvg src={iconHome} size='xxl' />}
          button={
            <Button href='/account/addresses/add' size='large' variant='pill' color='primary'>
              <Trans>Add new address</Trans>
            </Button>
          }
        />
      )}

      {addresses.length >= 1 && (
        <SectionContainer labelLeft={<Trans>Shipping addresses</Trans>}>
          <Box
            className={classes.addresses}
            sx={(theme) => ({
              '& > div': { borderBottom: `1px solid ${theme.vars.palette.divider}` },
            })}
          >
            {addresses.map((address) => (
              <AccountAddress key={address.id} {...address} />
            ))}
          </Box>

          <Button
            href='/account/addresses/add'
            className={classes.button}
            variant='pill'
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
        </SectionContainer>
      )}
    </>
  )
}
