import { GetStaticProps } from 'next'
import { StaticPageVariables } from '../../lib/staticParams'
import Contact from '../contact'
import { PageLayoutProps } from '../../components/PageLayout'

export default Contact

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => {
  const params: StaticPageVariables = { url: '/en/contact', locale: 'en' }

  const { getStaticProps: get } = await import('../../components/PageLayout')
  return { props: await get(params) }
}
