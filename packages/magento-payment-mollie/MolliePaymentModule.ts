import { PaymentMethodOptionsNoop, PaymentModule } from '@reachdigital/magento-cart-payment-method'

export const mollie: PaymentModule = {
  PaymentOptions: PaymentMethodOptionsNoop,
}

const methods = [
  'mollie_methods_paypal',
  'mollie_methods_ideal',
  'mollie_methods_klarnapaylater',
  'mollie_methods_creditcard',
]
