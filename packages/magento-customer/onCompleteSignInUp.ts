import { CartDocument } from '@reachdigital/magento-cart/Cart.gql'
import { MergeCartsDocument } from '@reachdigital/magento-cart/MergeCarts.gql'
import { OnCompleteFn } from '@reachdigital/next-ui/useMutationForm'
import { CustomerDocument } from './Customer.gql'
import { CustomerCartDocument } from './CustomerCart.gql'
import { SignInMutation } from './SignIn.gql'
import { SignUpMutation } from './SignUp.gql'

type OnCompleteSignInUp = OnCompleteFn<SignUpMutation | SignInMutation>

const onCompleteSignInUp: OnCompleteSignInUp = async (result, client) => {
  const { data } = result
  // Check succesfull login
  if (!data?.generateCustomerToken?.token) return

  const awaitCustomerQuery = client.query({
    query: CustomerDocument,
    fetchPolicy: 'network-only',
  })
  const awaitCart = client.query({ query: CartDocument })
  const awaitCustomerCart = client.query({ query: CustomerCartDocument })

  const { data: customerCart, error } = await awaitCustomerCart

  if (!customerCart?.customerCart.id) {
    if (error) throw error
    else throw Error("Cart can't be initialized")
  }

  // Write the result of the customerCart to the cart query so it can be used
  client.cache.writeQuery({
    query: CartDocument,
    data: { cart: customerCart.customerCart },
    broadcast: true,
  })

  const { data: currentCart } = await awaitCart

  // Merge carts if a customer as a cart
  if (currentCart?.cart?.id && customerCart.customerCart.id !== currentCart.cart.id) {
    await client.mutate({
      mutation: MergeCartsDocument,
      variables: {
        sourceCartId: currentCart.cart.id,
        destinationCartId: customerCart.customerCart.id,
      },
    })
  }

  await awaitCustomerQuery
}

export default onCompleteSignInUp
