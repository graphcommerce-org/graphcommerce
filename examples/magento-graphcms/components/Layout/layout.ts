import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { LayoutDocument } from './Layout.gql'

export const getLayout = async () => {
  const layout = graphqlQuery(LayoutDocument, { revalidate: 60 * 60 })
  return { props: { ...(await layout).data } }
}
