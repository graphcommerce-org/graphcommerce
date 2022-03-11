import {
  PaymentModule,
  PaymentMethodPlaceOrderNoop,
} from '@graphcommerce/magento-cart-payment-method'
import { PurchaseOrderOptions } from './PurchaseOrderOptions'

export const purchaseorder: PaymentModule = {
  PaymentOptions: PurchaseOrderOptions,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
}
