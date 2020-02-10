import { GraphCmsPageProps } from '../../graphcms'
import { GQLLocale } from '../../generated/graphql'
import Home from '..'

export default Home

// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticProps = async (): Promise<{ props: GraphCmsPageProps }> => {
  const { getProps } = await import('../../graphcms/ssg')
  return getProps('/en', GQLLocale.En)
}
