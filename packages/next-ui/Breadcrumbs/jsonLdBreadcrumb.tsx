import type { BreadcrumbsType } from './types'

export function jsonLdBreadcrumb(
  breadcrumbs: BreadcrumbsType['breadcrumbs'],
  baseUrl?: string | null,
) {
  const itemBaseUrl = baseUrl?.endsWith('/') ? baseUrl?.substring(0, baseUrl.length - 1) : baseUrl

  return {
    '@type': 'BreadcrumbList',
    itemListElement:
      breadcrumbs?.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        name: breadcrumb?.children,
        position: index + 1,
        item: `${itemBaseUrl}/${breadcrumb?.href?.startsWith('/') ? breadcrumb?.href?.substring(1, breadcrumb?.href.length) : breadcrumb?.href}`,
      })) ?? [],
  }
}
