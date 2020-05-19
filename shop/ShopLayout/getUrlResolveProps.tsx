import apolloClient from 'node/apolloClient'
import { ResolveUrlDocument } from 'generated/sdk'
import { PromiseValue } from 'type-fest'

const getUrlResolveProps = async (variables: GQLResolveUrlQueryVariables) => {
  const {
    data: { urlResolver },
  } = await (await apolloClient()).query<GQLResolveUrlQuery, GQLResolveUrlQueryVariables>({
    query: ResolveUrlDocument,
    variables,
  })
  if (!urlResolver?.id) throw Error('Page not found')

  return {
    ...urlResolver,
    ...variables,
  }
}

export default getUrlResolveProps

export type GetUrlResolveProps = PromiseValue<ReturnType<typeof getUrlResolveProps>>
