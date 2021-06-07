import { useQuery } from '@apollo/client'
import { makeStyles, TextField, Theme, Typography } from '@material-ui/core'
import Button from '@reachdigital/next-ui/Button'
import FormRow from '@reachdigital/next-ui/Form/FormRow'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import { AnimatePresence, m } from 'framer-motion'
import React, { useState } from 'react'
import SignUpFormInline from '../SignUpFormInline'
import { NoAccountYetDocument } from './NoAccountYet.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      borderRadius: 4,
      border: `1px solid ${theme.palette.divider}`,
      padding: theme.spacings.sm,
    },
    innerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    text: {
      marginBottom: theme.spacings.sm,
    },
    title: {
      paddingBottom: 8,
    },
  }),
  { name: 'NoAccountYet' },
)

type NoAccountYetProps = {
  cartId: string
  title?: string
  description?: string
} & UseStyles<typeof useStyles>

export default function NoAccountYet(props: NoAccountYetProps) {
  const { cartId, title, description } = props
  const classes = useStyles(props)

  const [toggled, setToggled] = useState<boolean>(false)

  // todo: only show this component when user is not logged in already
  // todo: error form handling
  // todo: why is my email info@reachdigital.nl when I entered test@testje.nl?

  const { loading, data } = useQuery(NoAccountYetDocument, {
    fetchPolicy: 'cache-and-network',
    variables: {
      cartId: cartId ?? '',
    },
  })
  const cart = data?.cart
  const { firstname, lastname } = cart?.shipping_addresses?.[0] ?? {}

  console.log(cart)

  return (
    <AnimatePresence>
      <m.div key='no-account-yet' className={classes.root}>
        <div className={classes.innerContainer}>
          <div className={classes.text}>
            <Typography variant='h6' className={classes.title}>
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
              >
                Create an account
              </Button>
            )}
          </div>
        </div>
        {cart?.email && toggled && (
          <m.div>
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
            <SignUpFormInline firstname={firstname} lastname={lastname} email={cart?.email} />
          </m.div>
        )}
      </m.div>
    </AnimatePresence>
  )
}
