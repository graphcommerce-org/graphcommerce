import { InstantSearchProps } from 'react-instantsearch-hooks'
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter'
import { Leaves } from './Leaves'
import { BaseDocument } from './SearchIndexer'
import { typesenseClientConf } from './typesenseClientConf'

type BaseParams = Omit<
  NonNullable<
    ConstructorParameters<typeof TypesenseInstantSearchAdapter>[0]['additionalSearchParameters']
  >,
  'query_by' | 'query_by_weight'
>

type InstantSearchClientParams<Document extends BaseDocument> = BaseParams & {
  query_by: {
    [key in Leaves<Document>]?: number
  }
}

export function createInstantSearchProps<Document extends BaseDocument>(
  indexName: string,
  params: InstantSearchClientParams<Document>,
): InstantSearchProps {
  const { query_by, ...rest } = params

  const { searchClient } = new TypesenseInstantSearchAdapter({
    server: typesenseClientConf(),
    additionalSearchParameters: {
      query_by: Object.keys(query_by).join(','),
      query_by_weights: Object.values(query_by).join(','),
      ...rest,
    },
  })

  return { searchClient, indexName }
}
