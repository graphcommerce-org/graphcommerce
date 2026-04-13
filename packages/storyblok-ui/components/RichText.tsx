import { sxx } from '@graphcommerce/next-ui'
import {
  StoryblokRichText as StoryblokRichTextBase,
  type StoryblokRichTextNode,
} from '@storyblok/react'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import type React from 'react'
import type { StoryblokRichtextData, SxRenderer } from '../types'

const sxArr = (sxAny?: SxProps<Theme> | false) => {
  if (!sxAny) return []
  return Array.isArray(sxAny) ? sxAny : [sxAny]
}

function buildSx(sxRenderer?: SxRenderer): SxProps<Theme> {
  if (!sxRenderer) return []

  const mapping: Record<string, string> = {
    heading: '& h1, & h2, & h3, & h4, & h5, & h6',
    h1: '& h1',
    h2: '& h2',
    h3: '& h3',
    h4: '& h4',
    h5: '& h5',
    h6: '& h6',
    paragraph: '& p',
    p: '& p',
    blockquote: '& blockquote',
    ul: '& ul',
    ol: '& ol',
    li: '& li',
    a: '& a',
    img: '& img',
    strong: '& strong, & b',
    em: '& em, & i',
    code: '& code',
    pre: '& pre',
    hr: '& hr',
    table: '& table',
  }

  const entries: SxProps<Theme>[] = []

  for (const [key, sx] of Object.entries(sxRenderer)) {
    if (key === 'all' || key === 'first' || key === 'last') continue
    const selector = mapping[key]
    if (!selector || !sx) continue
    entries.push({ [selector]: sx } as SxProps<Theme>)
  }

  return [
    ...sxArr(sxRenderer.all),
    ...entries,
    ...sxArr(sxRenderer.first && ({ '& > :first-child': sxRenderer.first } as SxProps<Theme>)),
    ...sxArr(sxRenderer.last && ({ '& > :last-child': sxRenderer.last } as SxProps<Theme>)),
  ]
}

export type RichTextProps = {
  content: StoryblokRichtextData
  sx?: SxProps<Theme>
  sxRenderer?: SxRenderer
}

export function RichText({ content, sx, sxRenderer }: RichTextProps) {
  const rendererSx = buildSx(sxRenderer)

  return (
    <Box sx={sxx(rendererSx, sx)}>
      <StoryblokRichTextBase
        doc={content as unknown as StoryblokRichTextNode<React.ReactElement>}
      />
    </Box>
  )
}
