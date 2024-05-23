import { ProductLinkFragment } from './ProductLink.gql'

export type ProductLinkProps = Omit<ProductLinkFragment, 'uid'>

export const productRoute = import.meta.graphCommerce.productRoute ?? '/p/'

export function productLink(link: ProductLinkProps) {
  return `${productRoute}${link.url_key}`
}

export function useProductLink(props: ProductLinkProps) {
  return productLink(props)
}
