import { ApolloCartErrorAlert } from '@reachdigital/magento-cart'
import Button, { ButtonProps } from '@reachdigital/next-ui/Button'
import FormRow from '@reachdigital/next-ui/Form/FormRow'
import { ComposedSubmit } from '@reachdigital/react-hook-form'
import React from 'react'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

export type PaymentMethodButtonProps = ButtonProps

export default function PaymentMethodButton(props: PaymentMethodButtonProps) {
  const { children } = props
  const { selectedMethod, selectedModule } = usePaymentMethodContext()

  const PaymentButton = selectedModule?.PaymentButton

  return (
    <ComposedSubmit
      render={({ submit, buttonState, error }) => (
        <>
          <FormRow>
            {!PaymentButton || !selectedMethod?.code ? (
              <Button
                {...props}
                onClick={submit}
                loading={buttonState.isSubmitting || buttonState.isSubmitSuccessful}
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
                  loading: buttonState.isSubmitting || buttonState.isSubmitSuccessful,
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
