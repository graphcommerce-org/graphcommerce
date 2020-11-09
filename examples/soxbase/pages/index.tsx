import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import apolloClient from '../lib/apolloClient'
import CmsPage, { getStaticProps as getCmsPageStaticProps } from './page/[url]'

export default CmsPage

registerRouteUi('/', FullPageUi)

export const getStaticProps = async () => {
  const client = apolloClient()
  const config = (await client.query({ query: StoreConfigDocument })).data
  const url = config?.storeConfig?.cms_home_page ?? ''
  return getCmsPageStaticProps({ params: { url } })
}
