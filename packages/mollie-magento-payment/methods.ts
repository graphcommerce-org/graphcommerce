import { PaymentMethodOptionsNoop, PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { MollieActionCard } from './components/MollieActionCard/MollieActionCard'
import { MolliePaymentHandler } from './components/MolliePaymentHandler/MolliePaymentHandler'
import { MolliePlaceOrder } from './components/MolliePlaceOrder/MolliePlaceOrder'

const mollieModule: PaymentModule = {
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentActionCard: MollieActionCard,
  PaymentHandler: MolliePaymentHandler,
  PaymentPlaceOrder: MolliePlaceOrder,
}

/** List is extracted from https://github.com/mollie/magento2/blob/master/etc/payment.xml */

export const molliepayments: Record<string, PaymentModule> = {
  mollie_methods_applepay: mollieModule,
  mollie_methods_bancontact: mollieModule,
  mollie_methods_banktransfer: mollieModule,
  mollie_methods_belfius: mollieModule,
  mollie_methods_billie: mollieModule,
  mollie_methods_creditcard: mollieModule,
  mollie_methods_directdebit: mollieModule,
  mollie_methods_eps: mollieModule,
  mollie_methods_giftcard: mollieModule,
  mollie_methods_giropay: mollieModule,
  mollie_methods_ideal: mollieModule,
  mollie_methods_in3: mollieModule,
  mollie_methods_kbc: mollieModule,
  mollie_methods_klarnapaylater: mollieModule,
  mollie_methods_klarnapaynow: mollieModule,
  mollie_methods_klarnasliceit: mollieModule,
  mollie_methods_mybank: mollieModule,
  mollie_methods_paypal: mollieModule,
  mollie_methods_paymentlink: mollieModule,
  mollie_methods_paysafecard: mollieModule,
  mollie_methods_przelewy24: mollieModule,
  mollie_methods_sofort: mollieModule,
  mollie_methods_voucher: mollieModule,
}
