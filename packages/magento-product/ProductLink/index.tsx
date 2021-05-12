import { useQuery } from '@apollo/client'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import { ProductLinkFragment } from './ProductLink.gql'

export function productLink(link: ProductLinkFragment) {
  const { __typename, url_key } = link
  const productRoute = __typename
    .split(/(?=[A-Z])/)
    .map((s) => s.toLowerCase())
    .reverse()

  // For Simple and Virtual products we're not navigating to a type specific page
  if (__typename === 'SimpleProduct') productRoute.splice(1, 1)

  return `/${productRoute.join('/')}/${url_key}`
}

export function useProductLink(props: ProductLinkFragment) {
  const { data: storeConfigData } = useQuery(StoreConfigDocument)
  return productLink(props)
}
