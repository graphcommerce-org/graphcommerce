import { GetStaticProps } from 'next'
import { StaticPageVariables } from 'node/staticParams'
import { PageLayoutProps } from 'components/PageLayout'
import Blog from 'pages/blog'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'
import getBlogListProps from 'components/BlogList/getBlogListProps'

export default Blog

export const getStaticProps: GetStaticProps<PageLayoutProps & GQLGetBlogListQuery> = async () => {
  const params: StaticPageVariables = { url: '/en/blog', locale: 'en' }
  const data = await Promise.all([getPageLayoutProps(params), getBlogListProps(params)])
  return { props: Object.assign(...data) }
}
