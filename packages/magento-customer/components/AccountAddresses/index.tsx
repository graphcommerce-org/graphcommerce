import {
  Button,
  FullPageMessage,
  SectionContainer,
  MessageSnackbar,
  SvgImage,
  iconHome,
} from '@graphcommerce/next-ui'
import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Skeleton } from '@mui/material';
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import AccountAddress from '../AccountAddress'
import { AccountAddressesFragment } from './AccountAddresses.gql'

export type AccountAddressesProps = AccountAddressesFragment & { loading: boolean }

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      '& > div': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
    sectionContainer: {
      position: 'absolute',
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
  const { addresses, loading } = props
  const classes = useStyles()
  const router = useRouter()

  if (loading) {
    return (
      <SectionContainer labelLeft='Shipping addresses'>
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
    <>
      {((addresses && addresses.length === 0) || !addresses) && (
        <>
          <FullPageMessage
            title='You have no addresses saved yet'
            icon={<SvgImage src={iconHome} size={148} alt='home' />}
            button={
              <Link href='/account/addresses/add' passHref>
                <Button size='large' variant='contained' color='primary' text='bold'>
                  Add new address
                </Button>
              </Link>
            }
          />
        </>
      )}

      {addresses && addresses.length >= 1 && (
        <SectionContainer labelLeft='Shipping addresses'>
          <div className={classes.root}>
            {addresses?.map((address) => (
              <AccountAddress key={address?.id} {...address} />
            ))}
          </div>

          <Link href='/account/addresses/add' passHref>
            <Button className={classes.button} variant='contained' color='primary' text='bold'>
              Add new address
            </Button>
          </Link>

          <MessageSnackbar sticky open={router.query.confirm_delete !== undefined}>
            <>Address was deleted</>
          </MessageSnackbar>
        </SectionContainer>
      )}
    </>
  )
}
