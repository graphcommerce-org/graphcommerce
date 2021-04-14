import { mergeDeep } from '@apollo/client/utilities'
import cart from '@reachdigital/magento-cart/typePolicies'
import customer from '@reachdigital/magento-customer/typePolicies'
import configurableProduct from '@reachdigital/magento-product-configurable/typePolicies'

// todo(paales): Make sure the typePolicies are configured instead of hardcoded here.
export default mergeDeep(cart, customer, configurableProduct)
