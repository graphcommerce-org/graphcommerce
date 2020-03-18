import { GraphCmsPageProps } from '../../graphcms'
import { GQLLocale } from '../../generated/graphql'
import Home from '..'

export default Home

export const getStaticProps = async (): Promise<{ props: GraphCmsPageProps }> => {
  const { getProps } = await import('../../graphcms/ssg')
  return getProps('/en', GQLLocale.En)
}
