import Router from 'next/router'
import { ProductListParams } from '../components/ProductListItems/filterTypes'
import { createCategoryLink } from './useProductListLink'
import { useProductListParamsContext } from './useProductListParamsContext'

type UseProductLinkPushProps = {
  shallow?: boolean
  locale?: string | false
  scroll?: boolean
}

export function useProductListLinkPush(props?: UseProductLinkPushProps) {
  const { setParams } = useProductListParamsContext()

  return (params: ProductListParams) => {
    setParams(params)

    const path = createCategoryLink(params)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Router.push(path, path, props)
  }
}
