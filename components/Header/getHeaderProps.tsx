import { HeaderMenuDocument } from 'generated/apollo'
import { PromiseValue } from 'type-fest'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

export default async function getHeaderProps(
  client: ApolloClient<NormalizedCacheObject>,
  variables: GQLHeaderMenuQueryVariables,
) {
  const menu = client.query<GQLHeaderMenuQuery, GQLHeaderMenuQueryVariables>({
    query: HeaderMenuDocument,
    variables,
  })

  return (await menu).data
}

export type GetHeaderProps = PromiseValue<ReturnType<typeof getHeaderProps>>
