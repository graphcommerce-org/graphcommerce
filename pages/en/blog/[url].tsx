import { GQLLocale } from '../../../generated/graphql'
import {
  getStaticProps as getPageLayoutData,
  PageLayoutProps,
} from '../../../components/PageLayout'
import { getStaticProps as getBreadcrumbData } from '../../../components/Breadcrumb'
import { GetStaticProps } from '../../../lib/getStaticProps'
import getStaticPathsFactory from '../../../components/PageLayout/server/getStaticPaths'
import BlogView from '../../blog/[url]'

export default BlogView

export const getStaticPaths = getStaticPathsFactory('/blog/', GQLLocale.Nl)

export const getStaticProps: GetStaticProps<PageLayoutProps> = async (ctx) => {
  if (!ctx.params) throw new Error('Params not defined for blog view')

  const params = { url: `/en/blog/${ctx.params.url}`, locale: GQLLocale.En }

  const data = await Promise.all([
    getPageLayoutData().then((obj) => obj.default({ params })),
    getBreadcrumbData().then((obj) => obj.default({ params })),
  ])

  return { props: { ...data[0].props, ...data[1].props } }
}
