import { useQuery } from '@graphcommerce/graphql'
import { CompareListDocument } from '../graphql/CompareList.gql'
import { CurrentCompareUidDocument } from '../graphql/CurrentCompareUid.gql'

export function useCompareList() {
  const currentCompareUid = useQuery(CurrentCompareUidDocument)
  const uid = currentCompareUid.data?.currentCompareUid?.uid
  const compareList = useQuery(CompareListDocument, { variables: { uid: uid ?? '' }, skip: !uid })

  return compareList
}
