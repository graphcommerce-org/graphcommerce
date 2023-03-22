import { ProductInterface } from '@graphcommerce/graphql-mesh'
import { ProductListItemFragment, ProductListItemProps } from '@graphcommerce/magento-product'
import { useStorefrontConfig } from '@graphcommerce/next-ui'
import type { Hit } from 'react-instantsearch-core'
import { useHits } from 'react-instantsearch-hooks-web'
import { AlgoliaHit } from '../lib/types'

function hitToProduct(items: Hit<AlgoliaHit>[], locale: string) {
  const currency = locale.toUpperCase()
  const mapHits = items.map((item) => {
    const price = item.price['EUR']
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
            currency: 'EUR',
          },
          regular_price: {
            value: price.default,
            currency: 'EUR',
          },
        },
        maximum_price: {
          final_price: {
            value: price.default,
            currency: 'EUR',
          },
          regular_price: {
            value: price.default,
            currency: 'EUR',
          },
        },
      },
      rating_summary: item.rating_summary,
      url_key: item.url,
      name: item.name,
      review_count: 0,
    }
  }) as
    | Array<(ProductListItemFragment & ProductListItemProps) | null | undefined>
    | null
    | undefined

  return mapHits
}

export function useAlgoliaResults() {
  const { hits } = useHits<AlgoliaHit>()
  const { locale } = useStorefrontConfig()
  const products = hitToProduct(hits, locale)

  return { products }
}
