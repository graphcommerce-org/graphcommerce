import { useQuery } from '@apollo/client'
import { SignUpFormInline } from '@graphcommerce/magento-customer'
import {
  CustomerTokenDocument,
  IsEmailAvailableDocument,
} from '@graphcommerce/magento-customer/hooks'
import Button from '@graphcommerce/next-ui/Button'
import FormRow from '@graphcommerce/next-ui/Form/FormRow'
import { UseStyles } from '@graphcommerce/next-ui/Styles'
import { TextField, Theme, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
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
    variables: {
      email: cart?.email ?? '',
    },
  })

  const { firstname, lastname } = cart?.shipping_addresses?.[0] ?? {}
  const signedIn = Boolean(
    customerTokenData?.customerToken && customerTokenData?.customerToken.valid,
  )
  const canSignUp = isEmailAvailableData?.isEmailAvailable?.is_email_available === true

  if (!canSignUp) return <></>

  return (
    <div>
      <div key='signupaccount' className={classes.root}>
        {!signedIn && canSignUp && (
          <>
            <div className={classes.innerContainer}>
              <div>
                <Typography variant='h4' className={classes.title}>
                  {title ?? 'No account yet?'}
                </Typography>
                {description ?? 'You can track your order status and much more!'}
              </div>
              <div>
                {!toggled && (
                  <Button
                    variant='pill'
                    color='secondary'
                    text='bold'
                    loading={loading}
                    onClick={() => setToggled(!toggled)}
                    className={classes.button}
                  >
                    Create an account
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
                {title ?? 'Have an account?'}
              </Typography>
              {description ?? 'You can find your order history in your account!'}
            </div>
            <div>
              <Button
                variant='pill'
                color='secondary'
                text='bold'
                href={accountHref}
                className={classes.button}
              >
                My account
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
