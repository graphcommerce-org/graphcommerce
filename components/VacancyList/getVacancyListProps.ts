import { GQLGetStaticProps } from 'node/staticParams'
import apolloClient from 'node/apolloClient'
import { GetVacancyListDocument } from 'generated/apollo'

const getVacancyListProps: GQLGetStaticProps<GQLGetVacancyListQuery> = async (variables) => {
  const { data } = await (await apolloClient()).query<
    GQLGetVacancyListQuery,
    GQLGetVacancyListQueryVariables
  >({
    query: GetVacancyListDocument,
    variables: { locale: variables.locale },
  })
  return data
}

export default getVacancyListProps
