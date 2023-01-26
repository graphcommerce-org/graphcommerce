import { ProductLinkFragment } from './ProductLink.gql'

export type ProductLinkProps = Omit<ProductLinkFragment, 'uid'>

export function productLink(link: ProductLinkProps) {
  if (process.env.BUILD_FLAG_SINGLE_PRODUCT_ROUTE !== '1') {
    const { __typename, url_key } = link

    const productRoute = __typename
      .split(/(?=[A-Z])/)
      .map((s) => s.toLowerCase())
      .reverse()

    if (__typename === 'SimpleProduct')
      // For Simple and Virtual products we're not navigating to a type specific page
      productRoute.splice(1, 1)

    return `/${productRoute.join('/')}/${url_key}`
  }

  return `/p/${link.url_key}`
}

export function useProductLink(props: ProductLinkProps) {
  return productLink(props)
}
