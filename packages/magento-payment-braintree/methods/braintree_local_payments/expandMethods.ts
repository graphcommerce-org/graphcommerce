import type {
  ExpandPaymentMethods,
  PaymentMethod,
} from '@graphcommerce/magento-cart-payment-method'

/**
 * Local payment methods can be expanded to multiple separate methods logic taken from
 * https://developers.braintreepayments.com/guides/local-payment-methods/client-side-custom/javascript/v3#render-local-payment-method-buttons
 */
export const expandMethods: ExpandPaymentMethods = (available, cart) => {
  const countryCode = cart?.shipping_addresses?.[0]?.country.code
  const currency = cart?.prices?.grand_total?.currency
  const isEUR = currency === 'EUR'
  const isGB = currency === 'GBP' && countryCode === 'GB'
  const code = available.code ?? ''

  const methods: PaymentMethod[] = []

  if (countryCode === 'BE' && isEUR) {
    methods.push({ child: 'bancontact', title: 'Bancontact', code, preferred: true })
  }
  if (countryCode === 'AT' && isEUR) {
    methods.push({ child: 'eps', title: 'EPS', code })
  }

  if (countryCode === 'DE' && isEUR) {
    methods.push({ child: 'giropay', title: 'giropay', code })
  }

  if (countryCode === 'NL' && isEUR) {
    methods.push({ child: 'ideal', title: 'iDEAL', code, preferred: true })
  }

  if (['AT', 'BE', 'DE', 'IT', 'NL', 'ES', 'GB'].includes(countryCode ?? '') && (isEUR || isGB)) {
    methods.push({ child: 'sofort', title: 'Klarna Pay Now / SOFORT', code })
  }

  if (countryCode === 'IT' && isEUR) {
    methods.push({ child: 'mybank', title: 'MyBank', code })
  }

  if (countryCode === 'PL' && (isEUR || currency === 'PLN')) {
    methods.push({ child: 'p24', title: 'PL', code })
  }

  return methods
}
