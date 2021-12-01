import { useRouter } from 'next/router'
import { ProductListParams } from '../components/ProductListItems/filterTypes'
import { createProductListLink } from './useProductListLink'
import { useProductListParamsContext } from './useProductListParamsContext'

type UseProductLinkPushProps = {
  shallow?: boolean
  locale?: string | false
  scroll?: boolean
}

export function useProductListLinkReplace(props?: UseProductLinkPushProps) {
  const { setParams } = useProductListParamsContext()
  const router = useRouter()

  return (params: ProductListParams) => {
    const queryUrl = router.query.url ?? []
    const comingFromURLWithoutFilters = !queryUrl.includes('q')

    setParams(params)

    const path = createProductListLink(params)

    // push the first filter, so the new route (on browser back) will be e.g. /women/fruit instead of /women
    if (comingFromURLWithoutFilters) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(path, path, props)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.replace(path, path, props)
    }
  }
}
