import { GQLGetStaticProps } from 'node/staticParams'
import apolloClient from 'node/apolloClient'
import { GetAllContactCtaPeopleDocument } from 'generated/apollo'

const getContactCtaProps: GQLGetStaticProps<GQLGetAllContactCtaPeopleQuery> = async () => {
  const { data } = await (await apolloClient()).query<GQLGetAllContactCtaPeopleQuery>({
    query: GetAllContactCtaPeopleDocument,
  })
  return data
}

export default getContactCtaProps
