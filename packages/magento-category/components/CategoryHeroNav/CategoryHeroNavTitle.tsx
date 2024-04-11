import { LayoutTitle } from '@graphcommerce/next-ui'
import { SxProps, Theme } from '@mui/material'
import { memo } from 'react'

type CategoryHeroNavTitleProps = {
  children: React.ReactNode
  sx?: SxProps<Theme>
}

export const CategoryHeroNavTitle = memo<CategoryHeroNavTitleProps>((props) => {
  const { children, sx = [] } = props

  return (
    <LayoutTitle
      variant='h1'
      sx={[
        (theme) => ({
          justifyContent: 'center',
          [theme.breakpoints.up('md')]: {
            margin: 0,
            alignItems: 'start',
            justifyContent: 'end',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </LayoutTitle>
  )
})
