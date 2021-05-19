import {
  PaymentModule,
  PaymentMethodPlaceOrderNoop,
} from '@reachdigital/magento-cart-payment-method'
import PurchaseOrderOptions from './PurchaseOrderOptions'

export const purchaseorder: PaymentModule = {
  PaymentOptions: PurchaseOrderOptions,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
}
