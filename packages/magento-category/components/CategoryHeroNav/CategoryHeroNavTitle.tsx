import { LayoutTitle, sxx } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import { memo } from 'react'

export type CategoryHeroNavTitleProps = {
  children: React.ReactNode
  sx?: SxProps<Theme>
}

export const CategoryHeroNavTitle = memo<CategoryHeroNavTitleProps>((props) => {
  const { children, sx = [] } = props

  return (
    <LayoutTitle
      variant='h1'
      sx={sxx(
        (theme) => ({
          [theme.breakpoints.up('md')]: {
            m: 0,
            justifyContent: 'start',
          },
        }),
        sx,
      )}
    >
      {children}
    </LayoutTitle>
  )
})
