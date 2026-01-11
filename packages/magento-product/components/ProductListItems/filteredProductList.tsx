// eslint-disable-next-line import/no-extraneous-dependencies
import { equal } from '@wry/equality'
import { usePathname } from 'next/navigation'
import { extractUrlQuery, parseParams } from './filteredProductListServer'
import type { ProductListParams } from './filterTypes'
import type { FilterTypes } from './getFilterTypes'

export { parseParams, extractUrlQuery }

export function useRouterFilterParams(props: {
  filterTypes?: FilterTypes | undefined
  params?: ProductListParams
}) {
  const { filterTypes, params } = props
  const pathname = usePathname()

  // Strip the store/locale prefix first (e.g., '/en/c/women' → '/c/women' or '/en/women' → '/women')
  // Then strip the '/c/' prefix if present
  const segments = pathname.split('/')
  // segments[0] is empty string (before first /), segments[1] is store, rest is the path
  const pathWithoutStore = `/${segments.slice(2).join('/')}`
  const path = pathWithoutStore.startsWith('/c/')
    ? pathWithoutStore.slice(3)
    : pathWithoutStore.slice(1)

  const [url, query] = extractUrlQuery({ url: path.split('#')[0].split('/') })
  if (!url || !query || !filterTypes) return { params, shallow: false }

  const searchParam = url.startsWith('search') ? decodeURI(url.split('/')[1] ?? '') : null
  const clientParams = parseParams(url, query, filterTypes, searchParam)

  if (clientParams && !clientParams?.filters.category_uid && params?.filters.category_uid)
    clientParams.filters.category_uid = params?.filters.category_uid

  return { params: clientParams, shallow: !equal(params, clientParams) }
}
