import { useQuery } from '@apollo/client'
import { Link, LinkProps } from '@material-ui/core'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.graphql'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import React, { PropsWithChildren } from 'react'
import { ProductLinkFragment } from './ProductLink.graphql'

export function useProductLink(props: ProductLinkFragment & { canonical?: boolean }) {
  const { data: storeConfigData } = useQuery(StoreConfigDocument)
  const { canonical_url, url_key, canonical = false } = props

  const base = canonical ? storeConfigData?.storeConfig?.base_link_url : '/'
  return `${base}product/${canonical_url ?? url_key}`
}

export type ProductLinkProps = PropsWithChildren<LinkProps & ProductLinkFragment>

const ProductLink = React.forwardRef<HTMLAnchorElement, ProductLinkProps>(function ProductLink(
  props,
  ref,
) {
  const { children, url_key, canonical_url, ...linkProps } = props
  const productLink = useProductLink({ url_key, canonical_url })

  return (
    <PageLink href={productLink}>
      <Link {...linkProps} ref={ref}>
        {children}
      </Link>
    </PageLink>
  )
})

export default ProductLink
