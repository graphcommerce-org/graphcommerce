import { useQuery } from '@graphcommerce/graphql'
import { Trans } from '@graphcommerce/lingui-next'
import { useCartQuery } from '@graphcommerce/magento-cart'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import { extendableComponent } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme, Typography } from '@mui/material'
import { CustomerNewsletterToggle } from '../CustomerNewsletterToggle/CustomerNewsletterToggle'
import { GuestNewsletterToggle } from '../GuestNewsletterToggle/GuestNewsletterToggle'
import { GetCartEmailDocument } from './GetCartEmail.gql'

type SignupNewsletterProps = { sx?: SxProps<Theme> }

const name = 'SignupNewsletter' as const

type OwnerState = { isCustomer: boolean }
const parts = ['signup', 'text', 'signupForm'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function SignupNewsletter(props: SignupNewsletterProps) {
  const { sx = [] } = props
  const { data: cartData } = useCartQuery(GetCartEmailDocument, { allowUrl: true })
  const { data: customerTokenData } = useQuery(CustomerTokenDocument)
  const isCustomer = Boolean(customerTokenData?.customerToken)

  const classes = withState({ isCustomer })

  return (
    <Box
      className={classes.signup}
      sx={[
        (theme) => ({
          background: theme.palette.background.paper,
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
            gridTemplateColumns: '2fr 1fr',
          },

          '&.isCustomer': {
            background: theme.palette.background.image,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography variant='subtitle1' className={classes.text}>
        <Trans>Sign up for our newsletter and stay updated</Trans>
      </Typography>
      <Box
        className={classes.signupForm}
        sx={(theme) => ({
          display: 'flex',
          gap: 8,
          justifySelf: 'start',
          alignItems: 'center',
          [theme.breakpoints.up('sm')]: { justifySelf: 'end' },
        })}
      >
        {isCustomer ? (
          <CustomerNewsletterToggle color='primary' />
        ) : (
          <GuestNewsletterToggle color='primary' />
        )}
        {cartData?.cart?.email}
      </Box>
    </Box>
  )
}
