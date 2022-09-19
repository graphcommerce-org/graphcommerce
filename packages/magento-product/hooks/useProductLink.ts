import { ProductLinkFragment } from './ProductLink.gql'

export type ProductLinkProps = Omit<ProductLinkFragment, 'uid'>

export function productLink(link: ProductLinkProps) {
  return `/p/${link.url_key}`
}

export function useProductLink(props: ProductLinkProps) {
  return productLink(props)
}
