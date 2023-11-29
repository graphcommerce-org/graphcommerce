import { Trans } from '@lingui/react'
import { ErrorSnackbar } from '@graphcommerce/next-ui'
import { PaymentOptionsProps } from '@graphcommerce/magento-cart-payment-method'
import { GetCartTotalsDocument } from '@graphcommerce/magento-cart/components/CartTotals/GetCartTotals.gql'
import { useCurrentCartId } from '@graphcommerce/magento-cart'
import { useCartQuery } from '@graphcommerce/magento-cart/hooks'
import ApplyPay from './ApplePay'
import GooglePay from './GooglePay'

/** It sets the selected payment method on the cart. */
export function PaymentMethodOptions(props: PaymentOptionsProps) {
  const { code, step, child: brandCode, Container } = props
  
  const { currentCartId } = useCurrentCartId()
  const { data } = useCartQuery(GetCartTotalsDocument, { allowUrl: true })

  let component
  switch(brandCode) {
    case 'applepay':
      component = (<Container>
        <ApplyPay brandCode={brandCode} code={code} step={step} cartId={currentCartId} cart={data?.cart} />
      </Container>)
    break
    case 'googlepay':
      component = (<Container>
        <GooglePay brandCode={brandCode} code={code} step={step} cartId={currentCartId} cart={data?.cart} />
      </Container>)
    break
    default:
      component = (
        <ErrorSnackbar open>
          <Trans id='The payment is not available, please try again or select a different payment method.' />
        </ErrorSnackbar>
      )
  }
  return component
}
