import { ListFormat, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Box, Link } from '@mui/material'
import { productListLinkFromFilter } from '../../hooks/useProductListLink'
import { useProductFiltersPro } from '../ProductFiltersPro'
import { ProductListSuggestionsFragment } from './ProductListSuggestions.gql'

type ProductListSuggestionsProps = {
  products: ProductListSuggestionsFragment
}

export function ProductListSuggestions(props: ProductListSuggestionsProps) {
  const { products } = props

  const { form, submit, params } = useProductFiltersPro()

  if (!products.suggestions || !products.suggestions.length) return null

  const list = (
    <ListFormat listStyle='short' type='disjunction'>
      {filterNonNullableKeys(products.suggestions).map((s) => (
        <Link
          href={productListLinkFromFilter({ ...params, search: s.search })}
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
