import { GetStaticProps } from 'next'
import Blog from '../blog'
import { StaticPageVariables } from '../../lib/staticParams'
import { PageLayoutProps } from '../../components/PageLayout'

export default Blog

export const getStaticProps: GetStaticProps<PageLayoutProps & GQLGetBlogListQuery> = async () => {
  const params: StaticPageVariables = { url: '/en/blog', locale: 'en' }

  const data = await Promise.all([
    import('../../components/PageLayout').then(({ getStaticProps: get }) => get(params)),
    import('../../components/BlogList').then(({ getStaticProps: get }) => get(params)),
  ])

  return { props: Object.assign(...data) }
}
