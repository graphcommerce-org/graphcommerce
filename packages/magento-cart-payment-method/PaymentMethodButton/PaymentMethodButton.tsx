import { ApolloCartErrorAlert, ApolloCartErrorFullPage } from '@graphcommerce/magento-cart'
import { ApolloErrorFullPage, Button, ButtonProps, FormRow } from '@graphcommerce/next-ui'
import { ComposedSubmit, ComposedSubmitRenderComponentProps } from '@graphcommerce/react-hook-form'
import { Dialog } from '@material-ui/core'
import React from 'react'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

export type PaymentMethodButtonProps = ButtonProps & { display?: 'inline' | 'block' }

export function PaymentMethodButtonRenderer(
  props: { buttonProps: ButtonProps } & ComposedSubmitRenderComponentProps,
) {
  const { buttonProps, error, buttonState, submit } = props
  const { selectedMethod, selectedModule } = usePaymentMethodContext()

  const btnProps = { ...buttonProps, name: 'placeOrder' }

  const PaymentButton = selectedModule?.PaymentButton

  return (
    <>
      {!PaymentButton || !selectedMethod?.code ? (
        <Button
          {...btnProps}
          onClick={submit}
          loading={buttonState.isSubmitting || (buttonState.isSubmitSuccessful && !error)}
        >
          {btnProps.children}
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
            ...btnProps,
            onClick: submit,
            loading: buttonState.isSubmitting || (buttonState.isSubmitSuccessful && !error),
          }}
        />
      )}
    </>
  )
}

export default function PaymentMethodButton(props: PaymentMethodButtonProps) {
  const { display, ...buttonProps } = props

  return (
    <ComposedSubmit
      render={({ submit, buttonState, error }) => {
        const errorVal = buttonState.isSubmitting ? undefined : error
        const button = (
          <PaymentMethodButtonRenderer
            buttonProps={buttonProps}
            submit={submit}
            buttonState={buttonState}
            error={error}
          />
        )
        return display === 'inline' ? (
          button
        ) : (
          <>
            <>{button}</>
            <ApolloCartErrorAlert key='error' error={errorVal} />
          </>
        )
      }}
    />
  )
}
