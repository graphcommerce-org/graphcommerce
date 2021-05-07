import {
  PaymentModule,
  PaymentMethodPlaceOrderNoop,
} from '@reachdigital/magento-cart-payment-method'
import PurchaseOrderOptions from './PurchaseOrderOptions'

const PurchaseOrder: PaymentModule = {
  PaymentOptions: PurchaseOrderOptions,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
}

export default PurchaseOrder
