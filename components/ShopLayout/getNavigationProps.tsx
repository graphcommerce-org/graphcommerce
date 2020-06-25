import apolloClient from 'node/apolloClient'
import { NavigationMenuDocument } from 'generated/apollo'
import { PromiseValue } from 'type-fest'

export default async function getNavigationProps() {
  const client = await apolloClient()
  const menu = client.query<GQLNavigationMenuQuery, GQLNavigationMenuQueryVariables>({
    query: NavigationMenuDocument,
  })

  return (await menu).data
}

export type GetNavigationProps = PromiseValue<ReturnType<typeof getNavigationProps>>
