import { useRouter } from 'next/router'
import { ProductListParams } from '../components/ProductListItems/filterTypes'
import { productListLink } from './useProductListLink'
import { useProductListParamsContext } from './useProductListParamsContext'

type UseProductLinkPushProps = {
  shallow?: boolean
  locale?: string | false
  scroll?: boolean
}

/**
 * @deprecated replaced by custom function inside ProductFiltersPro
 */
export function useProductListLinkReplace(props?: UseProductLinkPushProps) {
  const { setParams } = useProductListParamsContext()
  const router = useRouter()

  return (params: ProductListParams) => {
    const queryUrl = router.query.url ?? []
    const comingFromURLWithoutFilters = !queryUrl.includes('q')

    setParams(params)

    const path = productListLink(params)

    if (router.asPath === path) return false

    // push the first filter, so the new route (on browser back) will be e.g. /women/fruit instead of /women
    if (comingFromURLWithoutFilters) return router.push(path, path, props)
    return router.replace(path, path, props)
  }
}
