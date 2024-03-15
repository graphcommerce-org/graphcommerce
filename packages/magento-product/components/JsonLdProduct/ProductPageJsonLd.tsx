import { JsonLd } from '@graphcommerce/next-ui'
import { JsonLdProductFragment } from './JsonLdProduct.gql'

export type ProductPageJsonLdProps<T extends { '@type': string }> = {
  product: JsonLdProductFragment
  render: (product: JsonLdProductFragment) => T & { '@context': 'https://schema.org' }
}

export function ProductPageJsonLd<T extends { '@type': string }>(props: ProductPageJsonLdProps<T>) {
  const { product, render } = props
  return <JsonLd<T> item={render(product)} />
}
