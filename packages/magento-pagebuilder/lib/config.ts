import { buttonItem } from './ContentTypes/ButtonItem'
import { buttons } from './ContentTypes/Buttons'
import { column } from './ContentTypes/Column'
import { columnGroup } from './ContentTypes/ColumnGroup'
import { divider } from './ContentTypes/Divider'
import { heading } from './ContentTypes/Heading'
import { html } from './ContentTypes/Html'
import { image } from './ContentTypes/Image'
import { row } from './ContentTypes/Row'
import { tabItem } from './ContentTypes/TabItem'
import { tabs } from './ContentTypes/Tabs'
import { text } from './ContentTypes/Text/index'
import { video } from './ContentTypes/Video'

const contentTypesConfig = {
  row,
  column,
  'column-group': columnGroup,
  image,
  heading,
  text,
  tabs,
  'tab-item': tabItem,
  buttons,
  'button-item': buttonItem,
  // block,
  // dynamic_block,
  // products,
  html,
  divider,
  video,
  // map,
  // banner,
  // slider,
  // // Slide is just a banner wrapped inside a slider
  // slide,
}

/** Retrieve a content types configuration */
export function getContentTypeConfig(contentType: string) {
  return contentTypesConfig?.[contentType]
}

/** Set content types configuration with new one */
export function setContentTypeConfig(contentType: string, config) {
  contentTypesConfig[contentType] = config
}
