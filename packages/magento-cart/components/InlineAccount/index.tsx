import { useQuery } from '@apollo/client'
import { SignUpFormInline } from '@graphcommerce/magento-customer'
import {
  CustomerTokenDocument,
  IsEmailAvailableDocument,
} from '@graphcommerce/magento-customer/hooks'
import Button from '@graphcommerce/next-ui/Button'
import FormRow from '@graphcommerce/next-ui/Form/FormRow'
import { UseStyles } from '@graphcommerce/next-ui/Styles'
import { Trans } from '@lingui/macro'
import { makeStyles, TextField, Theme, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useCartQuery } from '../../hooks/useCartQuery'
import { InlineAccountDocument } from './InlineAccount.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      borderRadius: 4,
      border: `1px solid ${theme.palette.divider}`,
      padding: theme.spacings.md,
    },
    innerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 32,
      [theme.breakpoints.up('sm')]: {
        alignItems: 'flex-end',
        flexDirection: 'unset',
        gap: 0,
      },
    },
    form: {
      marginTop: theme.spacings.sm,
    },
    button: {
      minWidth: 160,
    },
    title: {
      paddingBottom: 8,
    },
  }),
  { name: 'InlineAccount' },
)

export type InlineAccountProps = {
  title?: React.ReactNode
  description?: React.ReactNode
  accountHref: string
} & UseStyles<typeof useStyles>

export default function InlineAccount(props: InlineAccountProps) {
  const { title, description, accountHref } = props
  const classes = useStyles(props)

  const [toggled, setToggled] = useState<boolean>(false)

  const { loading, data } = useCartQuery(InlineAccountDocument)
  const cart = data?.cart

  const { data: customerTokenData } = useQuery(CustomerTokenDocument)
  const { data: isEmailAvailableData } = useQuery(IsEmailAvailableDocument, {
    variables: { email: cart?.email ?? '' },
  })

  const { firstname, lastname } = cart?.shipping_addresses?.[0] ?? {}
  const signedIn = Boolean(
    customerTokenData?.customerToken && customerTokenData?.customerToken.valid,
  )
  const canSignUp = isEmailAvailableData?.isEmailAvailable?.is_email_available === true

  if (!canSignUp) return null

  return (
    <div>
      <div key='signupaccount' className={classes.root}>
        {!signedIn && canSignUp && (
          <>
            <div className={classes.innerContainer}>
              <div>
                <Typography variant='h4' className={classes.title}>
                  {title ?? <Trans>No account yet?</Trans>}
                </Typography>
                {description ?? <Trans>You can track your order status and much more!</Trans>}
              </div>
              <div>
                {!toggled && (
                  <Button
                    variant='pill'
                    color='secondary'
                    loading={loading}
                    onClick={() => setToggled(!toggled)}
                    className={classes.button}
                  >
                    <Trans>Create an account</Trans>
                  </Button>
                )}
              </div>
            </div>
            {cart?.email && toggled && (
              <div className={classes.form}>
                <FormRow>
                  <TextField
                    variant='outlined'
                    type='email'
                    label='Email'
                    value={cart?.email}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </FormRow>
                <SignUpFormInline
                  firstname={firstname ?? ''}
                  lastname={lastname}
                  email={cart?.email}
                  onSubmitted={() => setToggled(false)}
                />
              </div>
            )}
          </>
        )}

        {signedIn && (
          <div className={classes.innerContainer}>
            <div>
              <Typography variant='h4' className={classes.title}>
                {title ?? <Trans>Have an account?</Trans>}
              </Typography>
              {description ?? <Trans>You can find your order history in your account!</Trans>}
            </div>
            <div>
              <Button
                variant='pill'
                color='secondary'
                href={accountHref}
                className={classes.button}
              >
                <Trans>Account</Trans>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
