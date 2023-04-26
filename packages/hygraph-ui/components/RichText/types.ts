import { SxProps, Theme } from '@mui/material'
import type { LiteralUnion } from 'type-fest'

type BaseElementTypes =
  | 'heading-one'
  | 'heading-two'
  | 'heading-three'
  | 'heading-four'
  | 'heading-five'
  | 'heading-six'
  | 'paragraph'
  | 'numbered-list'
  | 'bulleted-list'
  | 'block-quote'
  | 'paragraph'
  | 'list-item'
  | 'list-item-child'
  | 'table'
  | 'table_head'
  | 'table_header_cell'
  | 'table_body'
  | 'table_row'
  | 'table_cell'
  | 'code'
  | 'bold'
  | 'italic'
  | 'underlined'

export type SimpleElement = {
  children: ElementOrTextNode[]
  type: LiteralUnion<BaseElementTypes, string>
}

export type TextNode = {
  text: string
  bold?: true
  italic?: true
  underlined?: true
  [key: string]: unknown
}

type LinkElement = {
  type: 'link'
  children: ElementOrTextNode[]
  href: string
  openInNewTab?: boolean
}

type ImageElement = {
  type: 'image'
  children: ElementOrTextNode[]
  src: string
  title: string
  width: number
  height: number
  mimeType: string
}

type VideoElement = {
  type: 'image'
  children: ElementOrTextNode[]
  src: string
  title: string
  width: number
  height: number
  mimeType: string
}

type IframeElement = {
  type: 'iframe'
  children: ElementOrTextNode[]
  url: string
  width?: number
  height?: number
}

export type ElementNode = SimpleElement | LinkElement | ImageElement | VideoElement | IframeElement
export type ElementOrTextNode = ElementNode | TextNode

type RendererBase = { sx?: SxProps<Theme>; children?: React.ReactNode }
export type Renderer<P extends ElementNode> = (
  props: Omit<P, 'children' | 'type'> & RendererBase,
) => React.ReactElement | null

export type Renderers = {
  [k in BaseElementTypes]: Renderer<SimpleElement>
} & {
  link: Renderer<LinkElement>
  image: Renderer<ImageElement>
  video: Renderer<VideoElement>
  iframe: Renderer<IframeElement>
}

export type SxRenderer = {
  [k in keyof Renderers | 'all' | 'first' | 'last']?: SxProps<Theme>
}

export type AdditionalProps = {
  renderers: Renderers
  sxRenderer: SxRenderer
  first?: boolean
  last?: boolean
}
