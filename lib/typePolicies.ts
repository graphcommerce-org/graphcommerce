import { mergeDeep } from '@apollo/client/utilities'
import cartTypePolicies from 'components/Cart/typePolicies'
import cartIdtypePolicies from 'components/CartId/typePolicies'
import isLoggedInTypePolicies from 'components/IsLoggedIn/typePolicies'

// todo(paales): Make sure the typePolicies are configured instead of hardcoded here.

export default mergeDeep(cartIdtypePolicies, isLoggedInTypePolicies, cartTypePolicies)
