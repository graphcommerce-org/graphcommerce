import type {
  GcPageProduct_Product_DataFragment,
  GcPageProductRowsProps,
  GcPage_Product_DataFragment,
  GcPageRowsProps,
} from '@graphcommerce/graphql-gc-api'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { RowBlogContent } from '../../components'
import { RowButtonLinkList } from '../../components/GraphCMS/RowButtonLinkList/RowButtonLinkList'
import { RowCategory } from '../../components/GraphCMS/RowCategory/RowCategory'
import { RowColumnOne } from '../../components/GraphCMS/RowColumnOne/RowColumnOne'
import { RowColumnThree } from '../../components/GraphCMS/RowColumnThree/RowColumnThree'
import { RowColumnTwo } from '../../components/GraphCMS/RowColumnTwo/RowColumnTwo'
import { RowContentLinks } from '../../components/GraphCMS/RowContentLinks/RowContentLinks'
import { RowHeroBanner } from '../../components/GraphCMS/RowHeroBanner/RowHeroBanner'
import { RowLinks } from '../../components/GraphCMS/RowLinks/RowLinks'
import { RowProduct } from '../../components/GraphCMS/RowProduct/RowProduct'
import { RowProductPage } from '../../components/GraphCMS/RowProduct/RowProductPage'
import { RowQuote } from '../../components/GraphCMS/RowQuote/RowQuote'
import { RowServiceOptions } from '../../components/GraphCMS/RowServiceOptions/RowServiceOptions'
import { RowSpecialBanner } from '../../components/GraphCMS/RowSpecialBanner/RowSpecialBanner'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/graphql-gc-api',
}

const renderer = {
  GcRowFake: () => null,
  RowColumnOne,
  RowColumnTwo,
  RowColumnThree,
  RowHeroBanner,
  RowSpecialBanner,
  RowQuote,
  RowBlogContent,
  RowButtonLinkList,
  RowServiceOptions,
  RowContentLinks,
  RowProduct,
  RowLinks,
  RowCategory,
}

export const GcPageRows = (
  props: PluginProps<GcPageRowsProps> & {
    renderer?: Partial<GcPageRowsProps['renderer']>
  },
) => {
  const { Prev, ...rest } = props
  return <Prev {...rest} renderer={renderer} />
}

const rendererProduct = { ...renderer, RowProduct: RowProductPage }

export function GcPageProductRows<
  P extends GcPageProduct_Product_DataFragment & GcPage_Product_DataFragment,
>(
  props: PluginProps<GcPageProductRowsProps<P>> & {
    renderer?: Partial<GcPageProductRowsProps<P>['renderer']>
  },
) {
  const { Prev, page, product, ...rest } = props

  const newPage = page && {
    ...page,
    rows: page?.rows?.map((row) =>
      row?.__typename === 'RowProduct' && !row.product ? { ...row, product } : row,
    ),
  }

  return <Prev {...rest} page={newPage} product={product} renderer={rendererProduct} />
}
