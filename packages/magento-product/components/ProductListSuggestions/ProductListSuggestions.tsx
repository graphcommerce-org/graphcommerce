import { filterNonNullableKeys, ListFormat } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import { Box, Link } from '@mui/material'
import { usePathname } from 'next/navigation'
import { productListLinkFromFilter } from '../../hooks/useProductListLink'
import { useProductFiltersPro } from '../ProductFiltersPro'
import type { ProductListSuggestionsFragment } from './ProductListSuggestions.gql'

export type ProductListSuggestionsProps = {
  products: ProductListSuggestionsFragment
}

export function ProductListSuggestions(props: ProductListSuggestionsProps) {
  const { products } = props
  const pathname = usePathname()

  const { form, submit, params } = useProductFiltersPro()

  // Extract the store/locale prefix from the current pathname
  const pathSegments = pathname.split('/')
  const storePrefix = pathSegments[1] ? `/${pathSegments[1]}` : ''

  if (!products.suggestions || !products.suggestions.length) return null

  const list = (
    <ListFormat listStyle='short' type='disjunction'>
      {filterNonNullableKeys(products.suggestions).map((s) => (
        <Link
          key={s.search}
          href={`${storePrefix}${productListLinkFromFilter({ ...params, search: s.search })}`}
          onClick={() => {
            form.setValue('currentPage', 1)
            form.setValue('search', s.search)
            return submit()
          }}
        >
          {s.search}
        </Link>
      ))}
    </ListFormat>
  )

  return (
    <Box>
      <Trans>Did you mean: {list}</Trans>
    </Box>
  )
}
