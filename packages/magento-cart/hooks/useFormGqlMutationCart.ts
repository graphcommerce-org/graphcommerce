import {
  ApolloError,
  MutationHookOptions,
  TypedDocumentNode,
  useApolloClient,
} from '@graphcommerce/graphql'
import {
  useFormGqlMutation,
  UseFormGqlMutationReturn,
  UseFormGraphQlOptions,
} from '@graphcommerce/react-hook-form'
import { GraphQLError, Kind } from 'graphql'
import { isProtectedCartOperation } from '../link/isProtectedCartOperation'
import { CurrentCartIdDocument } from './CurrentCartId.gql'
import { useCartIdCreate } from './useCartIdCreate'
import { useCartShouldLoginToContinue } from './useCartPermissions'

export function useFormGqlMutationCart<
  Q extends Record<string, unknown>,
  V extends { cartId: string; [index: string]: unknown },
>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormGraphQlOptions<Q, V> & { submitWhileLocked?: boolean } = {},
  operationOptions?: MutationHookOptions<Q, V>,
): UseFormGqlMutationReturn<Q, V> {
  const cartId = useCartIdCreate()
  const client = useApolloClient()
  const shouldLoginToContinue = useCartShouldLoginToContinue()

  let shouldBlockOperation = false
  document.definitions.forEach((defenition) => {
    if (defenition.kind === Kind.OPERATION_DEFINITION) {
      shouldBlockOperation = !isProtectedCartOperation(defenition.name?.value ?? '')
    }
  })

  const result = useFormGqlMutation<Q, V>(
    document,
    {
      ...options,
      onBeforeSubmit: async (variables) => {
        if (shouldLoginToContinue && shouldBlockOperation) {
          return false
        }
        const vars = { ...variables, cartId: await cartId() }

        const res = client.cache.readQuery({ query: CurrentCartIdDocument })
        if (!options.submitWhileLocked && res?.currentCartId?.locked) {
          throw Error('Could not submit form, cart is locked')
          // console.log('Could not submit form, cart is locked', res.currentCartId.locked)
          // return false
        }

        return options.onBeforeSubmit ? options.onBeforeSubmit(vars) : vars
      },
    },
    { errorPolicy: 'all', ...operationOptions },
  )

  if (shouldLoginToContinue && result.formState.isSubmitted && shouldBlockOperation) {
    return {
      ...result,
      error: new ApolloError({
        graphQLErrors: [
          new GraphQLError('Action can not be performed by the current user', {
            extensions: { category: 'graphql-authorization' },
          }),
        ],
      }),
    }
  }

  return result
}
