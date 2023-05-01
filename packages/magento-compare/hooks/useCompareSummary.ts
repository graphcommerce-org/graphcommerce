import { useQuery } from '@graphcommerce/graphql'
import { CurrentCompareUidDocument, CompareSummaryDocument } from '../graphql'

export function useCompareSummary() {
  const currentCompareUid = useQuery(CurrentCompareUidDocument)
  const uid = currentCompareUid.data?.currentCompareUid?.uid
  const compareList = useQuery(CompareSummaryDocument, {
    variables: { uid: uid ?? '' },
    skip: !uid,
  })

  return compareList
}
