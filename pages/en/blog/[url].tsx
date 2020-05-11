import { GetStaticProps } from 'next'
import getStaticPathsFactory from 'lib/getStaticPaths'
import extractParams, { StaticPageParams } from 'lib/staticParams'
import { PageLayoutProps, getStaticProps as getPageLayout } from 'components/PageLayout'
import BlogView from 'pages/blog/[url]'

export default BlogView

export const getStaticPaths = getStaticPathsFactory('/en/blog/', 'en')

export const getStaticProps: GetStaticProps<PageLayoutProps, StaticPageParams> = async (ctx) => ({
  props: await getPageLayout(extractParams(ctx, '/en/blog/')),
})
