import type React from 'react'
import { Banner } from './ContentTypes/Banner/Banner'
import { Block } from './ContentTypes/Block/Block'
import { ButtonItem } from './ContentTypes/ButtonItem/ButtonItem'
import { Buttons } from './ContentTypes/Buttons/Buttons'
import { Column } from './ContentTypes/Column/Column'
import { ColumnGroup } from './ContentTypes/ColumnGroup/ColumnGroup'
import { Divider } from './ContentTypes/Divider/Divider'
import { Heading } from './ContentTypes/Heading/Heading'
import { Html } from './ContentTypes/Html/Html'
import { Image } from './ContentTypes/Image/Image'
import { RootContainer } from './ContentTypes/RootContainer/RootContainer'
import { Row } from './ContentTypes/Row/Row'
import { Slider } from './ContentTypes/Slider/Slider'
import { TabItem } from './ContentTypes/TabItem/TabItem'
import { Tabs } from './ContentTypes/Tabs/Tabs'
import { Text } from './ContentTypes/Text/Text'
import { Video } from './ContentTypes/Video/Video'
import { OnlyChildren } from './components/Pagebuilder/OnlyChildren'
import type { ContentTypeConfig, GetRenderComponent } from './types'

const renderTypes = {
  'root-container': RootContainer,
  row: Row,
  column: Column,
  'column-group': ColumnGroup,
  image: Image,
  heading: Heading,
  text: Text,
  tabs: Tabs,
  'tab-item': TabItem,
  buttons: Buttons,
  'button-item': ButtonItem,
  block: Block,
  // dynamic_block,
  // products,
  html: Html,
  divider: Divider,
  video: Video,
  // map,
  banner: Banner,
  slider: Slider,
  slide: Banner,
}

export type RenderTypeKeys = keyof typeof renderTypes

/** Retrieve a content types configuration */
export const getComponentByType: GetRenderComponent = (contentType: string) =>
  renderTypes[contentType] ?? OnlyChildren

/** Set content types configuration with new one */
export function setRenderType(contentType: string, config: React.FC<ContentTypeConfig>) {
  renderTypes[contentType] = config
}
