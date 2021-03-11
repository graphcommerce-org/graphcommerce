import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import FullPageUi from '../../components/AppShell/FullPageUi'
import BlogPage, { getStaticProps } from './page/[page]'

export default BlogPage

registerRouteUi('/blog', FullPageUi)

export { getStaticProps }
