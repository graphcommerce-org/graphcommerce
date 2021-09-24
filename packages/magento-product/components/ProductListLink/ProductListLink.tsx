import { Link, LinkProps } from '@material-ui/core'
import PageLink, { LinkProps as PageLinkProps } from 'next/link'
import React, { PropsWithChildren } from 'react'
import { useProductListLink } from '../../hooks/useProductListLink'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import { ProductListParams } from '../ProductListItems/filterTypes'

export type ProductListLinkProps = PropsWithChildren<
  LinkProps &
    ProductListParams & {
      noLink?: boolean
      link?: Omit<PageLinkProps, 'href' | 'passHref'>
    }
>

const ProductListLink = React.forwardRef<HTMLAnchorElement, ProductListLinkProps>((props, ref) => {
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

  return (
    <PageLink href={productListLink} passHref {...link}>
      {noLink ? (
        children
      ) : (
        <Link rel={rel} {...linkProps} ref={ref} onClick={updateParams}>
          {children}
        </Link>
      )}
    </PageLink>
  )
})

export default ProductListLink
