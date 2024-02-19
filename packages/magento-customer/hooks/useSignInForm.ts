import { useApolloClient } from '@graphcommerce/graphql'
import { UseFormGraphQlOptions, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import {
  SignInDocument,
  SignInMutation,
  SignInMutationVariables,
} from '../components/SignInForm/SignIn.gql'
import { signOut } from '../components/SignOutForm/signOut'
import { CustomerDocument } from './Customer.gql'

type UseSignInFormProps = {
  email: string
} & UseFormGraphQlOptions<SignInMutation, SignInMutationVariables>

/**
 * To extend the actions that happen after a successful sign in, you can use the `onComplete` option.
 *
 * @example @graphcommerce/magento-cart/plugins/useSignInFormMergeCart
 */
export function useSignInForm({ email, ...options }: UseSignInFormProps) {
  const client = useApolloClient()

  return useFormGqlMutation(
    SignInDocument,
    {
      ...options,
      defaultValues: { email, ...options?.defaultValues },
      onBeforeSubmit: async (values) => {
        const oldEmail = client.cache.readQuery({ query: CustomerDocument })?.customer?.email

        /**
         * We are logging in because the session expired, but we're logging in with a different
         * email address, we need to reset the store.
         */
        if (oldEmail && oldEmail !== email) signOut(client)

        return options?.onBeforeSubmit
          ? options.onBeforeSubmit({ ...values, email })
          : { ...values, email }
      },
    },
    { errorPolicy: 'all' },
  )
}
