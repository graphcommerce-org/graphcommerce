import apolloClient from 'node/apolloClient'
import { PromiseValue } from 'type-fest'
import { ResolveUrlDocument } from 'generated/apollo'

export default async function getUrlResolveProps(variables: GQLResolveUrlQueryVariables) {
  const { data } = await (await apolloClient()).query<
    GQLResolveUrlQuery,
    GQLResolveUrlQueryVariables
  >({ query: ResolveUrlDocument, variables })

  if (!data?.urlResolver?.id) throw Error('Page not found')
  return data
}

export type GetUrlResolveProps = PromiseValue<ReturnType<typeof getUrlResolveProps>>
