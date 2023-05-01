import { useQuery } from '@graphcommerce/graphql'
import { CompareSummaryDocument } from '../graphql'
import { CurrentCompareUidDocument } from '../graphql/CurrentCompareUid.gql'

export function useCompareSummary() {
  const currentCompareUid = useQuery(CurrentCompareUidDocument)
  const uid = currentCompareUid.data?.currentCompareUid?.uid
  const compareList = useQuery(CompareSummaryDocument, {
    variables: { uid: uid ?? '' },
    skip: !uid,
  })

  return compareList
}
