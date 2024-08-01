import { GcRowTypeRenderer } from '@graphcommerce/graphql-gc-api'
import { RowBlogContent } from '../../Blog'
import { RowButtonLinkList } from '../RowButtonLinkList/RowButtonLinkList'
import { RowCategory } from '../RowCategory/RowCategory'
import { RowColumnOne } from '../RowColumnOne/RowColumnOne'
import { RowColumnThree } from '../RowColumnThree/RowColumnThree'
import { RowColumnTwo } from '../RowColumnTwo/RowColumnTwo'
import { RowContentLinks } from '../RowContentLinks/RowContentLinks'
import { RowHeroBanner } from '../RowHeroBanner/RowHeroBanner'
import { RowLinks } from '../RowLinks/RowLinks'
import { RowProduct } from '../RowProduct/RowProduct'
import { RowQuote } from '../RowQuote/RowQuote'
import { RowServiceOptions } from '../RowServiceOptions/RowServiceOptions'
import { RowSpecialBanner } from '../RowSpecialBanner/RowSpecialBanner'

export const gcRowHygraphRenderer: Partial<GcRowTypeRenderer> = {
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
