import {
  FullPageMessage,
  SectionContainer,
  iconHome,
  IconSvg,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Skeleton, Button, Box, Theme, SxProps } from '@mui/material'
import Link from 'next/link'
import { AccountAddress } from '../AccountAddress/AccountAddress'
import { AccountAddressesFragment } from './AccountAddresses.gql'

export type AccountAddressesProps = AccountAddressesFragment & {
  loading: boolean
  sx?: SxProps<Theme>
}

const name = 'AccountAddresses' as const
const parts = ['root', 'addresses', 'button', 'link'] as const
const { classes } = extendableComponent(name, parts)

export function AccountAddresses(props: AccountAddressesProps) {
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
          <Trans id='Add new address' />
        </Button>
      </SectionContainer>
    )
  }

  return (
    <>
      {((addresses && addresses.length === 0) || !addresses) && (
        <FullPageMessage
          title={<Trans id='You have no addresses saved yet' />}
          icon={<IconSvg src={iconHome} size='xxl' />}
          button={
            <Link href='/account/addresses/add' passHref legacyBehavior>
              <Button size='large' variant='pill' color='primary'>
                <Trans id='Add new address' />
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

          <Link href='/account/addresses/add' passHref legacyBehavior>
            <Button
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
              <Trans id='Add new address' />
            </Button>
          </Link>
        </SectionContainer>
      )}
    </>
  )
}
