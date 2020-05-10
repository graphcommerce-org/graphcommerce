import { GetStaticProps } from 'next'
import { StaticPageVariables } from '../../lib/staticParams'
import Home from '../index'
import { PageLayoutProps, getStaticProps as getPageLayout } from '../../components/PageLayout'

export default Home

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => ({
  props: await getPageLayout({ url: '/en', locale: 'en' }),
})
