import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { SxProps, Theme } from '@mui/material/styles'
import React from 'react'
import { extendableComponent } from '../../Styles'

export type IconBlockProps = {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  href?: string
  sx?: SxProps<Theme>
} & ButtonProps

const name = 'IconBlock' as const
const parts = ['block', 'link', 'title'] as const
const { classes } = extendableComponent(name, parts)

export const IconBlock = React.forwardRef<HTMLAnchorElement, IconBlockProps>((props, ref) => {
  const { title, children, icon, href = '#', sx = [], ...buttonProps } = props

  return (
    <Button
      href={href}
      variant='outlined'
      color='primary'
      className={classes.block}
      {...buttonProps}
      sx={[
        (theme) => ({
          padding: `${theme.spacings.sm}`,
          textAlign: 'center',
          '& > *': {
            display: 'grid',
            gridAutoFlow: 'row',
            justifyItems: 'center',
            gap: `${theme.spacings.xxs}`,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box>
        {icon}
        <Typography variant='subtitle1' className={classes.title} component='span'>
          {title}
        </Typography>
        {children}
      </Box>
    </Button>
  )
})
