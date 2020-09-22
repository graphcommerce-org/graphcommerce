import {
  CustomerDocument,
  CartDocument,
  CustomerCartDocument,
  MergeCartsDocument,
  SignUpMutationResult,
  SignInMutationResult,
} from 'generated/apollo'

export default async function onCompleteSignInUp(
  result: SignUpMutationResult | SignInMutationResult,
) {
  const { data, client } = result
  // Check succesfull login
  if (!data?.generateCustomerToken?.token) return

  const awaitCustomerQuery = client.query<GQLCustomerQuery>({
    query: CustomerDocument,
    fetchPolicy: 'network-only',
  })
  const awaitCart = client.query<GQLCartQuery>({ query: CartDocument })
  const awaitCustomerCart = client.query<GQLCustomerCartQuery>({ query: CustomerCartDocument })

  const { data: customerCart, error } = await awaitCustomerCart

  if (!customerCart?.customerCart.id) {
    if (error) throw error
    else throw Error("Cart can't be initialized")
  }

  // Write the result of the customerCart to the cart query so it can be used
  client.cache.writeQuery<GQLCartQuery, GQLCartQueryVariables>({
    query: CartDocument,
    data: { cart: customerCart.customerCart },
    broadcast: true,
  })

  const { data: currentCart } = await awaitCart

  // Merge carts if a customer as a cart
  if (currentCart?.cart?.id && customerCart.customerCart.id !== currentCart.cart.id) {
    await client.mutate<GQLMergeCartsMutation, GQLMergeCartsMutationVariables>({
      mutation: MergeCartsDocument,
      variables: {
        sourceCartId: currentCart.cart.id,
        destinationCartId: customerCart.customerCart.id,
      },
    })
  }

  await awaitCustomerQuery
}
