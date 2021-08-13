import { makeStyles, Theme } from '@material-ui/core'
import { ApolloCartErrorAlert } from '@reachdigital/magento-cart'
import { Button, ButtonProps, FormRow } from '@reachdigital/next-ui'
import { ComposedSubmit } from '@reachdigital/react-hook-form'
import React from 'react'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      padding: `${theme.spacings.lg} ${theme.spacings.sm}`,
      width: 'auto',
      margin: '0 auto',
      [theme.breakpoints.up('md')]: {
        padding: `${theme.spacings.md} ${theme.spacings.xxl}`,
      },
    },
  }),
  { name: 'PaymentMethodButton' },
)

export type PaymentMethodButtonProps = ButtonProps

export default function PaymentMethodButton(props: PaymentMethodButtonProps) {
  const { children } = props
  const { selectedMethod, selectedModule } = usePaymentMethodContext()
  const classes = useStyles()

  const PaymentButton = selectedModule?.PaymentButton

  return (
    <ComposedSubmit
      render={({ submit, buttonState, error }) => (
        <>
          <FormRow classes={{ root: classes.root }}>
            {!PaymentButton || !selectedMethod?.code ? (
              <Button
                {...props}
                onClick={submit}
                loading={buttonState.isSubmitting || (buttonState.isSubmitSuccessful && !error)}
              >
                {children}
                {selectedMethod?.title && (
                  <>
                    {' '}
                    (<em>{selectedMethod?.title}</em>)
                  </>
                )}
              </Button>
            ) : (
              <PaymentButton
                {...selectedMethod}
                buttonProps={{
                  ...props,
                  onClick: submit,
                  loading: buttonState.isSubmitting || (buttonState.isSubmitSuccessful && !error),
                }}
              />
            )}
          </FormRow>
          <ApolloCartErrorAlert key='error' error={buttonState.isSubmitting ? undefined : error} />
        </>
      )}
    />
  )
}
