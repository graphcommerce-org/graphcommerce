import { useApolloClient } from '@graphcommerce/graphql'
import { i18n } from '@lingui/core'
import { CreateCompareListDocument } from '../graphql/CreateCompareList.gql'
import { CurrentCompareUidDocument } from '../graphql/CurrentCompareUid.gql'
import { useAssignCurrentCompareListUid } from './useAssignCurrentCompareListUid'

export function useCompareListUidCreate() {
  const client = useApolloClient()
  const assign = useAssignCurrentCompareListUid()

  return async (): Promise<string> => {
    const uid = client.cache.readQuery({ query: CurrentCompareUidDocument })?.currentCompareUid?.uid

    if (uid) return uid

    const { data } = await client.mutate({
      mutation: CreateCompareListDocument,
      variables: { products: [] },
    })
    if (!data?.createCompareList)
      throw Error(i18n._(/* i18n */ 'Could not create a new compare list'))

    // We store the uid that is returned as the currentCompareList result
    assign(data.createCompareList.uid)

    return data.createCompareList.uid
  }
}
