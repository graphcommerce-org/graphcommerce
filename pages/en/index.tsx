import { GetStaticProps } from 'next'
import { PageLayoutProps, getStaticProps as getPageLayout } from 'components/PageLayout'
import Home from 'pages/index'

export default Home

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => ({
  props: await getPageLayout({ url: '/en', locale: 'en' }),
})
