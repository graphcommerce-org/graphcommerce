import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { useHits } from 'react-instantsearch-hooks-web'
import type { AlgoliaCategoryHit } from '../lib/types'

function hitToCategory(hits: AlgoliaCategoryHit[], categoryUrlSuffix?: string | null) {
  return hits.map((h) => {
    const urlSplit = h.url.split('/')
    const categoryUrl = urlSplit.reduce((prev, curr, currIndex) => {
      if (currIndex > 2) return `${prev}/${curr}`
      return ''
    })
    const url_key = categoryUrl.substring(1, categoryUrl.length - (categoryUrlSuffix?.length ?? 0))
    return {
      category_uid: h.objectID,
      category_level: h.level,
      category_name: h.name,
      category_url_path: url_key,
    }
  })
}

export function useAlgoliaCategoryResults() {
  const { hits, results } = useHits<AlgoliaCategoryHit>()
  const { data } = useQuery(StoreConfigDocument)
  const categories = hitToCategory(hits, data?.storeConfig?.category_url_suffix)
  return { categories, search: results?.query }
}
