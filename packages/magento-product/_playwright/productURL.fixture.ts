/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { test as base } from '@reachdigital/graphql/_playwright/apolloClient.fixture'
import { productLink } from '../ProductLink'
import { ProductStaticPathsDocument } from '../ProductStaticPaths/ProductStaticPaths.gql'
import { ProductTypenames } from '../ProductStaticPaths/getProductStaticPaths'

type ProductUrls = {
  all: string[]
} & Record<`${ProductTypenames}`, string>

const test = base.extend<{ productURL: ProductUrls }>({
  productURL: async ({ apolloClient, baseURL }, use) => {
    const query = await apolloClient.query({
      query: ProductStaticPathsDocument,
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
