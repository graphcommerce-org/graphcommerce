import { ProductLinkFragment } from './ProductLink.gql'

export type ProductLinkProps = Omit<ProductLinkFragment, 'uid'>

export const productRoute = import.meta.graphCommerce.productRoute ?? '/p/'

export function productLink(link: ProductLinkProps) {
  if (import.meta.graphCommerce.legacyProductRoute) {
    const { __typename, url_key } = link

    const legacyRoute = __typename
      .split(/(?=[A-Z])/)
      .map((s) => s.toLowerCase())
      .reverse()

    if (__typename === 'SimpleProduct')
      // For Simple and Virtual products we're not navigating to a type specific page
      legacyRoute.splice(1, 1)

    return `/${legacyRoute.join('/')}/${url_key}`
  }

  return `${productRoute}${link.url_key}`
}

export function useProductLink(props: ProductLinkProps) {
  return productLink(props)
}
