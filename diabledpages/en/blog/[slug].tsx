import { ParsedUrlQuery } from 'querystring'
import { GQLLocale } from '../../../generated/graphql'
import BlogView from '../../../pages/blog/[url]'

export default BlogView

export const getStaticPaths = async () => {
  const { getPaths } = await import('../../../components/PageLayout/server/ssg')
  return getPaths('/en/blog/', GQLLocale.En)
}

export const getStaticProps = async (ctx: { params: ParsedUrlQuery }) => {
  const { getProps } = await import('../../../components/PageLayout/server/ssg')
  return getProps(`/en/blog/${ctx.params.slug}`, GQLLocale.En)
}
