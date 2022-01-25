import { Scroller, ScrollerButton, ScrollerProvider } from '@graphcommerce/framer-scroller'
import { Box, BoxProps } from '@mui/material'
import React from 'react'
import { extendableComponent } from '../Styles/extendableComponent'
import { SvgIcon, SvgIconProps } from '../SvgIcon/SvgIcon'
import { iconChevronLeft, iconChevronRight } from '../icons'

export type MenuTabsProps = {
  children: React.ReactNode
  iconLeft?: SvgIconProps['src']
  iconRight?: SvgIconProps['src']
} & Pick<BoxProps, 'sx'>

const { componentName, classes, selectors } = extendableComponent('DesktopNavBar', [
  'scroller',
  'leftWrapper',
  'rightWrapper',
  'left',
  'right',
] as const)

export function DesktopNavBar(props: MenuTabsProps) {
  const { children, iconLeft, iconRight, sx = [] } = props

  return (
    <ScrollerProvider scrollSnapAlign='none'>
      <Box
        className={componentName}
        sx={[
          {
            width: '100%',
            display: { xs: 'none', md: 'grid' },
            alignItems: 'center',
            position: 'relative',
            pointerEvents: 'all',
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Scroller
          hideScrollbar
          sx={(theme) => ({
            gridArea: `1 / 1 / 1 / 4`,
            columnGap: theme.spacings.md,
            padding: `0 ${theme.spacings.sm}`,
            gridAutoColumns: 'min-content',
          })}
          className={classes.scroller}
        >
          {children}
        </Scroller>

        <Box
          sx={{
            gridArea: `1 / 1 / 1 / 2`,
            pointerEvents: 'none',
            '& > *': { pointerEvents: 'all' },
          }}
          className={classes.leftWrapper}
        >
          <ScrollerButton
            sx={{
              pointerEvents: 'all',
              boxShadow: 'none',
              height: 48,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              backgroundColor: 'transparent',
              backgroundImage: (theme) =>
                `linear-gradient(to left, rgba(255,255,255,0) 0%, ${theme.palette.background.default} 35%)`,
            }}
            direction='left'
            size='small'
            className={classes.left}
          >
            <SvgIcon src={iconLeft ?? iconChevronLeft} />
          </ScrollerButton>
        </Box>

        <Box
          sx={{
            gridArea: `1 / 3 / 1 / 4`,
            pointerEvents: 'none',
            '& > *': {
              pointerEvents: 'all',
            },
          }}
          className={classes.rightWrapper}
        >
          <ScrollerButton
            sx={{
              pointerEvents: 'all',
              boxShadow: 'none',
              height: 48,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              backgroundColor: 'transparent',
              backgroundImage: (theme) =>
                `linear-gradient(to right, rgba(255,255,255,0) 0%, ${theme.palette.background.default} 35%)`,
            }}
            direction='right'
            size='small'
            className={classes.right}
          >
            <SvgIcon src={iconRight ?? iconChevronRight} />
          </ScrollerButton>
        </Box>
      </Box>
    </ScrollerProvider>
  )
}
DesktopNavBar.selectors = selectors
