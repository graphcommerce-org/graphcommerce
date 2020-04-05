import { GetStaticProps } from 'next'
import { GQLLocale } from '../../generated/graphql'
import Blog from '../../pages/blog'
import { PageLayoutProps } from '../../components/PageLayout'

export default Blog

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => {
  // todo(paales): Make generic, currently I don't know how to merge the types
  // The objects are generic and I want props to become PageLayoutProps
  const data = await Promise.all([
    getPageLayoutData().then((obj) =>
      obj.default({
        params: { url: '/', locale: GQLLocale.Nl },
      }),
    ),
    getBreadcrumbData().then((obj) =>
      obj.default({
        params: { url: '/', locale: GQLLocale.Nl },
      }),
    ),
  ])

  return { props: { ...data[0].props, ...data[1].props } }
}
