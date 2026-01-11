import { usePathname, useRouter } from 'next/navigation'
import type { ProductListParams } from '../components/ProductListItems/filterTypes'
import { productListLink } from './useProductListLink'
import { useProductListParamsContext } from './useProductListParamsContext'

type UseProductLinkPushProps = {
  shallow?: boolean
  locale?: string | false
  scroll?: boolean
}

/** @deprecated Replaced by custom function inside ProductFiltersPro */
export function useProductListLinkReplace(props?: UseProductLinkPushProps) {
  const { setParams } = useProductListParamsContext()
  const router = useRouter()
  const pathname = usePathname()

  return (params: ProductListParams) => {
    const comingFromURLWithoutFilters = !pathname.includes('/q/')

    setParams(params)

    const path = productListLink(params)

    if (pathname === path) return false

    // push the first filter, so the new route (on browser back) will be e.g. /women/fruit instead of /women
    if (comingFromURLWithoutFilters) {
      router.push(path, { scroll: props?.scroll })
      return true
    }
    router.replace(path, { scroll: props?.scroll })
    return true
  }
}
