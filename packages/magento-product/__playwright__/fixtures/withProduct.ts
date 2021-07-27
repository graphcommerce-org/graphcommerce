/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { gql } from '@apollo/client'
import { test as base } from '@reachdigital/graphql/__playwright__/fixtures/testGraphQl'
import { productLink } from '../../ProductLink'

type ProductUrls = {
  all: string[]
} & Record<
  | 'BundleProduct'
  | 'ConfigurableProduct'
  | 'DownloadableProduct'
  | 'SimpleProduct'
  | 'VirtualProduct'
  | 'GroupedProduct',
  string
>

const test = base.extend<{ productURL: ProductUrls }>({
  productURL: async ({ apolloClient, baseURL }, use) => {
    const query = await apolloClient.query({
      query: gql`
        query ProductStaticPaths($currentPage: Int!, $pageSize: Int!) {
          products(filter: {}, pageSize: $pageSize, currentPage: $currentPage) {
            page_info {
              current_page
              total_pages
            }
            total_count
            items {
              __typename
              uid
              url_key
            }
          }
        }
      `,
      variables: { currentPage: 1, pageSize: 1000 },
    })

    const productUrls: Partial<Omit<ProductUrls, 'all'>> = {}
    const urls = (query.data.products?.items ?? []).map((p) => {
      productUrls[`${p?.__typename}`] = `${baseURL}${productLink(p)}`
      return `${baseURL}${productLink(p)}`
    })

    await use({ all: urls, ...productUrls } as ProductUrls)
  },
})

export { test }
