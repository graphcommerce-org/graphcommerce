import apolloClient from 'node/apolloClient'
import { NavigationMenuDocument } from 'generated/apollo'
import { PromiseValue } from 'type-fest'

const getNavigationProps = async () => {
  const {
    data: { category },
  } = await (await apolloClient()).query<GQLNavigationMenuQuery, GQLNavigationMenuQueryVariables>({
    query: NavigationMenuDocument,
    variables: { id: 2 },
  })
  return { menu: category }
}

export default getNavigationProps

export type GetNavigationProps = PromiseValue<ReturnType<typeof getNavigationProps>>
