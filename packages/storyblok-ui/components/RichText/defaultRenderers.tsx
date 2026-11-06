import { sxx } from '@graphcommerce/next-ui'
import { Box, Link, Typography } from '@mui/material'
import { StoryblokComponent } from '@storyblok/react'
import { Asset } from '../Asset'
import type { Renderers } from './types'

export const defaultRenderers: Renderers = {
  paragraph: (props) => <Typography variant='body1' gutterBottom {...props} />,
  h1: (props) => <Typography variant='h1' {...props} />,
  h2: (props) => <Typography variant='h2' {...props} />,
  h3: (props) => <Typography variant='h3' {...props} />,
  h4: (props) => <Typography variant='h4' {...props} />,
  h5: (props) => <Typography variant='h5' {...props} />,
  h6: (props) => <Typography variant='h6' {...props} />,
  blockquote: (props) => <Box component='blockquote' {...props} />,
  bullet_list: (props) => <Box component='ul' {...props} />,
  ordered_list: (props) => <Box component='ol' {...props} />,
  list_item: (props) => <Box component='li' {...props} />,
  code_block: ({ class: _class, ...props }) => (
    <Box component='pre' sx={props.sx}>
      <Box component='code'>{props.children}</Box>
    </Box>
  ),
  horizontal_rule: (props) => <Box component='hr' {...props} />,
  hard_break: () => <br />,
  image: ({ src, alt, title, sx }) => (
    <Box component='span' sx={sx}>
      <Asset asset={{ filename: src ?? null, alt: alt ?? title ?? '' }} />
    </Box>
  ),
  emoji: ({ emoji, name, fallbackImage, sx }) => {
    if (emoji) {
      return (
        <Box component='span' sx={sx}>
          {emoji}
        </Box>
      )
    }
    if (fallbackImage) {
      return <Box component='img' src={fallbackImage} alt={name ?? ''} sx={sx} />
    }
    return null
  },
  blok: ({ body, sx }) => (
    <Box sx={sx}>
      {body?.map((item) => <StoryblokComponent key={String(item._uid)} blok={item} />)}
    </Box>
  ),
  table: (props) => <Box component='table' {...props} />,
  tableRow: (props) => <Box component='tr' {...props} />,
  tableHeader: (props) => <Box component='th' {...props} />,
  tableCell: (props) => <Box component='td' {...props} />,
  bold: (props) => <Box component='strong' {...props} sx={sxx({ fontWeight: 'bold' }, props.sx)} />,
  italic: (props) => <Box component='em' {...props} sx={sxx({ fontStyle: 'italic' }, props.sx)} />,
  underline: (props) => <Box component='span' {...props} />,
  strike: (props) => (
    <Box component='s' {...props} sx={sxx({ textDecoration: 'line-through' }, props.sx)} />
  ),
  code: (props) => <Box component='code' {...props} />,
  link: ({ href, anchor, target, linktype, story, ...props }) => {
    const base =
      linktype === 'story' ? (story?.url ?? story?.full_slug ?? href ?? '') : (href ?? '')
    const finalHref = anchor ? `${base}#${anchor}` : base
    return (
      <Link
        href={finalHref}
        underline='hover'
        target={target || undefined}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        {...props}
      />
    )
  },
  anchor: ({ id, ...props }) => <Box component='span' id={id} {...props} />,
  styled: ({ class: className, ...props }) => (
    <Box component='span' className={className} {...props} />
  ),
  superscript: (props) => <Box component='sup' {...props} />,
  subscript: (props) => <Box component='sub' {...props} />,
  textStyle: ({ color, sx, ...props }) => (
    <Box component='span' sx={sxx(color ? { color } : {}, sx)} {...props} />
  ),
  highlight: ({ color, sx, ...props }) => (
    <Box component='mark' sx={sxx(color ? { backgroundColor: color } : {}, sx)} {...props} />
  ),
}
