import { PaymentButtonProps } from '@graphcommerce/magento-cart-payment-method/Api/PaymentMethod'
import { LinkOrButton } from '@graphcommerce/next-ui'

export function PaymentButton(props: PaymentButtonProps) {
  const { buttonProps, title } = props
  const isPlaceOrder = buttonProps?.id === 'place-order'
  const isValid = true

  return (
    <LinkOrButton {...buttonProps} {...(!isValid ? { disabled: true } : {})}>
      {isPlaceOrder && props?.title && (
        <>
          {buttonProps.children} (<em>{title}</em>)
        </>
      )}

      {!isPlaceOrder && <>Pay</>}
    </LinkOrButton>
  )
}
