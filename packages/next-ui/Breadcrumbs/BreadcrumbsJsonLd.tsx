import { JsonLd } from '../JsonLd/JsonLd'
import { BreadcrumbsProps } from './types'

type BreadcrumbsJsonLdProps<T extends { '@type': string }> = BreadcrumbsProps & {
  render: (breadcrumbs: BreadcrumbsProps['breadcrumbs']) => T & { '@context': 'https://schema.org' }
}

export function BreadcrumbsJsonLd<T extends { '@type': string }>(props: BreadcrumbsJsonLdProps<T>) {
  const { render, breadcrumbs } = props
  return <JsonLd<T> item={render(breadcrumbs)} keyVal='breadcrumb-jsonld' />
}
