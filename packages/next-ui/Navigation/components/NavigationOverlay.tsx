import styled from '@emotion/styled'
import { useMotionValueValue, useMotionSelector } from '@graphcommerce/framer-utils'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Fab, SxProps, Theme, useEventCallback, useMediaQuery, useTheme } from '@mui/material'
import { m, useMotionValue } from 'framer-motion'
import React, { startTransition, useEffect, useRef, useState } from 'react'
import { IconSvg, useIconSvgSize } from '../../IconSvg'
import { LayoutHeaderContent } from '../../Layout/components/LayoutHeaderContent'
import { LayoutTitle } from '../../Layout/components/LayoutTitle'
import { Overlay } from '../../Overlay/components/Overlay'
import { extendableComponent } from '../../Styles/extendableComponent'
import { useFabSize } from '../../Theme'
import { iconClose, iconChevronLeft } from '../../icons'
import {
  isNavigationButton,
  isNavigationComponent,
  NavigationContextType,
  NavigationNodeButton,
  NavigationNodeHref,
  NavigationPath,
  useNavigation,
} from '../hooks/useNavigation'
import { mouseEventPref } from './NavigationItem'
import { NavigationList } from './NavigationList'

type LayoutOverlayVariant = 'left' | 'bottom' | 'right'
type LayoutOverlaySize = 'floating' | 'minimal' | 'full'
type LayoutOverlayAlign = 'start' | 'end' | 'center' | 'stretch'
type ItemPadding = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number

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

function findCurrent(
  items: NavigationContextType['items'],
  selected: NavigationPath | false,
): NavigationNodeHref | NavigationNodeButton | undefined {
  if (selected === false) return undefined
  const lastItem = selected.slice(-1)[0]

  if (!lastItem) return undefined

  for (const item of items) {
    // eslint-disable-next-line no-continue
    if (isNavigationComponent(item)) continue

    // If the item is the current one, return it
    if (item.id === lastItem) return item

    // Recursively find item
    if (isNavigationButton(item)) return findCurrent(item.childItems, selected)
  }
  return undefined
}

const MotionDiv = styled(m.div)()

const componentName = 'Navigation'
const parts = ['root', 'navigation', 'header', 'column'] as const
const { classes } = extendableComponent(componentName, parts)

