import { UseFormGqlMutationReturn, UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { createContext, useContext } from 'react'
import {
  AddProductsToCompareListMutation,
  AddProductsToCompareListMutationVariables,
} from '../graphql/AddProductsToCompareList.gql'
import { RemoveProductsFromCompareListMutationVariables } from '../graphql/RemoveProductsFromCompareList.gql'

export type AddProductsToCompareContextType = {
  submit: () => Promise<void>
  form: Omit<
    UseFormReturn<
      AddProductsToCompareListMutationVariables | RemoveProductsFromCompareListMutationVariables
    >,
    'formState' | 'watch'
  >
}

export const AddProductsToCompareContext = createContext<AddProductsToCompareContextType | null>(
  null,
)

export function useAddProductsToCompare() {
  const context = useContext(AddProductsToCompareContext)
  if (!context) throw Error('useAddProductsToCompare must be used inside AddProductsToCompare')
  return context
}


export function useFormApolloData<Q extends Record<string, unknown>>(): Q | null | undefined {
  return useMotionValueValue(useAddProductsToCompare<Q>().data, (res) => res)
}

export function useFormApolloError(): ApolloError | null | undefined {
  return useMotionValueValue(useAddProductsToCompare().error, (err) => err)
}