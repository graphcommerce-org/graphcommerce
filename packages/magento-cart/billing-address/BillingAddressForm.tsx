import { useQuery } from '@apollo/client'
import { ClientCartDocument } from '../ClientCart.gql'

export default function BillingAddressForm() {
  const { data: cartData } = useQuery(ClientCartDocument)

  return <div>kaak</div>
}
