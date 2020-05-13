import { GetStaticProps } from 'next'
import { PageLayoutProps } from 'components/PageLayout'
import Home from 'pages/index'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'

export default Home

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => ({
  props: await getPageLayoutProps({ url: '/en', locale: 'en' }),
})