export const NavigationOverlay = React.memo<NavigationOverlayProps>((props) => {
  const {
    sx,
    stretchColumns,
    variantMd,
    variantSm,
    justifyMd,
    justifySm,
    sizeMd,
    sizeSm,
    itemWidthSm,
    itemWidthMd,
    mouseEvent,
    itemPadding,
  } = props
  const { selection, items, animating, closing } = useNavigation()

  const fabSize = useFabSize('responsive')
  const svgSize = useIconSvgSize('large')

  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'))
  const handleOnBack = useEventCallback(() => {
    if (isMobile) {
      const current = selection.get()
      selection.set(current !== false ? current.slice(0, -1) : false)
    } else selection.set([])
  })

  const selectedLevel = useMotionValueValue(selection, (s) => (s === false ? -1 : s.length))
  const activeAndNotClosing = useMotionSelector([selection, closing], ([s, c]) =>
    c ? false : s !== false,
  )

  useEffect(() => {
    animating.set(false)
  }, [activeAndNotClosing, animating])

  const afterClose = useEventCallback(() => {
    if (!closing.get()) return
    closing.set(false)
    selection.set(false)
  })

  const handleClose = useEventCallback(() => closing.set(true))

  const theme2 = useTheme()
  let paddingMd
  if (typeof itemPadding === 'number') {
    paddingMd = itemPadding
  }
  if (typeof itemPadding === 'string') {
    paddingMd = theme2.spacings[itemPadding]
  }
  if (itemPadding === undefined) {
    paddingMd = theme2.spacings.md
  }

  return (
    <Overlay
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
      overlayPaneProps={{
        layout: true,
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
          minWidth: 'auto !important',
          width: 'max-content',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
        },
      }}
    >
      <MotionDiv layout style={{ display: 'grid' }}>
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
            left={
              selectedLevel > 0 && (
                <Fab
                  color='inherit'
                  onClick={handleOnBack}
                  sx={{
                    boxShadow: 'none',
                    marginLeft: `calc((${fabSize} - ${svgSize}) * -0.5)`,
                    marginRight: `calc((${fabSize} - ${svgSize}) * -0.5)`,
                  }}
                  size='responsive'
                  aria-label={i18n._(/* i18n */ 'Back')}
                >
                  <IconSvg src={iconChevronLeft} size='large' aria-hidden />
                </Fab>
              )
            }
            right={
              <Fab
                color='inherit'
                onClick={handleClose}
                sx={{
                  boxShadow: 'none',
                  marginLeft: `calc((${fabSize} - ${svgSize}) * -0.5)`,
                  marginRight: `calc((${fabSize} - ${svgSize}) * -0.5)`,
                }}
                size='responsive'
                aria-label={i18n._(/* i18n */ 'Close')}
              >
                <IconSvg src={iconClose} size='large' aria-hidden />
              </Fab>
            }
          >
            <LayoutTitle size='small' component='span'>
              {findCurrent(items, selection.get())?.name ?? <Trans id='Menu' />}
            </LayoutTitle>
          </LayoutHeaderContent>
        </Box>
      </MotionDiv>

      <MotionDiv layout='position' style={{ display: 'grid' }}>
        <Box
          sx={(theme) => ({
            display: 'grid',
            alignItems: !stretchColumns ? 'start' : undefined,
            '& .NavigationItem-item': {
              // eslint-disable-next-line no-nested-ternary
              width: itemWidthMd
                ? selectedLevel >= 1
                  ? `calc(${itemWidthMd} + 1px)`
                  : itemWidthMd
                : 'stretch',
            },
            [theme.breakpoints.down('md')]: {
              width:
                sizeSm !== 'floating'
                  ? `calc(${itemWidthSm || '100vw'} + ${selectedLevel}px)`
                  : `calc(${itemWidthSm || '100vw'} - ${theme.page.horizontal} - ${
                      theme.page.horizontal
                    })`,
              minWidth: 200,
              overflow: 'hidden',
              scrollSnapType: 'x mandatory',
              '& .NavigationItem-item': {
                width:
                  sizeSm !== 'floating'
                    ? `calc(${
                        itemWidthSm || '100vw'
                      } - ${paddingMd} - ${paddingMd} + ${selectedLevel}px)`
                    : `calc(${itemWidthSm || '100vw'} - ${paddingMd} - ${paddingMd} - ${
                        theme.page.horizontal
                      } - ${theme.page.horizontal})`,
                minWidth: `calc(${200}px - ${paddingMd} - ${paddingMd})`,
              },
            },
          })}
        >
          <Box
            className={classes.navigation}
            sx={[
              (theme) => ({
                py: paddingMd,
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
                  mx: paddingMd,
                  whiteSpace: 'nowrap',
                },
                '& .NavigationItem-item.first': {
                  // mt: paddingMd,
                },
                '& .Navigation-column:first-of-type': {
                  boxShadow: 'none',
                },
              }),
              ...(Array.isArray(sx) ? sx : [sx]),
            ]}
          >
            {selectedLevel >= 0 && (
              <Box
                sx={(theme) => ({
                  gridArea: '1 / 1 / 999 / 2',
                  boxShadow: `inset 1px 0 ${theme.palette.divider}`,
                })}
                className={classes.column}
              />
            )}
            {selectedLevel >= 1 && (
              <Box
                sx={(theme) => ({
                  gridArea: '1 / 2 / 999 / 3',
                  boxShadow: `inset 1px 0 ${theme.palette.divider}`,
                })}
                className={classes.column}
              />
            )}
            {selectedLevel >= 2 && (
              <Box
                sx={(theme) => ({
                  gridArea: '1 / 3 / 999 / 4',
                  boxShadow: `inset 1px 0 ${theme.palette.divider}`,
                })}
                className={classes.column}
              />
            )}
            {selectedLevel >= 3 && (
              <Box
                sx={(theme) => ({
                  gridArea: '1 / 4 / 999 / 5',
                  boxShadow: `inset 1px 0 ${theme.palette.divider}`,
                })}
                className={classes.column}
              />
            )}

            <NavigationList items={items} selected mouseEvent={mouseEvent} />
          </Box>
        </Box>
      </MotionDiv>
    </Overlay>
  )
})

if (process.env.NODE_ENV !== 'production') {
  NavigationOverlay.displayName = 'NavigationOverlay'
}
