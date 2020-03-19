import { GQLLocale } from '../../generated/graphql'
import { GraphCmsPageProps } from '../../graphcms'
import Blog from '../blog'

export default Blog

export const getStaticProps = async (): Promise<{ props: GraphCmsPageProps }> => {
  const { getProps } = await import('../../graphcms/ssg')
  return getProps('/en/blog', GQLLocale.En)
}
