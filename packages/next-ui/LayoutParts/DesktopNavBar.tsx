import { Scroller, ScrollerButton, ScrollerProvider } from '@graphcommerce/framer-scroller'
import { sxx } from '@graphcommerce/next-ui'
import type { BoxProps } from '@mui/material'
import React from 'react'
import { iconChevronLeft, iconChevronRight } from '../icons'
import type { IconSvgProps } from '../IconSvg'
import { IconSvg } from '../IconSvg'
import { MediaQuery } from '../MediaQuery'
import { extendableComponent } from '../Styles/extendableComponent'

export type MenuTabsProps = {
  children: React.ReactNode
  iconLeft?: IconSvgProps['src']
  iconRight?: IconSvgProps['src']
} & Pick<BoxProps, 'sx'>

const { classes, selectors } = extendableComponent('DesktopNavBar', [
  'root',
  'scroller',
  'button',
  'left',
  'right',
] as const)

export function DesktopNavBar(props: MenuTabsProps) {
  const { children, iconLeft, iconRight, sx = [] } = props

  return (
    <MediaQuery
      component='span'
      query={(theme) => theme.breakpoints.up('md')}
      display='grid'
      className={classes.root}
      sx={sxx(
        {
          width: '100%',
          alignItems: 'center',
          position: 'relative',
          pointerEvents: 'all',
          gridTemplateColumns: 'auto 1fr auto',
        },
        sx,
      )}
    >
      <ScrollerProvider scrollSnapAlign='none'>
        <Scroller
          hideScrollbar
          sx={(theme) => ({
            gridArea: '1 / 1 / 1 / 4',
            columnGap: theme.spacings.md,
            padding: `0 ${theme.spacings.md}`,
            gridAutoColumns: 'min-content',
          })}
          className={classes.scroller}
        >
          {children}
        </Scroller>

        <ScrollerButton
          sxContainer={{
            gridArea: '1 / 1 / 1 / 2',
            pointerEvents: 'none',
            '& > *': { pointerEvents: 'all' },
          }}
          sx={(theme) => ({
            pointerEvents: 'all',
            boxShadow: 'none',
            height: 48,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            backgroundColor: 'transparent',
            backgroundImage: `linear-gradient(to left, rgba(255,255,255,0) 0%, ${theme.vars.palette.background.default} 35%)`,
          })}
          direction='left'
          size='small'
          tabIndex={-1}
          className={`${classes.left} ${classes.button}`}
        >
          <IconSvg src={iconLeft ?? iconChevronLeft} />
        </ScrollerButton>

        <ScrollerButton
          sxContainer={{
            gridArea: '1 / 3 / 1 / 4',
            pointerEvents: 'none',
            '& > *': {
              pointerEvents: 'all',
            },
          }}
          sx={(theme) => ({
            pointerEvents: 'all',
            boxShadow: 'none',
            height: 48,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: 'transparent',
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0) 0%, ${theme.vars.palette.background.default} 35%)`,
          })}
          direction='right'
          size='small'
          tabIndex={-1}
          className={`${classes.right} ${classes.button}`}
        >
          <IconSvg src={iconRight ?? iconChevronRight} />
        </ScrollerButton>
      </ScrollerProvider>
    </MediaQuery>
  )
}
DesktopNavBar.selectors = selectors
