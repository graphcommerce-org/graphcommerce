import { GetStaticProps } from 'next'
import Blog from '../blog'
import { StaticPageVariables } from '../../lib/staticParams'
import { PageLayoutProps, getStaticProps as getPageLayout } from '../../components/PageLayout'
import { getStaticProps as getBlogList } from '../../components/BlogList'

export default Blog

export const getStaticProps: GetStaticProps<PageLayoutProps & GQLGetBlogListQuery> = async () => {
  const params: StaticPageVariables = { url: '/en/blog', locale: 'en' }
  const data = await Promise.all([getPageLayout(params), getBlogList(params)])
  return { props: Object.assign(...data) }
}
