import apolloClient from 'node/apolloClient'
import { HeaderMenuDocument } from 'generated/apollo'
import { PromiseValue } from 'type-fest'

export default async function getHeaderProps() {
  const client = await apolloClient()
  const menu = client.query<GQLHeaderMenuQuery, GQLHeaderMenuQueryVariables>({
    query: HeaderMenuDocument,
    variables: { rootCategory: '2' },
  })

  return (await menu).data
}

export type GetHeaderProps = PromiseValue<ReturnType<typeof getHeaderProps>>
