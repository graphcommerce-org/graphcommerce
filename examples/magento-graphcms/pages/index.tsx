import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'
import CmsPage, { GetPageStaticProps, getStaticProps as getCmsPageStaticProps } from './page/[url]'

export default CmsPage

export const config = { unstable_JsPreload: false }

export const getStaticProps: GetPageStaticProps = async ({ locale, ...rest }) => {
  const client = graphqlSharedClient(locale)
  const conf = (await client.query({ query: StoreConfigDocument })).data
  const url = conf?.storeConfig?.cms_home_page ?? ''
  return getCmsPageStaticProps({ params: { url }, locale, ...rest })
}
