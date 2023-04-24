import { useHits } from 'react-instantsearch-hooks'
import { AlgoliaPageHit } from '../lib/types'

function hitToPage(hits: AlgoliaPageHit[]) {
  return hits.map((h) => {
    const urlSplit = h.url.split('/')
    const url = urlSplit.reduce((prev, curr, currIndex) => {
      if (currIndex > 2) return `${prev}/${curr}`
      return ''
    })
    return {
      objectID: h.objectID,
      name: h.name,
      slug: h.slug,
      url,
      content: h.content,
      algoliaLastUpdateAtCET: h.algoliaLastUpdateAtCET,
    } satisfies AlgoliaPageHit
  })
}

export function useAlgoliaPageResults() {
  const { hits, results } = useHits<AlgoliaPageHit>()
  const pages = hitToPage(hits)
  return { pages, search: results?.query }
}
