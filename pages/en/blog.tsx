import { GetStaticProps } from 'next'
import { PageLayoutProps } from '../../components/PageLayout'
import Blog from '../blog'
import { StaticPageVariables } from '../../lib/staticParams'

export default Blog

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => {
  const params: StaticPageVariables = { url: '/en/blog', locale: 'en' }
  // todo(paales): Make generic, currently I don't know how to merge the types
  // The objects are generic and I want props to become PageLayoutProps
  const data = await Promise.all([
    import('../../components/PageLayout/server/getStaticData').then((module) =>
      module.default(params),
    ),
    import('../../components/Breadcrumb/server/getStaticData').then((module) =>
      module.default(params),
    ),
  ])

  return { props: { ...data[0], ...data[1] } }
}
