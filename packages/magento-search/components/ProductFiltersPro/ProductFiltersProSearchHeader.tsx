import { ProductListParams, useProductFiltersPro } from '@graphcommerce/magento-product'
import { useWatch } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/macro'
import { Box } from '@mui/material'

type ProductFiltersProSearchHeaderProps = {
  params: ProductListParams
  /**
   * Provide a text when there is no term searched
   */
  children: React.ReactNode
}

export function ProductFiltersProSearchTerm(props: ProductFiltersProSearchHeaderProps) {
  const { params, children } = props
  const { form } = useProductFiltersPro()
  const resultSearch = params.search ?? ''
  const targetSearch = useWatch({ control: form.control, name: 'search' }) ?? ''

  const remaining = targetSearch.startsWith(resultSearch)
    ? targetSearch.slice(resultSearch.length)
    : ''

  if (!resultSearch && !targetSearch) return children

  const search = (
    <>
      <Box component='span' sx={{}}>
        {resultSearch}
      </Box>
      <Box component='span' sx={{ color: 'text.disabled' }}>
        {remaining}
      </Box>
    </>
  )

  return <Trans>Results for ‘{search}’</Trans>
}
