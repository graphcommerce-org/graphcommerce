import { PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { MSPPaymentActionCard } from './components/MSPPaymentActionCard/MSPPaymentActionCard'
import { MSPPaymentHandler } from './components/MSPPaymentHandler/MSPPaymentHandler'
import { MSPPaymentOptions } from './components/MSPPaymentOptions/MSPPaymentOptions'
import { MSPPaymentPlaceOrder } from './components/MSPPaymentPlaceOrder/MSPPaymentPlaceOrder'

const mspModule: PaymentModule = {
  PaymentOptions: MSPPaymentOptions,
  PaymentActionCard: MSPPaymentActionCard,
  PaymentHandler: MSPPaymentHandler,
  PaymentPlaceOrder: MSPPaymentPlaceOrder,
}

/**
 * List is extracted from https://github.com/MultiSafepay/magento2-core/blob/master/etc/config.xml
 *
 * All payment methods are enabled except the ones that require additional imputs:
 *
 * - `multisafepay_afterpay`
 * - `multisafepay_directbanktransfer`
 * - `multisafepay_directdebit`
 * - `multisafepay_einvoicing`
 * - `multisafepay_in3`
 * - `multisafepay_payafter`
 *
 * Excluded taken from:
 * https://github.com/MultiSafepay/magento2-graphql/blob/53db83f1b3382c8e11c22a1fa2170b8b17ecb7d7/etc/schema.graphqls#L36-L41
 */
export const multisafepay: Record<string, PaymentModule> = {
  multisafepay_ideal: mspModule,
  multisafepay_ideal_recurring: mspModule,
  multisafepay_ideal_vault: mspModule,
  // multisafepay_payafter: mspModule,
  multisafepay_klarna: mspModule,
  // multisafepay_afterpay: mspModule,
  multisafepay_bancontact: mspModule,
  multisafepay_amex: mspModule,
  multisafepay_applepay: mspModule,
  multisafepay_belfius: mspModule,
  multisafepay_creditcard: mspModule,
  multisafepay_creditcard_recurring: mspModule,
  multisafepay_creditcard_vault: mspModule,
  multisafepay_visa_recurring: mspModule,
  multisafepay_visa_vault: mspModule,
  multisafepay_mastercard_recurring: mspModule,
  multisafepay_mastercard_vault: mspModule,
  multisafepay_amex_recurring: mspModule,
  multisafepay_amex_vault: mspModule,
  multisafepay_dotpay: mspModule,
  multisafepay_eps: mspModule,
  multisafepay_giropay: mspModule,
  multisafepay_googlepay: mspModule,
  multisafepay_idealqr: mspModule,
  multisafepay_maestro: mspModule,
  multisafepay_maestro_recurring: mspModule,
  multisafepay_maestro_vault: mspModule,
  multisafepay_mastercard: mspModule,
  multisafepay_mybank: mspModule,
  multisafepay_paysafecard: mspModule,
  multisafepay_sofort: mspModule,
  multisafepay_trustpay: mspModule,
  multisafepay_visa: mspModule,
  multisafepay_alipay: mspModule,
  multisafepay_alipayplus: mspModule,
  // multisafepay_directbanktransfer: mspModule,
  multisafepay_banktransfer: mspModule,
  multisafepay_santander: mspModule,
  multisafepay_cbc: mspModule,
  // multisafepay_directdebit: mspModule,
  // multisafepay_directdebit_recurring: mspModule,
  // multisafepay_directdebit_vault: mspModule,
  // multisafepay_einvoicing: mspModule,
  multisafepay_inghomepay: mspModule,
  multisafepay_kbc: mspModule,
  multisafepay_paypal: mspModule,
  multisafepay_trustly: mspModule,
  // multisafepay_in3: mspModule,
  multisafepay_genericgateway: mspModule,
  multisafepay_babygiftcard: mspModule,
  multisafepay_beautyandwellness: mspModule,
  multisafepay_boekenbon: mspModule,
  multisafepay_fashioncheque: mspModule,
  multisafepay_fashiongiftcard: mspModule,
  multisafepay_fietsenbon: mspModule,
  multisafepay_edenred: mspModule,
  multisafepay_gezondheidsbon: mspModule,
  multisafepay_givacard: mspModule,
  multisafepay_good4fun: mspModule,
  multisafepay_goodcard: mspModule,
  multisafepay_nationaletuinbon: mspModule,
  multisafepay_parfumcadeaukaart: mspModule,
  multisafepay_podiumcadeaukaart: mspModule,
  multisafepay_sportenfit: mspModule,
  multisafepay_vvvcadeaukaart: mspModule,
  multisafepay_webshopgiftcard: mspModule,
  multisafepay_wechatpay: mspModule,
  multisafepay_wellnessgiftcard: mspModule,
  multisafepay_wijncadeau: mspModule,
  multisafepay_winkelcheque: mspModule,
  multisafepay_yourgift: mspModule,
}
