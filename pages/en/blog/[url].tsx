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

export const getStaticProps: GetStaticProps<PageLayoutProps> = async ({ params }) => {
  if (!params) throw new Error('Params not defined for blog view')

  const data = await Promise.all([
    getPageLayoutData().then((obj) =>
      obj.default({
        params: { url: `/en/blog/${params.url}`, locale: GQLLocale.En },
      }),
    ),
    getBreadcrumbData().then((obj) =>
      obj.default({
        params: { url: `/en/blog/${params.url}`, locale: GQLLocale.En },
      }),
    ),
  ])

  return { props: { ...data[0].props, ...data[1].props } }
}
