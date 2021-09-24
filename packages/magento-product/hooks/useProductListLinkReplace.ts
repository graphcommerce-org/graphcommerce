import Router from 'next/router'
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

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Router.replace(path, path, props)
  }
}
