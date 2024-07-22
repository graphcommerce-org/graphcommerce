import { JsonLd } from '../JsonLd/JsonLd'
import type { BreadcrumbsType } from './types'

type BreadcrumbsJsonLdProps<T extends { '@type': string }> = BreadcrumbsType & {
  render: (breadcrumbs: BreadcrumbsType['breadcrumbs']) => T & { '@context': 'https://schema.org' }
}

export function BreadcrumbsJsonLd<T extends { '@type': string }>(props: BreadcrumbsJsonLdProps<T>) {
  const { render, breadcrumbs } = props

  if (!breadcrumbs.length) return null
  return <JsonLd<T> item={render(breadcrumbs)} keyVal='breadcrumb-jsonld' />
}
