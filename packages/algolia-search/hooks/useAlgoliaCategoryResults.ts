import { useHits } from 'react-instantsearch-hooks'
import { AlgoliaCategoryHit } from '../lib/types'

function hitToCategory(hits: AlgoliaCategoryHit[]) {
  return hits.map((h) => {
    const urlSplit = h.url.split('/')
    const categoryUrl = urlSplit.reduce((prev, curr, currIndex) => {
      if (currIndex > 2) return `${prev}/${curr}`
      return ''
    })
    const url_key = categoryUrl.substring(0, categoryUrl.length - 5)
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
  const categories = hitToCategory(hits)
  return { categories, search: results?.query }
}
