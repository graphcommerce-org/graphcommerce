import { Link, LinkProps } from '@material-ui/core'
import { useStoreConfigQuery } from 'generated/apollo'
import NextLink from 'next/link'
import React, { PropsWithChildren } from 'react'

export function useProductLink(props: GQLProductLinkFragment) {
  const { data: storeConfigData } = useStoreConfigQuery()
  const urlSuffix = storeConfigData?.storeConfig?.product_url_suffix

  const { canonical_url, url_key } = props
  return `/product/${canonical_url ?? url_key}${urlSuffix ?? ''}`
}

export type ProductLinkProps = PropsWithChildren<LinkProps & GQLProductLinkFragment>

const ProductLink = React.forwardRef<HTMLAnchorElement, ProductLinkProps>(function ProductLink(
  props,
  ref,
) {
  const { children, url_key, canonical_url, ...linkProps } = props
  const productLink = useProductLink({ url_key, canonical_url })

  return (
    <NextLink href='/product/[url]' as={productLink} passHref>
      <Link {...linkProps} ref={ref}>
        {children}
      </Link>
    </NextLink>
  )
})

export default ProductLink
