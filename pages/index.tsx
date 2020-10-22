import FullPageUi from 'components/AppShell/FullPageUi'
import { registerRouteUi } from 'components/PageTransition/historyHelpers'
import { GetStaticProps } from 'next'
import CmsPage, { getStaticProps as getCmsPageStaticProps } from 'pages/page/[url]'

export default CmsPage

registerRouteUi('/', FullPageUi)

export const getStaticProps: GetStaticProps = async () => {
  return getCmsPageStaticProps({ params: { url: '/' } })
}
