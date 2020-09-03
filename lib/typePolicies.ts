import { mergeDeep } from '@apollo/client/utilities'
import cartTypePolicies from 'components/Cart/typePolicies'
import customerTypePolicies from 'components/Customer/typePolicies'

// todo(paales): Make sure the typePolicies are configured instead of hardcoded here.
export default mergeDeep(cartTypePolicies, customerTypePolicies)
