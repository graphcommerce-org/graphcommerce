import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import FullPageUi from '../components/AppShell/FullPageUi'
import CmsPage, { getStaticProps as getCmsPageStaticProps } from './page/[url]'

export default CmsPage

registerRouteUi('/404', FullPageUi)

export const getStaticProps = () => getCmsPageStaticProps({ params: { url: 'no-route' } })
