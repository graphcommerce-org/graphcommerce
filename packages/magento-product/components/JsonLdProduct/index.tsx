import { ProductImage } from '@reachdigital/graphql'
import { Product } from 'schema-dts'
import { JsonLdProductFragment } from './JsonLdProduct.gql'
import { JsonLdProductOfferFragment } from './JsonLdProductOffer.gql'

export function jsonLdProduct(props: JsonLdProductFragment): Product {
  const { name, sku, media_gallery, categories, description, url_key } = props

  return {
    '@type': 'Product',
    name: name ?? undefined,
    sku: sku ?? undefined,
    image: media_gallery
      ? media_gallery?.map((img) => (img as ProductImage)?.url ?? '')
      : undefined,
    category: categories?.[0]?.name ?? undefined,
    identifier: url_key ?? undefined,
    description: description?.html
      ? (description.html ?? '').replace(/(<([^>]+)>)/gi, '')
      : undefined,
  }
}

export function jsonLdProductOffer(props: JsonLdProductOfferFragment): Partial<Product> {
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
