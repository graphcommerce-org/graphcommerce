import { GetStaticProps } from 'next'
import { StaticPageVariables } from '../../lib/staticParams'
import Home from '../index'
import { PageLayoutProps } from '../../components/PageLayout'

export default Home

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => {
  const params: StaticPageVariables = { url: '/en', locale: 'en' }

  const { getStaticProps: get } = await import('../../components/PageLayout')
  return { props: await get(params) }
}
