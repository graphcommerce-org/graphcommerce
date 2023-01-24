import { useApolloClient } from '@graphcommerce/graphql'
import { i18n } from '@lingui/core'
import { CreateCompareListDocument } from '../graphql/CreateCompareList.gql'
import { CurrentCompareUidDocument } from '../graphql/CurrentCompareUid.gql'
import { useAssignCurrentCompareListId } from './useAssignCurrentCompareListId'

export function useCompareListIdCreate() {
  const client = useApolloClient()
  const assignCurrentCompareListId = useAssignCurrentCompareListId()

  return async (): Promise<string> => {
    const currentCompareListId = client.cache.readQuery({ query: CurrentCompareUidDocument })
      ?.currentCompareUid?.id

    if (currentCompareListId) return currentCompareListId

    const { data } = await client.mutate({
      mutation: CreateCompareListDocument,
      variables: { products: [] },
    })
    if (!data?.createCompareList)
      throw Error(i18n._(/* i18n */ 'Could not create a new compare list'))

    // We store the compareId that is returned as the currentCartId result
    assignCurrentCompareListId(data.createCompareList.uid)

    return data.createCompareList.uid
  }
}
