import { useCartQuery } from '@graphcommerce/magento-cart'
import { useCustomerSession } from '@graphcommerce/magento-customer'
import { extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, SxProps, Theme, Typography } from '@mui/material'
import { CustomerNewsletterToggle } from '../CustomerNewsletterToggle/CustomerNewsletterToggle'
import { GuestNewsletterToggle } from '../GuestNewsletterToggle/GuestNewsletterToggle'
import { GetCartEmailDocument } from './GetCartEmail.gql'

type SignupNewsletterProps = { sx?: SxProps<Theme> }

const name = 'SignupNewsletter' as const

type OwnerState = { loggedIn: boolean }
const parts = ['signup', 'text', 'signupForm'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function SignupNewsletter(props: SignupNewsletterProps) {
  const { sx = [] } = props
  const { data: cartData } = useCartQuery(GetCartEmailDocument, { allowUrl: true })
  const { loggedIn } = useCustomerSession()

  const classes = withState({ loggedIn })

  return (
    <Box
      className={classes.signup}
      sx={[
        (theme) => ({
          background: theme.palette.background.default,
          display: 'grid',
          alignItems: 'center',
          gridAutoFlow: 'column',
          columnGap: theme.spacings.xxs,
          padding: theme.spacings.sm,
          typgraphy: 'body1',
          marginTop: theme.spacings.sm,
          borderRadius: '4px',
          gridTemplateColumns: '1fr',
          gridTemplateAreas: `"a" "b"`,
          justifyItems: 'start',
          [theme.breakpoints.up('sm')]: {
            gridTemplateAreas: `"a b c"`,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography variant='subtitle1' className={classes.text}>
        <Trans id='Sign up for our newsletter and stay updated' />
      </Typography>
      <Box
        className={classes.signupForm}
        sx={(theme) => ({
          display: 'flex',
          gap: theme.spacings.sm,
          justifySelf: 'start',
          alignItems: 'center',
          [theme.breakpoints.up('sm')]: { justifySelf: 'end' },
        })}
      >
        {loggedIn ? (
          <CustomerNewsletterToggle color='primary' />
        ) : (
          <GuestNewsletterToggle color='primary' />
        )}
        {cartData?.cart?.email}
      </Box>
    </Box>
  )
}
