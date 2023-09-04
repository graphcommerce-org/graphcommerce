import { ApolloCartErrorSnackbar } from '@graphcommerce/magento-cart'
import { LinkOrButton, LinkOrButtonProps } from '@graphcommerce/next-ui'
import {
  ComposedSubmit,
  ComposedSubmitProps,
  ComposedSubmitRenderComponentProps,
} from '@graphcommerce/react-hook-form'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

export type PaymentMethodButtonProps = LinkOrButtonProps & { display?: 'inline' | 'block' } & Pick<
    ComposedSubmitProps,
    'onSubmitSuccessful'
  >

function PaymentMethodButtonRenderer(
  props: { buttonProps: LinkOrButtonProps } & ComposedSubmitRenderComponentProps,
) {
  const { buttonProps, error, buttonState, submit } = props
  const { selectedMethod, selectedModule } = usePaymentMethodContext(true) ?? {}

  const PaymentButton = selectedModule?.PaymentButton

  return (
    <>
      {!PaymentButton || !selectedMethod?.code ? (
        <LinkOrButton
          {...buttonProps}
          onClick={submit}
          loading={buttonState.isSubmitting || (buttonState.isSubmitSuccessful && !error)}
          button={{
            sx: [
              (theme) => ({
                [theme.breakpoints.down('md')]: {
                  fontSize: theme.typography.body2.fontSize,
                },
              }),
            ],
            ...buttonProps?.button,
          }}
        >
          {buttonProps.children}
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
            ...buttonProps,
            onClick: submit,
            loading: buttonState.isSubmitting || (buttonState.isSubmitSuccessful && !error),
          }}
        />
      )}
    </>
  )
}

export function PaymentMethodButton(props: PaymentMethodButtonProps) {
  const { display, onSubmitSuccessful, ...buttonProps } = props

  return (
    <ComposedSubmit
      onSubmitSuccessful={onSubmitSuccessful}
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
            <ApolloCartErrorSnackbar key='error' error={errorVal} />
          </>
        )
      }}
    />
  )
}
