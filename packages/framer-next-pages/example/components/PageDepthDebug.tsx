import { usePageContext } from '@graphcommerce/framer-next-pages'

export function PageDepthDebug() {
  const { depth } = usePageContext()
  return <>{depth}</>
}
