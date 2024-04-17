import { JsonLd } from '../JsonLd/JsonLd'
import type { BreadcrumbsType } from './types'

type BreadcrumbsJsonLdProps<T extends { '@type': string }> = BreadcrumbsType & {
  render: (
    breadcrumbs: BreadcrumbsType['breadcrumbs'],
    baseUrl?: string | null,
  ) => T & { '@context': 'https://schema.org' }
}

export function BreadcrumbsJsonLd<T extends { '@type': string }>(props: BreadcrumbsJsonLdProps<T>) {
  const { render, breadcrumbs, baseUrl } = props

  return <JsonLd<T> item={render(breadcrumbs, baseUrl)} keyVal='breadcrumb-jsonld' />
}
