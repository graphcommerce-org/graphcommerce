import { usePageDepth } from '@reachdigital/framer-next-pages'

export default function PageDepthDebug() {
  const depth = usePageDepth()

  return <>{depth}</>
}
