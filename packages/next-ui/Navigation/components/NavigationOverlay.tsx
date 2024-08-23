import { useMotionValueValue, useMotionSelector, dvw } from '@graphcommerce/framer-utils'
import { i18n } from '@lingui/core'
import { useTheme, Box, Fab, SxProps, Theme, useEventCallback, styled } from '@mui/material'
import { m } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import type { LiteralUnion } from 'type-fest'
import { IconSvg, useIconSvgSize } from '../../IconSvg'
import { LayoutHeaderContent } from '../../Layout/components/LayoutHeaderContent'
import { LayoutTitle } from '../../Layout/components/LayoutTitle'
import { OverlaySsr } from '../../Overlay/components/OverlaySsr'
import { extendableComponent } from '../../Styles/extendableComponent'
import { useFabSize } from '../../Theme'
import { useMatchMedia } from '../../hooks'
import { iconClose, iconChevronLeft } from '../../icons'
import { useNavigation } from '../hooks/useNavigation'
import { mouseEventPref } from './NavigationItem'
import { NavigationList } from './NavigationList'
import { NavigationTitle } from './NavigationTitle'

type LayoutOverlayVariant = 'left' | 'bottom' | 'right'
type LayoutOverlaySize = 'floating' | 'minimal' | 'full'
type LayoutOverlayAlign = 'start' | 'end' | 'center' | 'stretch'
type ItemPadding = LiteralUnion<keyof Theme['spacings'], string | number>

type NavigationOverlayProps = {
  sx?: SxProps<Theme>
  stretchColumns?: boolean
  variantSm: LayoutOverlayVariant
  variantMd: LayoutOverlayVariant
  sizeSm?: LayoutOverlaySize
  sizeMd?: LayoutOverlaySize
  justifySm?: LayoutOverlayAlign
  justifyMd?: LayoutOverlayAlign
  itemWidthSm?: string
  itemWidthMd?: string
  itemPadding?: ItemPadding
} & mouseEventPref

const MotionDiv = styled(m.div)({})

const componentName = 'Navigation'
const parts = ['root', 'navigation', 'header', 'column'] as const
const { classes } = extendableComponent(componentName, parts)

