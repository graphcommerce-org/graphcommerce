import type { SxProps, Theme } from '@mui/material'
import type { ReactElement, ReactNode } from 'react'

export type RichTextBlockType =
  | 'paragraph'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'blockquote'
  | 'bullet_list'
  | 'ordered_list'
  | 'list_item'
  | 'code_block'
  | 'horizontal_rule'
  | 'hard_break'
  | 'image'
  | 'emoji'
  | 'blok'
  | 'table'
  | 'tableRow'
  | 'tableHeader'
  | 'tableCell'

export type RichTextMarkType =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strike'
  | 'code'
  | 'link'
  | 'anchor'
  | 'styled'
  | 'superscript'
  | 'subscript'
  | 'textStyle'
  | 'highlight'

export type RichTextNodeType = RichTextBlockType | RichTextMarkType

type RendererBase = { sx?: SxProps<Theme>; children?: ReactNode }

export type LinkAttrs = {
  href?: string
  target?: string
  anchor?: string
  uuid?: string
  linktype?: 'url' | 'story' | 'email' | 'asset'
  story?: { url?: string; full_slug?: string }
}

export type ImageAttrs = {
  src?: string
  alt?: string
  title?: string
  copyright?: string
}

export type EmojiAttrs = { name?: string; emoji?: string; fallbackImage?: string }

export type CodeBlockAttrs = { class?: string }

export type StyledAttrs = { class?: string }

export type TextStyleAttrs = { color?: string }

export type HighlightAttrs = { color?: string }

export type AnchorAttrs = { id?: string }

export type BlokAttrs = {
  id?: string
  body?: { component?: string; _uid?: string; [k: string]: unknown }[]
}

export type Renderer<Attrs = Record<string, never>> = (
  props: RendererBase & Attrs,
) => ReactElement | null

export type Renderers = {
  paragraph: Renderer
  h1: Renderer
  h2: Renderer
  h3: Renderer
  h4: Renderer
  h5: Renderer
  h6: Renderer
  blockquote: Renderer
  bullet_list: Renderer
  ordered_list: Renderer
  list_item: Renderer
  code_block: Renderer<CodeBlockAttrs>
  horizontal_rule: Renderer
  hard_break: Renderer
  image: Renderer<ImageAttrs>
  emoji: Renderer<EmojiAttrs>
  blok: Renderer<BlokAttrs>
  table: Renderer
  tableRow: Renderer
  tableHeader: Renderer
  tableCell: Renderer
  bold: Renderer
  italic: Renderer
  underline: Renderer
  strike: Renderer
  code: Renderer
  link: Renderer<LinkAttrs>
  anchor: Renderer<AnchorAttrs>
  styled: Renderer<StyledAttrs>
  superscript: Renderer
  subscript: Renderer
  textStyle: Renderer<TextStyleAttrs>
  highlight: Renderer<HighlightAttrs>
}

export type SxRenderer = {
  [k in RichTextNodeType | 'all' | 'first' | 'last']?: SxProps<Theme>
}

export type AdditionalProps = {
  renderers: Renderers
  sxRenderer: SxRenderer
  first?: boolean
  last?: boolean
}
