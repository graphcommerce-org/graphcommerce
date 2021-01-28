import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import BlogPage, { getStaticProps } from './page/[page]'

export default BlogPage

registerRouteUi('/blog', FullPageUi)

export { getStaticProps }
