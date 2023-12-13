import { useCurrentCartId } from '@graphcommerce/magento-cart'
import { GetCartTotalsDocument } from '@graphcommerce/magento-cart/components/CartTotals/GetCartTotals.gql'
import { useCartQuery } from '@graphcommerce/magento-cart/hooks'
import { PaymentOptionsProps } from '@graphcommerce/magento-cart-payment-method'
import { HppOptions } from '../../components/AdyenPaymentOptionsAndPlaceOrder/AdyenPaymentOptionsAndPlaceOrder'
import ApplyPay from './ApplePay'
import GooglePay from './GooglePay'

/** It sets the selected payment method on the cart. */
export function PaymentMethodOptions(props: PaymentOptionsProps) {
  const { code, step, child: brandCode, Container } = props

  const { currentCartId } = useCurrentCartId()
  const { data } = useCartQuery(GetCartTotalsDocument, { allowUrl: true })

  if (brandCode === 'applepay')
    return (
      <Container>
        <ApplyPay
          brandCode={brandCode}
          code={code}
          step={step}
          cartId={currentCartId}
          cart={data?.cart}
        />
      </Container>
    )

  if (brandCode === 'googlepay')
    return (
      <Container>
        <GooglePay
          brandCode={brandCode}
          code={code}
          step={step}
          cartId={currentCartId}
          cart={data?.cart}
        />
      </Container>
    )

  return <HppOptions {...props} />
}
