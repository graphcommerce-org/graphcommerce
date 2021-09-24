import { usePageContext } from '@graphcommerce/framer-next-pages'

export default function PageDepthDebug() {
  const { depth } = usePageContext()

  return <>{depth}</>
}
