import { mergeDeep } from '@apollo/client/utilities'
import cart from 'components/Cart/typePolicies'
import customer from 'components/Customer/typePolicies'
import pageTransition from 'components/PageTransition/typePolicies'

// todo(paales): Make sure the typePolicies are configured instead of hardcoded here.
export default mergeDeep(cart, customer, pageTransition)
