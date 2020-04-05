import {
  GQLGetPageLayoutQueryVariables,
  GQLGetPageLayoutQuery,
  GetPageLayoutDocument,
} from '../../../generated/graphql'
import { initApolloClient } from '../../../lib/apollo'
import { GetStaticProps } from '../../../lib/getStaticProps'

const getStaticProps: GetStaticProps<GQLGetPageLayoutQuery> = async ({ params }) => {
  if (!params) throw new Error('Please provide params')

  const apolloClient = initApolloClient()
  const query = apolloClient.query<GQLGetPageLayoutQuery, GQLGetPageLayoutQueryVariables>({
    query: GetPageLayoutDocument,
    variables: params,
  })

  return { props: (await query).data }
}

export default getStaticProps
