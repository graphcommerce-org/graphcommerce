import { ProductLinkFragment } from './ProductLink.gql'

export type ProductLinkProps = Omit<ProductLinkFragment, 'uid'>

/** @deprecated Use `/p/${link.url_key}`instead */
export function productLink(link: ProductLinkProps) {
  return `/p/${link.url_key}`
}

/** @deprecated Use `/p/${link.url_key}`instead */
export function useProductLink(props: ProductLinkProps) {
  return productLink(props)
}
