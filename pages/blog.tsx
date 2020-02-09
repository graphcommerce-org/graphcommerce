import { GQLLocale } from '../generated/graphql'
import { GraphCmsPage, PageHead } from '../graphcms'

const Blog: React.FC<GraphCmsPage> = ({ page, locale }) => {
  return (
    <>
      <PageHead locale={locale} page={page} />
      <div>hoi</div>
    </>
  )
}

export default Blog

// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticProps = async () => {
  const { getProps } = await import('../graphcms/ssg')
  return getProps('blog', GQLLocale.Nl)
}
