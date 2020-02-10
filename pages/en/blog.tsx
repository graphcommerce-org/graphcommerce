import { GQLLocale } from '../../generated/graphql'
import { GraphCmsPage } from '../../graphcms'
import Blog from '../blog'

export default Blog

// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticProps = async (): Promise<{ props: GraphCmsPage }> => {
  const { getProps } = await import('../../graphcms/ssg')
  return getProps('/en/blog', GQLLocale.En)
}
