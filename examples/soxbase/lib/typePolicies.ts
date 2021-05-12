import { mergeDeep } from '@apollo/client/utilities'
import { typePolicies as cart } from '@reachdigital/magento-cart'
import customer from '@reachdigital/magento-customer/typePolicies'
import magentoTypePolicies from '@reachdigital/magento-graphql/typePolicies'

// todo(paales): Make sure the typePolicies are configured instead of hardcoded here.
export default mergeDeep(magentoTypePolicies, cart, customer)
