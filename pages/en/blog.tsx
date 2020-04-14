import { GetStaticProps } from 'next'
import { PageLayoutProps } from '../../components/PageLayout'
import Blog from '../blog'
import { StaticPageVariables } from '../../lib/staticParams'

export default Blog

export const getStaticProps: GetStaticProps<PageLayoutProps & GQLGetBlogListQuery> = async () => {
  const params: StaticPageVariables = { url: '/en/blog', locale: 'en' }

  const data = await Promise.all([
    import('../../components/PageLayout/server/getStaticData').then((module) =>
      module.default(params),
    ),
    import('../../components/Breadcrumb/server/getStaticData').then((module) =>
      module.default(params),
    ),
    import('../../components/BlogList/server/getStaticData').then((module) =>
      module.default(params),
    ),
  ])

  return { props: { ...data[0], ...data[1], ...data[2] } }
}
