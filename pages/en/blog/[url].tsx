import { GQLLocale } from '../../../generated/graphql'
import { PageLayoutProps } from '../../../components/PageLayout'
import { GetStaticProps } from '../../../lib/getStaticProps'
import getStaticPathsFactory from '../../../components/PageLayout/server/getStaticPaths'
import BlogView from '../../blog/[url]'

export default BlogView

export const getStaticPaths = getStaticPathsFactory('/en/blog/', GQLLocale.En)

export const getStaticProps: GetStaticProps<PageLayoutProps> = async (ctx) => {
  if (!ctx.params) throw new Error('Params not defined for blog view')

  const params = { url: `/en/blog/${ctx.params.url}`, locale: GQLLocale.En }

  const data = await Promise.all([
    import('../../../components/PageLayout/server/getStaticProps').then((module) =>
      module.default({ params }),
    ),
    import('../../../components/Breadcrumb/server/getStaticProps').then((module) =>
      module.default({ params }),
    ),
  ])

  return { props: { ...data[0].props, ...data[1].props } }
}
