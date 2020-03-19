import { ParsedUrlQuery } from 'querystring'
import { GQLLocale } from '../../../generated/graphql'
import BlogSlug from '../../blog/[slug]'

export default BlogSlug

export const getStaticPaths = async () => {
  const { getPaths } = await import('../../../graphcms/ssg')
  return getPaths('/en/blog/', GQLLocale.En)
}

export const getStaticProps = async (ctx: { params: ParsedUrlQuery }) => {
  const { getProps } = await import('../../../graphcms/ssg')
  return getProps(`/en/blog/${ctx.params.slug}`, GQLLocale.En)
}
