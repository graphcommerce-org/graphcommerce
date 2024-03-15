import { JsonLd } from '../JsonLd/JsonLd'
import { BreadcrumbsProps } from './types'

type BreadcrumbsJsonLdProps<T extends { '@type': string }> = BreadcrumbsProps & {
  render: (
    breadcrumbs: BreadcrumbsProps['breadcrumbs'],
    baseUrl?: string | null,
  ) => T & { '@context': 'https://schema.org' }
}

export function BreadcrumbsJsonLd<T extends { '@type': string }>(props: BreadcrumbsJsonLdProps<T>) {
  const { render, breadcrumbs, baseUrl } = props

  return <JsonLd<T> item={render(breadcrumbs, baseUrl)} keyVal='breadcrumb-jsonld' />
}
