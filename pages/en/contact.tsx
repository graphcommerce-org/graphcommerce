import { GetStaticProps } from 'next'
import { PageLayoutProps } from 'components/PageLayout'
import Contact from 'pages/contact'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'

export default Contact

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => ({
  props: await getPageLayoutProps({ url: '/en/contact', locale: 'en' }),
})
