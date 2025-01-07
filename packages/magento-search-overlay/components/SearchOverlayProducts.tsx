import type { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { ProductListItemsBase, productListLink } from '@graphcommerce/magento-product'
import { SectionContainer } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import type { SxProps, Theme } from '@mui/material'
import { Link } from '@mui/material'
import { useRouter } from 'next/router'
import type { ComponentProps } from 'react'
import { useEffect, useMemo, useRef } from 'react'
import type { Entries } from 'type-fest'
import { searchOverlayIsOpen, useSearchItem, useSearchOverlay } from './SearchOverlayProvider'
import { SearchPlaceholder } from './SearchPlaceholder'

type SearchOverlayProductsProps = {
  productListRenderer: ProductListItemRenderer
}

function withUseMenu<T extends keyof ProductListItemRenderer>(
  renderer: ProductListItemRenderer[T],
) {
  return (props: ComponentProps<ProductListItemRenderer[T]>) => {
    const rootRef = useRef<HTMLDivElement>(null)
    const { getRootProps } = useSearchItem({ rootRef })

    const Component = renderer as React.ComponentType<
      ComponentProps<ProductListItemRenderer[keyof ProductListItemRenderer]>
    >

    const root = getRootProps()
    const sx: SxProps<Theme> = [
      root.selected &&
        ((theme) => ({
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: '7px',
        })),
    ]

    return <Component {...props} slotProps={{ root: { ...root, sx } }} />
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

  const { events } = useRouter()
  const closeOverlay = () => searchOverlayIsOpen.set(false)

  useEffect(() => {
    events.on('routeChangeStart', closeOverlay)

    return () => {
      events.off('routeChangeStart', closeOverlay)
    }
  }, [events, products?.total_count])

  return (
    <>
      {!params.search && <SearchPlaceholder />}
      {noResult && (
        <SectionContainer labelLeft={<Trans id='Products'>Products</Trans>}>
          <Trans>We couldn’t find any results for ‘{term}’</Trans>
        </SectionContainer>
      )}

      {params.search && products?.items && products.items.length > 0 && (
        <SectionContainer
          labelLeft={<Trans id='Products'>Products</Trans>}
          labelRight={
            <Link
              color='secondary'
              underline='hover'
              href={productListLink({ ...params, pageSize: null })}
              onClick={() => searchOverlayIsOpen.set(false)}
            >
              <Trans>View all</Trans> ({products.total_count})
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
              md: { count: 4, totalWidth: theme.breakpoints.values.md.toString() },
              lg: { count: 4, totalWidth: theme.breakpoints.values.lg.toString() },
            })}
            items={products.items}
          />
        </SectionContainer>
      )}
    </>
  )
}
