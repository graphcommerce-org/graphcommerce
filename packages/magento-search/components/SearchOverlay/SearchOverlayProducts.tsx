import { ProductListItems } from '@graphcommerce/magento-graphcms/components/ProductListItems/ProductListItems'
import { productListLink } from '@graphcommerce/magento-product'
import { SectionContainer } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Link } from '@mui/material'
import { useSearchOverlay } from './SearchOverlayProvider'

export function SearchOverlayProducts() {
  const { params, products } = useSearchOverlay()

  const term = params.search
  const noResult = products?.total_count === 0

  return (
    <>
      {noResult && (
        <SectionContainer labelLeft={<>Products</>}>
          <Trans>We couldn’t find any results for ‘{term}’</Trans>
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
        >
          <ProductListItems
            {...products}
            loadingEager={6}
            title={params.search ? `Search ${params.search}` : ''}
            columns={(theme) => ({
              xs: { count: 2 },
              md: { count: 3, totalWidth: theme.breakpoints.values.md.toString() },
              lg: { count: 3, totalWidth: theme.breakpoints.values.md.toString() },
            })}
          />
        </SectionContainer>
      )}
    </>
  )
}
