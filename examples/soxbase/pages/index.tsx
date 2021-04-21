import { StoreConfigDocument } from '@reachdigital/magento-store'
import apolloClient from '../lib/apolloClient'
import CmsPage, { getStaticProps as getCmsPageStaticProps } from './page/[url]'

export default CmsPage

export const getStaticProps = async ({ locale, ...rest }) => {
  const client = apolloClient(locale, true)
  const conf = (await client.query({ query: StoreConfigDocument })).data
  const url = conf?.storeConfig?.cms_home_page ?? ''
  return getCmsPageStaticProps({ params: { url }, locale, ...rest })
}
