import {
  SignUpFormInline,
  IsEmailAvailableDocument,
  useCustomerSession,
  useGuestQuery,
  useCustomerAccountCanSignIn,
} from '@graphcommerce/magento-customer'
import { Button, FormRow, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, SxProps, TextField, Theme, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useCartQuery } from '../../hooks/useCartQuery'
import { InlineAccountDocument } from './InlineAccount.gql'

export type InlineAccountProps = {
  title?: React.ReactNode
  description?: React.ReactNode
  /**
   * @deprecated This is not used anymore.
   */
  accountHref?: string
  sx?: SxProps<Theme>
}

const name = 'InlineAccount'
const parts = ['root', 'innerContainer', 'form', 'button', 'title'] as const
const { classes } = extendableComponent(name, parts)

export function InlineAccount(props: InlineAccountProps) {
  const { title, description, sx = [] } = props

  const canLogin = useCustomerAccountCanSignIn()

  const [toggled, setToggled] = useState<boolean>(false)

  const { loading, data } = useCartQuery(InlineAccountDocument)
  const cart = data?.cart

  const { loggedIn } = useCustomerSession()
  const { data: isEmailAvailableData } = useGuestQuery(IsEmailAvailableDocument, {
    variables: { email: cart?.email ?? '' },
    skip: !cart?.email,
  })

  const { firstname, lastname } = cart?.shipping_addresses?.[0] ?? {}
  const canSignUp = isEmailAvailableData?.isEmailAvailable?.is_email_available === true

  if (loggedIn || !canSignUp || !canLogin) return null

  return (
    <div>
      <Box
        className={classes.root}
        sx={[
          (theme) => ({
            borderRadius: '4px',
            border: `1px solid ${theme.vars.palette.divider}`,
            padding: theme.spacings.md,
            marginTop: theme.spacings.sm,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Box
          className={classes.innerContainer}
          sx={(theme) => ({
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: theme.spacings.md,
            [theme.breakpoints.up('sm')]: {
              alignItems: 'flex-end',
              flexDirection: 'unset',
              gap: 0,
            },
          })}
        >
          <div>
            <Typography variant='h4' className={classes.title} sx={{ paddingBottom: '8px' }}>
              {title ?? <Trans id='No account yet?' />}
            </Typography>
            {description ?? <Trans id='You can track your order status and much more!' />}
          </div>
          <div>
            {!toggled && (
              <Button
                variant='pill'
                color='secondary'
                loading={loading}
                onClick={() => setToggled(!toggled)}
                className={classes.button}
                sx={{ minWidth: 160 }}
              >
                <Trans id='Create an account' />
              </Button>
            )}
          </div>
        </Box>
        {cart?.email && toggled && (
          <Box className={classes.form} sx={(theme) => ({ marginTop: theme.spacings.sm })}>
            <FormRow>
              <TextField
                variant='outlined'
                label={<Trans id='Email address' />}
                value={cart?.email}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </FormRow>
            <SignUpFormInline
              firstname={firstname ?? ''}
              lastname={lastname}
              email={cart?.email}
              onSubmitted={() => setToggled(false)}
            />
          </Box>
        )}
      </Box>
    </div>
  )
}
