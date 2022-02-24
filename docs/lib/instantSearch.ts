import type { HitsRenderState } from 'instantsearch.js/es/connectors/hits/connectHits'
import { useHits as useHitsBase } from 'react-instantsearch-hooks'
import { SetReturnType } from 'type-fest'
import type { DocumentationDocument } from './DocumentIndexer'
import { createInstantSearchProps } from './typesense/createInstantSearchProps'

export const indexName = 'documents'

export const instantSearchProps = createInstantSearchProps<DocumentationDocument>(indexName, {
  query_by: {
    name: 2,
    content: 1,
  },
  numTypos: '1',
  typoTokensThreshold: 1,
  highlight_fields: 'content',
  highlight_full_fields: 'name',
  include_fields: 'name,url',
  // highlight_affix_num_tokens: ,
})

const useHits: SetReturnType<typeof useHitsBase, HitsRenderState<DocumentationDocument>> = (
  ...params
) => useHitsBase(...params) as HitsRenderState<DocumentationDocument>

export { useHits }
