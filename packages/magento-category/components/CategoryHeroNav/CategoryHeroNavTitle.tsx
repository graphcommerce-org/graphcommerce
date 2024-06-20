import { LayoutTitle } from '@graphcommerce/next-ui'
import { SxProps, Theme } from '@mui/material'
import React from 'react'

type CategoryHeroNavTitleProps = {
  children: React.ReactNode
  sx?: SxProps<Theme>
}

export function CategoryHeroNavTitle(props: CategoryHeroNavTitleProps) {
  const { children, sx = [] } = props

  return (
    <LayoutTitle
      variant='h1'
      sx={[
        (theme) => ({
          [theme.breakpoints.up('md')]: {
            m: 0,
            justifyContent: 'start',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </LayoutTitle>
  )
}
