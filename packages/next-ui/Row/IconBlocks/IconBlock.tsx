import { Typography, Button, SxProps, Theme, Box, ButtonProps } from '@mui/material'
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

export const IconBlock = React.forwardRef<HTMLAnchorElement & HTMLButtonElement, IconBlockProps>(
  (props, ref) => {
    const { title, children, icon, href = '#', sx = [], ...buttonProps } = props

    return (
      <Button
        ref={ref}
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
  },
)
