import type { ProductImage } from '@graphcommerce/graphql-mesh'
import type { Product } from 'schema-dts'
import type { JsonLdProductFragment } from './JsonLdProduct.gql'
import type { JsonLdProductOfferFragment } from './JsonLdProductOffer.gql'

export function jsonLdProduct(props: JsonLdProductFragment): Product {
  const { name, sku, media_gallery, categories, description } = props

  return {
    '@type': 'Product',
    name: name ?? undefined,
    sku: sku ?? undefined,
    image: media_gallery
      ? media_gallery?.map((img) => (img as ProductImage)?.url ?? '')
      : undefined,
    category: categories?.[0]?.name ?? undefined,
    description: description?.html
      ? (description.html ?? '').replace(/(<([^>]+)>)/gi, '')
      : undefined,
  }
}

/** @see https://developers.google.com/search/docs/advanced/structured-data/product */
export function jsonLdProductOffer(props: JsonLdProductOfferFragment): Pick<Product, 'offers'> {
  const { price_range } = props

  return {
    offers: {
      '@type': 'AggregateOffer',
      itemCondition: 'https://schema.org/NewCondition',
      offerCount: 1,
      priceCurrency: price_range.minimum_price.regular_price.currency ?? undefined,
      highPrice: price_range?.minimum_price?.regular_price.value ?? undefined,
      lowPrice: price_range.minimum_price.final_price.value ?? undefined,
    },
  }
}
