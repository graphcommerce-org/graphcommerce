import { NextLink, PaginationExtended, Pagination } from '@graphcommerce/next-ui'
import type { PaginationProps } from '@mui/material'
import { Link } from '@mui/material'
import { productListLink } from '../../hooks/useProductListLink'
import type { ProductListParams } from '../ProductListItems/filterTypes'
import type { ProductListPaginationFragment } from './ProductListPagination.gql'

export type ProductPaginationProps = ProductListPaginationFragment &
  Omit<PaginationProps, 'count' | 'defaultPage' | 'page' | 'renderItem'> & {
    params: ProductListParams
  }

export function ProductListPagination({
  page_info,
  params,
  ...paginationProps
}: ProductPaginationProps) {
  if (!page_info || !page_info.total_pages || !page_info.current_page) return null

  if (import.meta.graphCommerce.layout?.productListPaginationVariant !== 'EXTENDED') {
    return (
      <Pagination
        count={page_info?.total_pages}
        page={page_info?.current_page ?? 1}
        renderLink={(_, icon, btnProps) => {
          const suffix = btnProps.page === 1 ? '' : '#products'
          return (
            <Link
              {...btnProps}
              href={`${productListLink({ ...params, currentPage: btnProps.page })}${suffix}`}
              component={NextLink}
              shallow
              color='inherit'
            >
              {icon}
            </Link>
          )
        }}
        {...paginationProps}
      />
    )
  }

  if (import.meta.graphCommerce.layout?.productListPaginationVariant === 'EXTENDED') {
    return (
      <PaginationExtended
        count={page_info?.total_pages}
        page={page_info?.current_page ?? 1}
        paginationHref={({ page }) =>
          `${productListLink({ ...params, currentPage: page })}${page === 1 ? '' : '#products'}`
        }
        {...paginationProps}
      />
    )
  }

  return null
}
