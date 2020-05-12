import { GetStaticProps } from 'next'
import { PageLayoutProps, getStaticProps as getPageLayout } from 'components/PageLayout'
import Contact from 'pages/contact'

export default Contact

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => ({
  props: await getPageLayout({ url: '/en/contact', locale: 'en' }),
})
