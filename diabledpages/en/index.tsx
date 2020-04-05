import { GraphCmsPageProps } from '../../server'
import { GQLLocale } from '../../generated/graphql'
import Home from '../../pages'

export default Home

export const getStaticProps = async (): Promise<{ props: GraphCmsPageProps }> => {
  const { getProps } = await import('../../components/PageLayout/server/ssg')
  return getProps('/en', GQLLocale.En)
}
