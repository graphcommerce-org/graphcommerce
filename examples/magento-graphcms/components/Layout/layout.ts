import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { LayoutDocument } from './Layout.gql'

export const getLayout = async () => {
  const layout = graphqlQuery(LayoutDocument, { fetchPolicy: 'cache-first' })
  return { props: { ...(await layout).data } }
}
