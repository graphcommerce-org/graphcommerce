import { mergeDeep } from '@apollo/client/utilities/common/mergeDeep'
import isLoggedInTypePolicies from 'components/IsLoggedIn/typePolicies'
import cartIdtypePolicies from 'components/CartId/typePolicies'
import cartTypePolicies from 'components/Cart/typePolicies'

// todo(paales): Make sure the typePolicies are configured instead of hardcoded here.

export default mergeDeep(cartIdtypePolicies, isLoggedInTypePolicies, cartTypePolicies)
