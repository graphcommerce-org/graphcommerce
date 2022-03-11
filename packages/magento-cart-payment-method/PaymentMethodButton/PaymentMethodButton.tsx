import { ApolloCartErrorAlert } from '@graphcommerce/magento-cart'
import { LinkOrButton, LinkOrButtonProps } from '@graphcommerce/next-ui'
import { ComposedSubmit, ComposedSubmitRenderComponentProps } from '@graphcommerce/react-hook-form'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

export type PaymentMethodButtonProps = LinkOrButtonProps & { display?: 'inline' | 'block' }

function PaymentMethodButtonRenderer(
  props: { buttonProps: LinkOrButtonProps } & ComposedSubmitRenderComponentProps,
) {
  const { buttonProps, error, buttonState, submit } = props
  const { selectedMethod, selectedModule } = usePaymentMethodContext()

  const btnProps = { ...buttonProps, name: 'placeOrder' }

  const PaymentButton = selectedModule?.PaymentButton

  return (
    <>
      {!PaymentButton || !selectedMethod?.code ? (
        <LinkOrButton
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
        </LinkOrButton>
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

export function PaymentMethodButton(props: PaymentMethodButtonProps) {
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
            {button}
            <ApolloCartErrorAlert key='error' error={errorVal} />
          </>
        )
      }}
    />
  )
}
