import { GetStaticProps } from 'next'
import Contact from '../contact'
import { PageLayoutProps, getStaticProps as getPageLayout } from '../../components/PageLayout'

export default Contact

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => ({
  props: await getPageLayout({ url: '/en/contact', locale: 'en' }),
})
