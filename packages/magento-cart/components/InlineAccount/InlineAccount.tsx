import { useQuery } from '@graphcommerce/graphql'
import {
  SignUpFormInline,
  IsEmailAvailableDocument,
  useCustomerSession,
} from '@graphcommerce/magento-customer'
import { Button, FormRow, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SxProps, Theme } from '@mui/material/styles'
import React, { useState } from 'react'
import { useCartQuery } from '../../hooks/useCartQuery'
import { InlineAccountDocument } from './InlineAccount.gql'

export type InlineAccountProps = {
  title?: React.ReactNode
  description?: React.ReactNode
  accountHref: string
  sx?: SxProps<Theme>
}

const name = 'InlineAccount' as const
const parts = ['root', 'innerContainer', 'form', 'button', 'title'] as const
const { classes } = extendableComponent(name, parts)

export function InlineAccount(props: InlineAccountProps) {
  const { title, description, accountHref, sx = [] } = props

  const [toggled, setToggled] = useState<boolean>(false)

  const { loading, data } = useCartQuery(InlineAccountDocument)
  const cart = data?.cart

  const { loggedIn } = useCustomerSession()
  const { data: isEmailAvailableData } = useQuery(IsEmailAvailableDocument, {
    variables: { email: cart?.email ?? '' },
  })

  const { firstname, lastname } = cart?.shipping_addresses?.[0] ?? {}
  const canSignUp = isEmailAvailableData?.isEmailAvailable?.is_email_available === true

  if (!canSignUp) return null

  return (
    <div>
      <Box
        className={classes.root}
        sx={[
          (theme) => ({
            borderRadius: '4px',
            border: `1px solid ${theme.palette.divider}`,
            padding: theme.spacings.md,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {!loggedIn && canSignUp && (
          <>
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
              </Box>
            )}
          </>
        )}

        {loggedIn && (
          <Box className={classes.innerContainer}>
            <div>
              <Typography variant='h4' className={classes.title}>
                {title ?? <Trans id='Have an account?' />}
              </Typography>
              {description ?? <Trans id='You can find your order history in your account!' />}
            </div>
            <div>
              <Button
                variant='pill'
                color='secondary'
                href={accountHref}
                className={classes.button}
              >
                <Trans id='Account' />
              </Button>
            </div>
          </Box>
        )}
      </Box>
    </div>
  )
}
