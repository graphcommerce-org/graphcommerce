import { CurrencyEnum } from '@graphcommerce/graphql-mesh'
import { ProductListItemFragment, ProductListItemProps } from '@graphcommerce/magento-product'
import { useHits } from 'react-instantsearch-hooks'
import { AlgoliaHit } from '../lib/types'

function hitToProduct(items: AlgoliaHit[]) {
  const mapHits = items.map((item) => {
    const currency = Object.keys(item.price)[0] as CurrencyEnum
    const price = item.price[currency]

    return {
      __typename: 'VirtualProduct',
      uid: '',
      small_image: {
        url: item.image_url,
      },
      sku: item.sku,
      price_range: {
        minimum_price: {
          final_price: {
            value: price.default,
            currency,
          },
          regular_price: {
            value: price.default,
            currency,
          },
        },
        maximum_price: {
          final_price: {
            value: price.default,
            currency,
          },
          regular_price: {
            value: price.default,
            currency,
          },
        },
      },
      rating_summary: item.rating_summary ?? 0,
      // url_key: item.url,
      name: item.name,
      review_count: 0,
    }
  }) satisfies
    | Array<(ProductListItemFragment & ProductListItemProps) | null | undefined>
    | null
    | undefined

  return mapHits
}

export function useAlgoliaResults() {
  const { hits } = useHits<AlgoliaHit>()
  const products = hitToProduct(hits)

  return { products }
}
