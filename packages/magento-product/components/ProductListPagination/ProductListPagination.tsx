import { Pagination } from '@graphcommerce/next-ui'
import { PaginationProps } from '@mui/material'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import { ProductListLink } from '../ProductListLink/ProductListLink'
import { ProductListPaginationFragment } from './ProductListPagination.gql'

export type ProductPaginationProps = ProductListPaginationFragment &
  Omit<PaginationProps, 'count' | 'defaultPage' | 'page' | 'renderItem'>

export function ProductListPagination({ page_info, ...paginationProps }: ProductPaginationProps) {
  const { params } = useProductListParamsContext()

  if (!page_info || !page_info.total_pages || !page_info.current_page) return null

  return (
    <Pagination
      count={page_info?.total_pages}
      page={page_info?.current_page ?? 1}
      renderLink={(_, icon, btnProps) => (
        <ProductListLink {...btnProps} {...params} currentPage={btnProps.page} color='inherit'>
          {icon}
        </ProductListLink>
      )}
      {...paginationProps}
    />
  )
}
