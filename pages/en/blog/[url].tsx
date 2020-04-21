import { GetStaticProps } from 'next'
import getStaticPathsFactory from '../../../lib/getStaticPaths'
import BlogView from '../../blog/[url]'
import extractParams, { StaticPageParams } from '../../../lib/staticParams'
import { PageLayoutProps } from '../../../components/PageLayout'

export default BlogView

export const getStaticPaths = getStaticPathsFactory('/en/blog/', 'en')

export const getStaticProps: GetStaticProps<PageLayoutProps, StaticPageParams> = async (ctx) => {
  const params = extractParams(ctx, '/en/blog/')

  const { getStaticProps: get } = await import('../../../components/PageLayout')
  return { props: await get(params) }
}
