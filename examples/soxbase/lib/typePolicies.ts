import { mergeDeep } from '@apollo/client/utilities'
import { cartTypePolicies } from '@reachdigital/magento-cart'
import { customerTypePolicies } from '@reachdigital/magento-customer'
import { magentoTypePolicies } from '@reachdigital/magento-graphql'

// todo(paales): Make sure the typePolicies are configured instead of hardcoded here.
export default mergeDeep(magentoTypePolicies, cartTypePolicies, customerTypePolicies)
