import {
  PaymentMethodOptionsNoop,
  PaymentMethodPlaceOrderNoop,
  PaymentModule,
} from '@reachdigital/magento-cart-payment-method'

export const checkmo: PaymentModule = {
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
}

export const banktransfer: PaymentModule = {
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
}
