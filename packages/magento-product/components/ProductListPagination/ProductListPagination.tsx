import { productListPaginationVariant } from '@graphcommerce/next-config/config'
import type { LinkProps } from '@graphcommerce/next-ui'
import { NextLink, Pagination, PaginationExtended } from '@graphcommerce/next-ui'
import type { PaginationProps } from '@mui/material'
import { Link } from '@mui/material'
import { useRouter } from 'next/router'
import { productListLink } from '../../hooks/useProductListLink'
import { useProductFiltersPro } from '../ProductFiltersPro/ProductFiltersPro'
import type { ProductListParams } from '../ProductListItems/filterTypes'
import { toFilterParams } from '../ProductListItems/filterTypes'
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
  const router = useRouter()
  const handleSubmit = useProductFiltersPro(true)?.handleSubmit

  if (!page_info || !page_info.total_pages || !page_info.current_page) return null

  // Loads the products before the URL changes, so the page scrolls to the loaded products.
  const onNavigate = (page: number | null): LinkProps['onNavigate'] =>
    handleSubmit &&
    ((e) => {
      e.preventDefault()
      const path = `${productListLink({ ...params, currentPage: page })}${page === 1 ? '' : '#products'}`
      void handleSubmit({ ...toFilterParams(params), currentPage: page ?? 1 }, async (shallow) => {
        await router.push(path, path, { shallow, scroll: true })
      })
    })

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
              href={`${productListLink({ ...params, currentPage: btnProps.page })}${suffix}`}
              component={NextLink}
              shallow
              onNavigate={onNavigate(btnProps.page)}
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
          `${productListLink({ ...params, currentPage: page })}${page === 1 ? '' : '#products'}`
        }
        onNavigate={({ page }) => onNavigate(page)}
        {...paginationProps}
      />
    )
  }

  return null
}
