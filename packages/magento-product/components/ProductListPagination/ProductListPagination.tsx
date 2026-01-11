import { productListPaginationVariant } from '@graphcommerce/next-config/config'
import { NextLink, Pagination, PaginationExtended } from '@graphcommerce/next-ui'
import type { PaginationProps } from '@mui/material'
import { Link } from '@mui/material'
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname()

  // Extract the store/locale prefix from the current pathname (e.g., '/en' from '/en/c/women')
  const pathSegments = pathname.split('/')
  const storePrefix = pathSegments[1] ? `/${pathSegments[1]}` : ''

  if (!page_info || !page_info.total_pages || !page_info.current_page) return null

  if (productListPaginationVariant !== 'EXTENDED') {
    return (
      <Pagination
        count={page_info?.total_pages}
        page={page_info?.current_page ?? 1}
        renderLink={(_, icon, btnProps) => {
          const suffix = btnProps.page === 1 ? '' : '#products'
          return (
            <Link
              {...btnProps}
              href={`${storePrefix}${productListLink({ ...params, currentPage: btnProps.page })}${suffix}`}
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

  if (productListPaginationVariant === 'EXTENDED') {
    return (
      <PaginationExtended
        count={page_info?.total_pages}
        page={page_info?.current_page ?? 1}
        paginationHref={({ page }) =>
          `${storePrefix}${productListLink({ ...params, currentPage: page })}${page === 1 ? '' : '#products'}`
        }
        {...paginationProps}
      />
    )
  }

  return null
}
