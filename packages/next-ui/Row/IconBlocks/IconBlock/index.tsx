import { Typography, Button, SxProps, Theme, Box } from '@mui/material'
import React from 'react'
import { extendableComponent } from '../../../Styles'

export type IconBlockProps = {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  href?: string
  sx?: SxProps<Theme>
}

const name = 'IconBlock' as const
const parts = ['block', 'link', 'title'] as const
const { classes } = extendableComponent(name, parts)

export const IconBlock = React.forwardRef<HTMLAnchorElement, IconBlockProps>((props, ref) => {
  const { title, children, icon, href, sx = [] } = props

  const content = (
    <>
      {icon}
      <Typography
        variant='subtitle1'
        className={classes.title}
        sx={(theme) => ({ fontWeight: theme.typography.fontWeightBold })}
      >
        {title}
      </Typography>
      {children}
    </>
  )

  const blockSx: SxProps<Theme> = [
    (theme) => ({
      border: `1px solid ${theme.palette.divider}`,
      padding: `${theme.spacings.sm}`,
      borderRadius: '6px',
      textAlign: 'center',
      color: theme.palette.text.primary,
      '& > *': {
        display: 'grid',
        gridAutoFlow: 'row',
        justifyItems: 'center',
        gap: `${theme.spacings.xxs}`,
      },
    }),
    ...(Array.isArray(sx) ? sx : [sx]),
  ]

  if (href) {
    return (
      <Button
        href={href}
        variant='text'
        color='primary'
        className={classes.block}
        ref={ref}
        sx={blockSx}
      >
        <div>{content}</div>
      </Button>
    )
  }

  return (
    <Box className={classes.block} sx={blockSx}>
      {content}
    </Box>
  )
})
