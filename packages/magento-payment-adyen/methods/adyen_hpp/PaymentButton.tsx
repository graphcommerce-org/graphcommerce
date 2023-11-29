import { LinkOrButton } from '@graphcommerce/next-ui'
import { PaymentButtonProps } from '@graphcommerce/magento-cart-payment-method/Api/PaymentMethod'

export function PaymentButton(props: PaymentButtonProps) {
  const methods = ['googlepay', 'applepay']
  const isPlaceOrder = props.buttonProps?.id === 'place-order' ? true : false
  const title = methods.includes(props?.child) ? 'Use ' + props?.title + ' Checkout': props?.title
  const isDisabled = methods.includes(props?.child)
  return  (<LinkOrButton
          {...props.buttonProps}
          {...(isDisabled ? {disabled: isDisabled} : {})}
          >
          {props?.title && isPlaceOrder && (
            <>
              <em>{title}</em>
            </>
          )}

          {!isPlaceOrder && (
            <>Pay</>
          )}
    </LinkOrButton>)
}