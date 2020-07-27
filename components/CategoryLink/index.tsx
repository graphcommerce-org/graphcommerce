import React, { PropsWithChildren } from 'react'
import { LinkProps, Link } from '@material-ui/core'
import NextLink from 'next/link'
import Router from 'next/router'
import { useProductListParamsContext } from 'components/CategoryPage/CategoryPageContext'
import {
  ProductListParams,
  isFilterTypeEqual,
  isFilterTypeMatch,
  isFilterTypeRange,
} from '../ProductListItems/filterTypes'

export type CategoryLinkProps = PropsWithChildren<LinkProps & ProductListParams>

export function createRoute(props: ProductListParams): string {
  const { url, sort, currentPage, filters } = props

  // base url path generation
  let href = ``

  if (currentPage && currentPage > 1) href += `/page/${currentPage}`

  // todo(paales): How should the URL look like with multiple sorts?
  // Something like: /sort/position,price/dir/asc,asc
  const [sortBy] = Object.keys(sort)
  if (sort && sortBy) href += `/sort/${sortBy}`
  if (sort && sortBy && sort[sortBy] && sort[sortBy] === 'DESC') href += `/dir/desc`

  // Apply filters
  if (filters)
    Object.entries(filters).forEach(([param, value]) => {
      if (value && isFilterTypeEqual(value) && value.in?.length)
        href += `/${param}/${value.in?.join(',')}`
      if (value && isFilterTypeMatch(value)) href += `/${param}/${value.match}`
      if (value && isFilterTypeRange(value))
        href += `/${param}/${value.from ?? '*'}-${value.to ?? '*'}`
    })

  href = `/${url}${href && `/q${href}`}`
  return href
}

const CategoryLink = React.forwardRef<HTMLAnchorElement, CategoryLinkProps>((props, ref) => {
  const { setParams } = useProductListParamsContext()
  // const { data: storeConfigData } = useStoreConfigQuery()

  // storeConfigData?.storeConfig.category_url_suffix

  const { children, url, sort, currentPage, pageSize, filters, search, ...linkProps } = props

  const updateParams = () => setParams({ filters, sort, url, currentPage, pageSize, search })

  return (
    <NextLink href='/[...url]' as={createRoute(props)} passHref>
      <Link rel='nofollow' {...linkProps} ref={ref} onClick={updateParams}>
        {children}
      </Link>
    </NextLink>
  )
})

export default CategoryLink

export const useCategoryPushRoute = () => {
  const { setParams } = useProductListParamsContext()

  return (params: ProductListParams) => {
    setParams(params)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Router.push('/[...url]', createRoute(params))
  }
}
