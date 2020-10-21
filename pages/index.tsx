import FullPageUi from 'components/AppShell/FullPageUi'
import { registerRoute } from 'components/PageTransition/historyHelpers'
import { GetStaticProps } from 'next'
import CmsPage, { getStaticProps as getCmsPageStaticProps } from 'pages/page/[url]'

export default CmsPage

registerRoute('/', FullPageUi)

export const getStaticProps: GetStaticProps = async () => {
  return getCmsPageStaticProps({ params: { url: '/' } })
}
