import { GetStaticProps } from 'next'
import { StaticPageVariables } from '../../lib/staticParams'
import Home from '../index'

export default Home

export const getStaticProps: GetStaticProps<GQLGetPageLayoutQuery> = async () => {
  const params: StaticPageVariables = { url: '/en', locale: 'en' }

  const getStaticData = await import('../../components/PageLayout/server/getStaticData')
  return { props: await getStaticData.default(params) }
}
