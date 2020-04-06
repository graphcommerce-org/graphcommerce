import { GQLLocale } from '../../generated/graphql'
import { getStaticProps as getPageLayoutData, PageLayoutProps } from '../../components/PageLayout'
import { getStaticProps as getBreadcrumbData } from '../../components/Breadcrumb'
import { GetStaticProps } from '../../lib/getStaticProps'
import Blog from '../blog'

export default Blog

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => {
  const params = { url: '/en/blog', locale: GQLLocale.En }
  // todo(paales): Make generic, currently I don't know how to merge the types
  // The objects are generic and I want props to become PageLayoutProps
  const data = await Promise.all([
    getPageLayoutData().then((obj) => obj.default({ params })),
    getBreadcrumbData().then((obj) => obj.default({ params })),
  ])

  return { props: { ...data[0].props, ...data[1].props } }
}
