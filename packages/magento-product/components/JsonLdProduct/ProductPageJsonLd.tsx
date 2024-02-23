import { JsonLd } from '@graphcommerce/next-ui'
import { JsonLdProductFragment } from './JsonLdProduct.gql'

export function ProductPageJsonLd<
  T extends { '@type': string },
  P extends JsonLdProductFragment,
>(props: { product: P; render: (product: P) => T & { '@context': 'https://schema.org' } }) {
  const { product, render } = props
  return <JsonLd<T> item={render(product)} />
}
