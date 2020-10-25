import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import { GetStaticProps } from 'next'
import CmsPage, { getStaticProps as getCmsPageStaticProps } from './page/[url]'

export default CmsPage

registerRouteUi('/', FullPageUi)

export const getStaticProps: GetStaticProps = async () => {
  return getCmsPageStaticProps({ params: { url: '/' } })
}
