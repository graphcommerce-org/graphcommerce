import type { GcPageRowsProps, GcRowTypeRenderer } from '@graphcommerce/graphql-gc-api'
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
import { RowQuote } from '../../components/GraphCMS/RowQuote/RowQuote'
import { RowServiceOptions } from '../../components/GraphCMS/RowServiceOptions/RowServiceOptions'
import { RowSpecialBanner } from '../../components/GraphCMS/RowSpecialBanner/RowSpecialBanner'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/graphql-gc-api',
}

const gcRowHygraphRenderer: Partial<GcRowTypeRenderer> = {
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

export const GcPageRows = (props: PluginProps<GcPageRowsProps>) => {
  const { Prev, ...rest } = props
  return <Prev {...rest} rowRenderer={gcRowHygraphRenderer} />
}
