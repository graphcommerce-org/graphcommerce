import styled from '@emotion/styled'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Fab, SxProps, Theme, useEventCallback, useMediaQuery } from '@mui/material'
import { m } from 'framer-motion'
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
  useNavigation,
} from '../hooks/useNavigation'
import { NavigationList } from './NavigationList'

type LayoutOverlayVariant = 'left' | 'bottom' | 'right'
type LayoutOverlaySize = 'floating' | 'minimal' | 'full'
type LayoutOverlayAlign = 'start' | 'end' | 'center' | 'stretch'

type NavigationOverlayProps = {
  active: boolean
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
}

function findCurrent(
  items: NavigationContextType['items'],
  selected: NavigationContextType['selected'],
): NavigationNodeHref | NavigationNodeButton | undefined {
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

export function NavigationOverlay(props: NavigationOverlayProps) {
  const {
    active,
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
  } = props
  const { selected, select, items, onClose } = useNavigation()

  const fabSize = useFabSize('responsive')
  const svgSize = useIconSvgSize('large')

  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'))
  const handleOnBack = useEventCallback(() => {
    if (isMobile) select(selected.slice(0, -1))
    else select([])
  })

  const showBack = selected.length > 0

  return (
    <Overlay
      className={classes.root}
      active={active}
      onClosed={onClose}
      variantSm={variantSm}
      sizeSm={sizeSm}
      justifySm={justifySm}
      variantMd={variantMd}
      sizeMd={sizeMd}
      justifyMd={justifyMd}
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
              showBack && (
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
                onClick={() => onClose()}
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
              {findCurrent(items, selected)?.name ?? <Trans id='Menu' />}
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
                ? selected.length === 1
                  ? `calc(${itemWidthMd} + 1px)`
                  : itemWidthMd
                : 'auto',
            },
            [theme.breakpoints.down('md')]: {
              width: itemWidthSm
                ? `calc(${itemWidthSm})`
                : `calc(100vw - ${theme.page.horizontal} - ${theme.page.horizontal})`,
              overflow: 'hidden',
              scrollSnapType: 'x mandatory',
              '& .NavigationItem-item': {
                width: itemWidthSm
                  ? `calc(${itemWidthSm} - ${theme.spacings.md} - ${theme.spacings.md})`
                  : `calc(100vw - ${theme.page.horizontal} - ${theme.page.horizontal} - ${theme.spacings.md} - ${theme.spacings.md})`,
              },
            },
          })}
        >
          <Box
            className={classes.navigation}
            sx={[
              (theme) => ({
                py: theme.spacings.md,
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
                  mx: theme.spacings.md,
                  whiteSpace: 'nowrap',
                },
                '& .NavigationItem-item.first': {
                  // mt: theme.spacings.md,
                },
                '& .Navigation-column:first-of-type': {
                  boxShadow: 'none',
                },
              }),
              ...(Array.isArray(sx) ? sx : [sx]),
            ]}
          >
            {selected.length >= 0 && (
              <Box
                sx={(theme) => ({
                  gridArea: '1 / 1 / 999 / 2',
                  boxShadow: `inset 1px 0 ${theme.palette.divider}`,
                })}
                className={classes.column}
              />
            )}
            {selected.length >= 1 && (
              <Box
                sx={(theme) => ({
                  gridArea: '1 / 2 / 999 / 3',
                  boxShadow: `inset 1px 0 ${theme.palette.divider}`,
                })}
                className={classes.column}
              />
            )}
            {selected.length >= 2 && (
              <Box
                sx={(theme) => ({
                  gridArea: '1 / 3 / 999 / 4',
                  boxShadow: `inset 1px 0 ${theme.palette.divider}`,
                })}
                className={classes.column}
              />
            )}
            {selected.length >= 3 && (
              <Box
                sx={(theme) => ({
                  gridArea: '1 / 4 / 999 / 5',
                  boxShadow: `inset 1px 0 ${theme.palette.divider}`,
                })}
                className={classes.column}
              />
            )}

            <NavigationList items={items} selected />
          </Box>
        </Box>
      </MotionDiv>
    </Overlay>
  )
}
