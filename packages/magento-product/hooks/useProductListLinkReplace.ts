import { default as Router } from 'next/router'
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

  return (params: ProductListParams) => {
    setParams(params)

    const path = createProductListLink(params)
    const singleFilterActive = Object.keys(params?.filters ?? {}).length <= 1

    // push the first filter, so the new route will be e.g. /women/fruit instead of /women
    if (singleFilterActive) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      Router.push(path, path, props)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      Router.replace(path, path, props)
    }
  }
}
