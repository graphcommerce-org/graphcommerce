import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import CmsPage, { getStaticProps as getCmsPageStaticProps } from './page/[url]'

export default CmsPage

registerRouteUi('/', FullPageUi)

export function getStaticProps() {
  return getCmsPageStaticProps({ params: { url: '/' } })
}
