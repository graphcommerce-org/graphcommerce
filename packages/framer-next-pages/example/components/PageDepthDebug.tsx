import { usePageContext } from '@reachdigital/framer-next-pages'

export default function PageDepthDebug() {
  const { depth } = usePageContext()

  return <>{depth}</>
}
