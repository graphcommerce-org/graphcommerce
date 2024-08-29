import {
  ProductListItemRenderer,
  ProductListItemsBase,
  productListLink,
} from '@graphcommerce/magento-product'
import { SectionContainer } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { useMenuItem } from '@mui/base/useMenuItem'
import { Link } from '@mui/material'
import { ComponentProps, useMemo, useRef } from 'react'
import type { Entries } from 'type-fest'
import { useSearchOverlay } from './SearchOverlayProvider'

type SearchOverlayProductsProps = {
  productListRenderer: ProductListItemRenderer
}

function withUseMenu<T extends keyof ProductListItemRenderer>(
  renderer: ProductListItemRenderer[T],
) {
  return (props: ComponentProps<ProductListItemRenderer[T]>) => {
    const rootRef = useRef<HTMLDivElement>(null)
    const { getRootProps } = useMenuItem({ rootRef })

    const Component = renderer as React.ComponentType<
      ComponentProps<ProductListItemRenderer[keyof ProductListItemRenderer]>
    >
    return <Component {...props} slotProps={{ root: getRootProps() }} />
  }
}

function useRendererWithMenu(productListRenderer: ProductListItemRenderer) {
  return useMemo(() => {
    const entries = Object.entries(productListRenderer) as Entries<typeof productListRenderer>
    return Object.fromEntries(
      entries.map(([key, renderer]) => [key, withUseMenu(renderer)]),
    ) as typeof productListRenderer
  }, [productListRenderer])
}

export function SearchOverlayProducts({ productListRenderer }: SearchOverlayProductsProps) {
  const rendererWithMenu = useRendererWithMenu(productListRenderer)

  const { params, products } = useSearchOverlay()

  const term = params.search
  const noResult = products?.total_count === 0

  return (
    <>
      {noResult && (
        <SectionContainer labelLeft={<>Products</>}>
          <Trans>We couldn&apos;t find any results for &apos;{term}&apos;</Trans>
        </SectionContainer>
      )}

      {params.search && products?.items && products.items.length > 0 && (
        <SectionContainer
          labelLeft={<>Products</>}
          labelRight={
            <Link
              color='secondary'
              underline='hover'
              href={productListLink({ ...params, pageSize: null })}
            >
              View all ({products.total_count})
            </Link>
          }
          sx={(theme) => ({ pb: theme.spacing(2) })}
        >
          <ProductListItemsBase
            renderers={rendererWithMenu}
            loadingEager={6}
            title={params.search ? `Search ${params.search}` : ''}
            columns={(theme) => ({
              xs: { count: 2 },
              md: { count: 3, totalWidth: theme.breakpoints.values.md.toString() },
              lg: { count: 3, totalWidth: theme.breakpoints.values.md.toString() },
            })}
            items={products.items}
          />
        </SectionContainer>
      )}
    </>
  )
}
