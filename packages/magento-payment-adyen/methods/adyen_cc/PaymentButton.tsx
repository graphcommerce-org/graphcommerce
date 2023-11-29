import { LinkOrButton } from '@graphcommerce/next-ui'
import { PaymentButtonProps } from '@graphcommerce/magento-cart-payment-method/Api/PaymentMethod'

export function PaymentButton(props: PaymentButtonProps) {
  const isPlaceOrder = props.buttonProps?.id === 'place-order' ? true : false
  const isValid = true

  return  (<LinkOrButton
          {...props.buttonProps}
          {...(!isValid ? {disabled: true} : {})}
          >
          {isPlaceOrder && props?.title && (
            <>
              {props.buttonProps.children}
              {' '}
              (<em>{props?.title}</em>)
            </>
          )}

          {!isPlaceOrder && (
            <>Pay</>
          )}
    </LinkOrButton>)
}