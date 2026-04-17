import type { ApolloClient } from '@graphcommerce/graphql'
import {
  ProductListDocument,
  type ProductListItemsFragment,
} from '@graphcommerce/magento-product'
import type { SbBlokData } from '@storyblok/react'

type RowProductBlok = SbBlokData & {
  component: 'row_product'
  magento_product_skus?: string
  magento_category_id?: string
  items?: ProductListItemsFragment['items']
}

function findRowProductBloks(bloks: SbBlokData[]): RowProductBlok[] {
  const results: RowProductBlok[] = []
  for (const blok of bloks) {
    if (blok.component === 'row_product') {
      results.push(blok as RowProductBlok)
    }
    for (const value of Object.values(blok)) {
      if (Array.isArray(value) && value.length > 0 && value[0]?._uid) {
        results.push(...findRowProductBloks(value as SbBlokData[]))
      }
    }
  }
  return results
}

/** Mutates row_product bloks in-place, attaching fetched product `items` directly onto each blok. */
export async function resolveStoryblokProducts(
  body: SbBlokData[] | undefined,
  staticClient: ApolloClient,
) {
  if (!body) return

  const bloks = findRowProductBloks(body)
  if (bloks.length === 0) return

  const skusByBlok = new Map<RowProductBlok, string[]>()
  const allSkus = new Set<string>()

  const categoryByBlok = new Map<RowProductBlok, string>()
  const allCategoryIds = new Set<string>()

  for (const blok of bloks) {
    const skus = blok.magento_product_skus
      ?.split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    if (skus?.length) {
      skusByBlok.set(blok, skus)
      skus.forEach((sku) => allSkus.add(sku))
    } else if (blok.magento_category_id) {
      categoryByBlok.set(blok, blok.magento_category_id)
      allCategoryIds.add(blok.magento_category_id)
    }
  }

  const skuItemsMap = new Map<string, NonNullable<ProductListItemsFragment['items']>[number]>()
  if (allSkus.size > 0) {
    const { data } = await staticClient.query({
      query: ProductListDocument,
      variables: { onlyItems: true, filters: { sku: { in: [...allSkus] } } },
    })
    for (const item of data?.products?.items ?? []) {
      if (item?.sku) skuItemsMap.set(item.sku, item)
    }
  }

  const categoryItemsMap = new Map<string, ProductListItemsFragment['items']>()
  await Promise.all(
    [...allCategoryIds].map(async (categoryId) => {
      const { data } = await staticClient.query({
        query: ProductListDocument,
        variables: { onlyItems: true, filters: { category_uid: { eq: categoryId } } },
      })
      categoryItemsMap.set(categoryId, data?.products?.items ?? [])
    }),
  )

  for (const [blok, skus] of skusByBlok) {
    blok.items = skus
      .map((sku) => skuItemsMap.get(sku))
      .filter((item): item is NonNullable<typeof item> => item != null)
  }
  for (const [blok, categoryId] of categoryByBlok) {
    blok.items = categoryItemsMap.get(categoryId) ?? []
  }
}
