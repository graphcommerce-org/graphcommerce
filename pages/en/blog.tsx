import { GQLLocale } from '../../generated/graphql'
import { PageLayoutProps } from '../../components/PageLayout'
import { GetStaticProps } from '../../lib/getStaticProps'
import Blog from '../blog'

export default Blog

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => {
  const params = { url: '/en/blog', locale: GQLLocale.En }
  // todo(paales): Make generic, currently I don't know how to merge the types
  // The objects are generic and I want props to become PageLayoutProps
  const data = await Promise.all([
    import('../../components/PageLayout/server/getStaticProps').then((module) =>
      module.default({ params }),
    ),
    import('../../components/Breadcrumb/server/getStaticProps').then((module) =>
      module.default({ params }),
    ),
  ])

  return { props: { ...data[0].props, ...data[1].props } }
}
