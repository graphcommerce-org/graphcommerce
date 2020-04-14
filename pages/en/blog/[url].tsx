import { GetStaticProps } from 'next'
import getStaticPathsFactory from '../../../components/PageLayout/server/getStaticPaths'
import BlogView from '../../blog/[url]'
import extractParams, { StaticPageParams } from '../../../lib/staticParams'

export default BlogView

export const getStaticPaths = getStaticPathsFactory('/en/blog/', 'en')

export const getStaticProps: GetStaticProps<GQLGetPageLayoutQuery, StaticPageParams> = async (
  ctx,
) => {
  const params = extractParams(ctx, '/en/blog/')

  const data = await Promise.all([
    import('../../../components/PageLayout/server/getStaticData').then((module) =>
      module.default(params),
    ),
  ])

  return { props: data[0] }
}
