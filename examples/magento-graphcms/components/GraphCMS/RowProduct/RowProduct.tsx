import { InContextMaskProvider, useInContextQuery } from '@graphcommerce/graphql'
import { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { Box } from '@mui/material'
import { productListRenderer } from '../../ProductListItems'
import { GetMagentoRowProductDocument } from './GetMagentoRowProduct.gql'
import { RowProductFragment } from './RowProduct.gql'
import { Backstory, Feature, FeatureBoxed, Related, Reviews, Specs, Upsells } from './variant'

type VariantRenderer = Record<
  NonNullable<RowProductFragment['variant']>,
  React.FC<RowProductFragment & { productListItemRenderer: ProductListItemRenderer }>
>

type RowProductProps = RowProductFragment & {
  renderer?: Partial<VariantRenderer>
} & { sku?: string | null | undefined }

function Migrate(props: RowProductFragment) {
  const { variant, identity } = props
  return (
    <Box sx={{ bgcolor: 'error.main', p: 3 }}>
      NOT FOUND: Please migrate `{identity}` with variant {variant} to a RowCategory component
    </Box>
  )
}

const defaultRenderer: Partial<VariantRenderer> = {
  Specs,
  Backstory,
  Feature,
  FeatureBoxed,
  Related,
  Reviews,
  Upsells,
  Grid: Migrate,
  Swipeable: Migrate,
}

export function RowProduct(props: RowProductProps) {
  const { renderer, variant, product } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as VariantRenderer

  const scoped = useInContextQuery(
    GetMagentoRowProductDocument,
    { variables: { urlKey: product?.url_key ?? '' }, skip: !product?.url_key },
    { products: { items: [product!] } },
  )

  if (!variant) return null

  const RenderType =
    mergedRenderer?.[variant] ??
    (() => {
      if (process.env.NODE_ENV !== 'production') return <>renderer for {variant} not found</>
      return null
    })

  return (
    <InContextMaskProvider mask={scoped.mask}>
      <RenderType
        {...props}
        productListItemRenderer={productListRenderer}
        product={scoped.data.products?.items?.[0]}
      />
    </InContextMaskProvider>
  )
}
