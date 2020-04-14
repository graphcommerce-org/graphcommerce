import { GetStaticProps } from 'next'
import Blog from '../blog'
import { StaticPageVariables } from '../../lib/staticParams'

export default Blog

export const getStaticProps: GetStaticProps<
  GQLGetPageLayoutQuery & GQLGetBlogListQuery
> = async () => {
  const params: StaticPageVariables = { url: '/en/blog', locale: 'en' }

  const data = await Promise.all([
    import('../../components/PageLayout/server/getStaticData').then((module) =>
      module.default(params),
    ),
    import('../../components/BlogList/server/getStaticData').then((module) =>
      module.default(params),
    ),
  ])

  return { props: Object.assign(...data) }
}
