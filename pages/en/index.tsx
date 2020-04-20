import { GetStaticProps } from 'next'
import { StaticPageVariables } from '../../lib/staticParams'
import Home from '../index'
import { PageLayoutProps } from '../../components/PageLayout'

export default Home

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => {
  const params: StaticPageVariables = { url: '/en', locale: 'en' }

  const getStaticData = await import('../../components/PageLayout/server/getStaticData')
  return { props: await getStaticData.default(params) }
}
