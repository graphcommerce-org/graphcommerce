import { ProductPaginationProps } from '@graphcommerce/magento-product'
import { Pagination } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { usePagination } from 'react-instantsearch-hooks-web'

export function AlgoliaPagination({
  page_info,
  params,
  ...paginationProps
}: ProductPaginationProps) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { nbPages, refine, currentRefinement } = usePagination()

  const handlePagination = (destinationPage: number) => {
    refine(destinationPage - 1)
  }

  return (
    <Pagination
      count={nbPages ?? 0}
      page={currentRefinement + 1}
      renderLink={(page, icon, btnProps) => (
        <Box {...btnProps} onClick={() => handlePagination(page)} sx={{ color: 'inherit' }}>
          {icon}
        </Box>
      )}
      {...paginationProps}
    />
  )
}