export const NavigationOverlay = React.memo((props: NavigationOverlayProps) => {
  const {
    sx,
    stretchColumns,
    variantMd,
    variantSm,
    justifyMd,
    justifySm,
    sizeMd,
    sizeSm,
    itemWidthSm = dvw(100),
    itemWidthMd,
    mouseEvent,
    itemPadding = 'md',
  } = props
  const { selection, items, animating, closing, serverRenderDepth, animationDuration } =
    useNavigation()

  const fabMarginY = `calc((${useFabSize('responsive')} - ${useIconSvgSize('large')}) * -0.5)`
  const itemPad = useTheme().spacings[itemPadding] ?? itemPadding
  const matchMedia = useMatchMedia()

  const handleOnBack = useEventCallback(() => {
    if (matchMedia.down('md')) {
      const current = selection.get()
      selection.set(current !== false ? current.slice(0, -1) : false)
    } else selection.set([])
  })

  const a11yFocusRef = useRef<HTMLButtonElement | null>(null)

  const selectedLevel = useMotionValueValue(selection, (s) => (s === false ? -1 : s.length))
  const selectionValue = useMotionValueValue(selection, (s) => (s ? s.join('') : s))
  const activeAndNotClosing = useMotionSelector([selection, closing], ([s, c]) =>
    c ? false : s !== false,
  )

  useEffect(() => {
    animating.set(true)

    if (activeAndNotClosing) {
      a11yFocusRef.current?.focus()
    }
  }, [activeAndNotClosing, animating])

  const afterClose = useEventCallback(() => {
    if (!closing.get()) return
    setTimeout(() => {
      closing.set(false)
    }, animationDuration * 1000)
    selection.set(false)
  })

  const handleClose = useEventCallback(() => closing.set(true))

  if (selectedLevel === -1 && serverRenderDepth <= 0) return null

  return (
    <OverlaySsr
      className={classes.root}
      active={activeAndNotClosing}
      safeToRemove={afterClose}
      onClosed={handleClose}
      variantSm={variantSm}
      sizeSm={sizeSm}
      justifySm={justifySm}
      variantMd={variantMd}
      sizeMd={sizeMd}
      justifyMd={justifyMd}
      widthMd={false}
      widthSm={false}
      overlayPaneProps={{
        layout: true,
        layoutDependency: selectionValue,
        initial: false,
        onLayoutAnimationStart: () => {
          animating.set(true)
        },
        onLayoutAnimationComplete: () => {
          animating.set(false)
        },
      }}
      sx={{
        zIndex: 'drawer',
        '& .LayoutOverlayBase-overlayPane': {
          minWidth: itemWidthMd,
        },
      }}
    >
      <MotionDiv layout layoutDependency={selectionValue} sx={{ display: 'grid' }}>
        <Box
          className={classes.header}
          sx={(theme) => ({
            top: 0,
            position: 'sticky',
            height: { xs: theme.appShell.headerHeightSm, md: theme.appShell.appBarHeightMd },
            zIndex: 1,
          })}
        >
          <LayoutHeaderContent
            floatingMd={false}
            floatingSm={false}
            switchPoint={0}
            layout='position'
            layoutDependency={selectionValue}
            left={
              selectedLevel > 0 && (
                <Fab
                  color='inherit'
                  onClick={handleOnBack}
                  sx={{ boxShadow: 'none', my: fabMarginY }}
                  size='responsive'
                  aria-label={i18n._(/* i18n */ 'Back')}
                >
                  <IconSvg src={iconChevronLeft} size='large' aria-hidden />
                </Fab>
              )
            }
            right={
              <Fab
                disabled={!activeAndNotClosing}
                color='inherit'
                onClick={handleClose}
                sx={{ boxShadow: 'none', my: fabMarginY }}
                size='responsive'
                aria-label={i18n._(/* i18n */ 'Close')}
                ref={a11yFocusRef}
              >
                <IconSvg src={iconClose} size='large' aria-hidden />
              </Fab>
            }
          >
            <LayoutTitle size='small' component='span'>
              <NavigationTitle />
            </LayoutTitle>
          </LayoutHeaderContent>
        </Box>
      </MotionDiv>
      <MotionDiv layout='position' layoutDependency={selectionValue} sx={{ display: 'grid' }}>
        <Box
          sx={[
            (theme) => ({
              display: 'grid',
              alignItems: !stretchColumns ? 'start' : undefined,
              justifyContent: 'end',
              [theme.breakpoints.down('md')]: {
                width:
                  sizeSm !== 'floating'
                    ? itemWidthSm
                    : `calc(${itemWidthSm} - (${theme.page.horizontal} * 2))`,
                minWidth: 200,
                overflow: 'hidden',
                scrollSnapType: 'x mandatory',
                '& .NavigationItem-item': {
                  width:
                    sizeSm !== 'floating'
                      ? `calc(${itemWidthSm} - (${itemPad} * 2))`
                      : `calc(${itemWidthSm} - (${itemPad} * 2) - (${theme.page.horizontal} * 2))`,
                  minWidth: `calc(200px - (${itemPad} * 2))`,
                },
              },
              [theme.breakpoints.up('md')]: {
                '& .NavigationItem-item': {
                  width: itemWidthMd || 'stretch',
                },
              },
            }),
          ]}
        >
          <Box
            className={classes.navigation}
            sx={[
              {
                py: itemPad,
                display: 'grid',
                gridAutoFlow: 'column',
                scrollSnapAlign: 'end',
                '& > ul > li > a, & > ul > li > [role=button]': {
                  '& span': {
                    typography: 'h2',
                  },
                  // '& svg': { display: 'none' },
                },
                '& .Navigation-column': {},
                '& .NavigationItem-item': {
                  mx: itemPad,
                  whiteSpace: 'nowrap',
                },
                '& .NavigationItem-item.first': {
                  // mt: paddingMd,
                },
                '& .Navigation-column:first-of-type': {
                  boxShadow: 'none',
                },
              },
              ...(Array.isArray(sx) ? sx : [sx]),
            ]}
          >
            {selectedLevel >= 0 && (
              <Box
                sx={(theme) => ({
                  gridArea: '1 / 1 / 999 / 2',
                  boxShadow: `inset 1px 0 ${theme.vars.palette.divider}`,
                })}
                className={classes.column}
              />
            )}
            {selectedLevel >= 1 && (
              <Box
                sx={(theme) => ({
                  gridArea: '1 / 2 / 999 / 3',
                  boxShadow: `inset 1px 0 ${theme.vars.palette.divider}`,
                })}
                className={classes.column}
              />
            )}
            {selectedLevel >= 2 && (
              <Box
                sx={(theme) => ({
                  gridArea: '1 / 3 / 999 / 4',
                  boxShadow: `inset 1px 0 ${theme.vars.palette.divider}`,
                })}
                className={classes.column}
              />
            )}
            {selectedLevel >= 3 && (
              <Box
                sx={(theme) => ({
                  gridArea: '1 / 4 / 999 / 5',
                  boxShadow: `inset 1px 0 ${theme.vars.palette.divider}`,
                })}
                className={classes.column}
              />
            )}

            <NavigationList items={items} selected mouseEvent={mouseEvent} />
          </Box>
        </Box>
      </MotionDiv>
    </OverlaySsr>
  )
})

if (process.env.NODE_ENV !== 'production') {
  NavigationOverlay.displayName = 'NavigationOverlay'
}
