import {
  PaymentMethodOptionsNoop,
  PaymentMethodPlaceOrderNoop,
} from '@reachdigital/magento-cart-payment-method'
import { PaymentModule } from '@reachdigital/magento-cart-payment-method/Api/PaymentMethod'

export const checkmo: PaymentModule = {
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
}

export const banktransfer: PaymentModule = {
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
}
