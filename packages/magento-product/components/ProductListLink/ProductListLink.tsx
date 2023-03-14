import Link, { LinkProps } from '@mui/material/Link'
import PageLink, { LinkProps as PageLinkProps } from 'next/link'
import React from 'react'
import { useProductListLink } from '../../hooks/useProductListLink'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import { ProductListParams } from '../ProductListItems/filterTypes'

export type ProductListLinkProps = LinkProps &
  ProductListParams & {
    noLink?: boolean
    link?: Omit<PageLinkProps, 'href' | 'passHref'>
    children?: React.ReactNode
  }

export const ProductListLink = React.forwardRef<HTMLAnchorElement, ProductListLinkProps>(
  (props, ref) => {
    const { setParams } = useProductListParamsContext()
    const {
      children,
      url,
      sort,
      currentPage,
      pageSize,
      filters,
      search,
      noLink,
      link,
      ...linkProps
    } = props
    const newParams = { filters, sort, url, currentPage, pageSize, search }

    const productListLink = useProductListLink(newParams)
    const updateParams = () => setParams(newParams)

    // We're setting nofollow if a custom sort, pageSize, filters or search is set.
    let rel: string | undefined
    if (Object.keys(sort).length || pageSize || Object.keys(filters).length || search)
      rel = 'nofollow'

    return noLink ? (
      <PageLink href={productListLink} passHref {...link} legacyBehavior>
        {children}
      </PageLink>
    ) : (
      <Link
        href={productListLink}
        rel={rel}
        underline='hover'
        {...linkProps}
        ref={ref}
        onClick={updateParams}
      >
        {children}
      </Link>
    )
  },
)
