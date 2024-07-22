import { JsonLd } from '@graphcommerce/next-ui'
import { JsonLdProductFragment } from './JsonLdProduct.gql'

export type ProductPageJsonLdProps<
  T extends { '@type': string },
  P extends JsonLdProductFragment,
> = {
  product: P
  render: (product: P) => T & { '@context': 'https://schema.org' }
}

export function ProductPageJsonLd<T extends { '@type': string }, P extends JsonLdProductFragment>(
  props: ProductPageJsonLdProps<T, P>,
) {
  const { product, render } = props
  return <JsonLd<T> item={render(product)} keyVal='product-jsonld' />
}
