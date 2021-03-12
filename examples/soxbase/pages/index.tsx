import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import FullPageUi from '../components/AppShell/FullPageUi'
import apolloClient from '../lib/apolloClient'
import CmsPage, { getStaticProps as getCmsPageStaticProps } from './page/[url]'

export default CmsPage

registerRouteUi('/', FullPageUi)

export const getStaticProps = async ({ locale, ...rest }) => {
  const client = apolloClient(locale, true)
  const config = (await client.query({ query: StoreConfigDocument })).data
  const url = config?.storeConfig?.cms_home_page ?? ''
  return getCmsPageStaticProps({ params: { url }, locale, ...rest })
}
