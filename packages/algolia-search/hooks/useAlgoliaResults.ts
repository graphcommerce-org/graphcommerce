import { useQuery } from '@graphcommerce/graphql'
import { CurrencyEnum } from '@graphcommerce/graphql-mesh'
import { ProductListItemFragment, ProductListItemProps } from '@graphcommerce/magento-product'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { useHits } from 'react-instantsearch-hooks'
import { AlgoliaHit } from '../lib/types'

function hitsToProduct(items: AlgoliaHit[], currency?: string | null) {
  const mapHits = items.map((item) => {
    const currentCurrency = (currency ?? Object.keys(item.price)[0]) as CurrencyEnum
    const price = item.price[currentCurrency]
    const productUrlSplit = item.url.split('/')
    const productUrl = productUrlSplit[productUrlSplit.length - 1]
    const url_key = productUrl.substring(0, productUrl.length - 5)

    return {
      __typename: 'SimpleProduct',
      uid: item.objectID,
      small_image: {
        url: item.image_url,
      },
      sku: item.sku,
      price_range: {
        minimum_price: {
          final_price: {
            value: price.default,
            currency: currentCurrency,
          },
          regular_price: {
            value: price.default,
            currency: currentCurrency,
          },
        },
      },
      rating_summary: item.rating_summary ?? 0,
      url_key,
      name: item.name,
    }
  }) satisfies
    | Array<(ProductListItemFragment & ProductListItemProps) | null | undefined>
    | null
    | undefined

  return mapHits
}

export function useAlgoliaResults() {
  const { hits } = useHits<AlgoliaHit>()
  const { data } = useQuery(StoreConfigDocument)
  const products = hitsToProduct(hits, data?.storeConfig?.base_currency_code)

  return { products }
}
