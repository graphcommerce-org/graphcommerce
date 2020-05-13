import { GetStaticProps } from 'next'
import getStaticPathsFactory from 'lib/getStaticPaths'
import extractParams, { StaticPageParams } from 'lib/staticParams'
import { PageLayoutProps } from 'components/PageLayout'
import BlogView from 'pages/blog/[url]'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'

export default BlogView

export const getStaticPaths = getStaticPathsFactory('/en/blog/', 'en')

export const getStaticProps: GetStaticProps<PageLayoutProps, StaticPageParams> = async (ctx) => ({
  props: await getPageLayoutProps(extractParams(ctx, '/en/blog/')),
})
