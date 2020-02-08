import { GQLLocale } from '../../generated/graphql'
import { BlogLayout } from '../../layout/Blog'
import { GraphCmsStaticProps } from '../../graphcms/ssg'

export default BlogLayout

// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticPaths = async () => {
  const { getStaticPaths } = await import('../../graphcms/ssg')
  return getStaticPaths('blog', GQLLocale.Nl)
}
// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticProps: GraphCmsStaticProps = async ctx => {
  const { createGetStaticProps } = await import('../../graphcms/ssg')
  return createGetStaticProps('blog', GQLLocale.Nl)(ctx)
}
