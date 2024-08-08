import type {
  PageProduct_Product_DataFragment,
  PageProductRowsProps,
  Page_Product_DataFragment,
  PageRowsProps,
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
  PageRowFake: () => null,
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

export const PageRows = (
  props: PluginProps<PageRowsProps> & {
    renderer?: Partial<PageRowsProps['renderer']>
  },
) => {
  const { Prev, ...rest } = props
  return <Prev {...rest} renderer={renderer} />
}

const rendererProduct = { ...renderer, RowProduct: RowProductPage }

export function PageProductRows<
  P extends PageProduct_Product_DataFragment & Page_Product_DataFragment,
>(
  props: PluginProps<PageProductRowsProps<P>> & {
    renderer?: Partial<PageProductRowsProps<P>['renderer']>
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
