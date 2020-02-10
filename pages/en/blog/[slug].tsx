import { ParsedUrlQuery } from 'querystring'
import { GQLLocale } from '../../../generated/graphql'
import BlogSlug from '../../blog/[slug]'

export default BlogSlug

// eslint-disable-next-line @typescript-eslint/camelcase
// export const unstable_getStaticPaths = async () => {
//   const { getStaticPaths } = await import('../../../graphcms/ssg')
//   return getStaticPaths('/en/blog', GQLLocale.En)
// }

// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticProps = async (ctx: { params: ParsedUrlQuery }) => {
  const { getProps } = await import('../../../graphcms/ssg')
  return getProps(`/en/blog/${ctx.params.slug}`, GQLLocale.En)
}
