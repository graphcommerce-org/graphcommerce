import { productRoute } from '@graphcommerce/next-config/config'
import type { ProductLinkFragment } from './ProductLink.gql'

export type ProductLinkProps = Omit<ProductLinkFragment, 'uid'>

const productRouteVal = productRoute ?? '/p/'

export function productPath(urlKey: string) {
  return `${productRouteVal}${urlKey}`
}

export function productLink(link: ProductLinkProps) {
  return `${productRouteVal}${link.url_key}`
}

export function useProductLink(props: ProductLinkProps) {
  return productLink(props)
}
