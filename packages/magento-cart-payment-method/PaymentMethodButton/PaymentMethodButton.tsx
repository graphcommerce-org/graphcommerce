import { ApolloCartErrorAlert } from '@reachdigital/magento-cart'
import { Button, ButtonProps, FormRow } from '@reachdigital/next-ui'
import { ComposedSubmit, ComposedSubmitRenderComponentProps } from '@reachdigital/react-hook-form'
import React from 'react'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

export type PaymentMethodButtonProps = ButtonProps & { display?: 'inline' | 'block' }

export function PaymentMethodButtonRenderer(
  props: { buttonProps: ButtonProps } & ComposedSubmitRenderComponentProps,
) {
  const { buttonProps, error, buttonState, submit } = props
  const { selectedMethod, selectedModule } = usePaymentMethodContext()

  const PaymentButton = selectedModule?.PaymentButton

  return (
    <>
      {!PaymentButton || !selectedMethod?.code ? (
        <Button
          {...buttonProps}
          onClick={submit}
          loading={buttonState.isSubmitting || (buttonState.isSubmitSuccessful && !error)}
        >
          {buttonProps.children}
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
            ...buttonProps,
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
            <FormRow>{button}</FormRow>
            <ApolloCartErrorAlert
              key='error'
              error={buttonState.isSubmitting ? undefined : error}
            />
          </>
        )
      }}
    />
  )
}
