import { bannerAggregator } from './ContentTypes/Banner/bannerAggregator'
import { blockAggregator } from './ContentTypes/Block/blockAggregator'
import { buttonItemAggregator } from './ContentTypes/ButtonItem/buttonItemAggregator'
import { buttonsAggregator } from './ContentTypes/Buttons/buttonsAggregator'
import { columnAggregator } from './ContentTypes/Column/columnAggregator'
import { columnGroupAggregator } from './ContentTypes/ColumnGroup/columnGroupAggregator'
import { columnLineAggregator } from './ContentTypes/ColumnLine/columnLineAggregator'
import { dividerAggregator } from './ContentTypes/Divider/dividerAggregator'
import { headingAggregator } from './ContentTypes/Heading/headingAggregator'
import { htmlAggregator } from './ContentTypes/Html/htmlAggregator'
import { imageAggregator } from './ContentTypes/Image/imageAggregator'
import { productsAggregator } from './ContentTypes/Products/productsAggregator'
import { rowAggregator } from './ContentTypes/Row/rowAggregator'
import { sliderAggregator } from './ContentTypes/Slider/sliderAggregator'
import { tabItemAggregator } from './ContentTypes/TabItem/tabItemAggregator'
import { tabsAggregator } from './ContentTypes/Tabs/tabsAggregator'
import { textAggregator } from './ContentTypes/Text/textAggregator'
import { videoAggregator } from './ContentTypes/Video/videoAggregator'
import { ParseProps } from './types'

type ContentTypes =
  | 'row'
  | 'column'
  | 'column-group'
  | 'banner'
  | 'block'
  | 'button-item'
  | 'buttons'
  | 'divider'
  | 'heading'
  | 'html'
  | 'image'
  | 'slider'
  | 'slide'
  | 'tab-item'
  | 'tabs'
  | 'text'
  | 'video'
  | 'dynamic_block'

export const contentTypes = {
  row: rowAggregator,
  column: columnAggregator,
  'column-line': columnLineAggregator,
  'column-group': columnGroupAggregator,
  image: imageAggregator,
  heading: headingAggregator,
  text: textAggregator,
  tabs: tabsAggregator,
  'tab-item': tabItemAggregator,
  buttons: buttonsAggregator,
  'button-item': buttonItemAggregator,
  block: blockAggregator,
  // dynamic_block,
  products: productsAggregator,
  html: htmlAggregator,
  divider: dividerAggregator,
  video: videoAggregator,
  // map,
  banner: bannerAggregator,
  slider: sliderAggregator,
  slide: bannerAggregator,
}

export type ContentTypeKeys = keyof typeof contentTypes

export function getContentType(name: ContentTypeKeys): ParseProps | undefined {
  return contentTypes[name] as ParseProps | undefined
}
