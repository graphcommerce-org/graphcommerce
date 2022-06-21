import styled from '@emotion/styled'
import { Trans } from '@lingui/react'
import { Box, Fab, SxProps, Theme, useEventCallback } from '@mui/material'
import { m, MotionConfig, MotionConfigContext } from 'framer-motion'
import { Tween } from 'framer-motion/types/types'
import { useContext } from 'react'
import { isElement } from 'react-is'
import { IconSvg, useIconSvgSize } from '../../IconSvg'
import { LayoutTitle } from '../../Layout'
import { LayoutHeaderContent } from '../../Layout/components/LayoutHeaderContent'
import { Overlay } from '../../LayoutOverlay'
import { useFabSize } from '../../Theme'
import { iconClose, iconChevronLeft } from '../../icons'
import {
  NavigationContext,
  NavigationBase,
  NavigationProvider,
  NavigationProviderProps,
  useNavigation,
} from './Navigation'

type NavigationOverlayProps = NavigationProviderProps & {
  active: boolean
  sx?: SxProps<Theme>
  stretchColumns?: boolean
  itemWidth: number
  onClose: () => void
}

type findCurrentProps = Pick<NavigationProviderProps, 'items'> & Pick<NavigationContext, 'path'>

function findCurrent(props: findCurrentProps) {
  const { items, path } = props
  const id = path.slice(-1)[0]
  let result

  items.some(
    // eslint-disable-next-line no-return-assign
    (item) =>
      (!isElement(item) && item.id === id && (result = item)) ||
      (result =
        !isElement(item) && item.childItems && findCurrent({ items: item.childItems, path })),
  )
  return result
}

const MotionDiv = styled(m.div)()

export function NavigationOverlayBase(props: NavigationOverlayProps) {
  const { active, sx, onClose: closeCallback, items, stretchColumns, itemWidth } = props

  const duration = (useContext(MotionConfigContext).transition as Tween | undefined)?.duration ?? 0

  const fabSize = useFabSize('responsive')
  const svgSize = useIconSvgSize('large')

  const { path, select } = useNavigation()

  const handleReset = useEventCallback(() => {
    select([])
  })

  const handleResetMobile = useEventCallback(() => {
    select(path.slice(0, -1))
  })

  const handleClose = useEventCallback(() => {
    setTimeout(() => select([]), duration * 1000)
    closeCallback()
  })

  const current = findCurrent({ items, path })

  const showBack = path.length > 0

  return (
    <Overlay
      active={active}
      close={handleClose}
      variantSm='left'
      sizeSm='full'
      justifySm='start'
      variantMd='left'
      sizeMd='full'
      justifyMd='start'
      sx={{
        zIndex: 'drawer',
        '& > div > div': { minWidth: 'auto !important', width: 'max-content' },
        '& .LayoutOverlayBase-overlayPane': {
          overflow: 'hidden',
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
        },
      }}
    >
      <MotionDiv
        layout
        style={{
          display: 'grid',
        }}
      >
        <Box
          sx={(theme) => ({
            top: 0,
            position: 'sticky',
            height: {
              xs: theme.appShell.headerHeightSm,
              md: theme.appShell.appBarHeightMd,
            },
            zIndex: 1,
          })}
        >
          <LayoutHeaderContent
            floatingMd={false}
            floatingSm={false}
            switchPoint={0}
            left={
              showBack && (
                <>
                  <Fab
                    color='inherit'
                    onClick={handleReset}
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                      boxShadow: 'none',
                      marginLeft: `calc((${fabSize} - ${svgSize}) * -0.5)`,
                      marginRight: `calc((${fabSize} - ${svgSize}) * -0.5)`,
                    }}
                    size='responsive'
                  >
                    <IconSvg src={iconChevronLeft} size='large' />
                  </Fab>
                  <Fab
                    color='inherit'
                    onClick={handleResetMobile}
                    sx={{
                      display: { xs: 'flex', md: 'none' },
                      boxShadow: 'none',
                      marginLeft: `calc((${fabSize} - ${svgSize}) * -0.5)`,
                      marginRight: `calc((${fabSize} - ${svgSize}) * -0.5)`,
                    }}
                    size='responsive'
                  >
                    <IconSvg src={iconChevronLeft} size='large' />
                  </Fab>
                </>
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
              >
                <IconSvg src={iconClose} size='large' />
              </Fab>
            }
          >
            <LayoutTitle size='small' component='span'>
              {current.name || <Trans id='Menu' />}
            </LayoutTitle>
          </LayoutHeaderContent>
        </Box>
      </MotionDiv>

      <MotionDiv
        layout='position'
        style={{
          display: 'grid',
        }}
      >
        <Box
          sx={(theme) => ({
            display: 'grid',
            alignItems: !stretchColumns ? 'start' : undefined,

            [theme.breakpoints.down('md')]: {
              overflow: 'hidden',
              scrollSnapType: 'x mandatory',
              width: `calc(${theme.spacings.md} + ${theme.spacings.md} + ${itemWidth}px)`,
            },
            '& .Navigation-item': {
              width: itemWidth,
            },
          })}
        >
          <NavigationBase sx={sx} />
        </Box>
      </MotionDiv>
    </Overlay>
  )
}

export function NavigationOverlay(props: NavigationOverlayProps) {
  const { items, stretchColumns } = props
  return (
    <MotionConfig
      transition={{
        duration: 0.2,
      }}
    >
      <NavigationProvider
        items={items}
        hideRootOnNavigate
        renderItem={({ hasChildren, name, component }) => {
          if (component) return <>{component}</>
          return (
            <>
              {hasChildren && 'All'} {name}
            </>
          )
        }}
      >
        <NavigationOverlayBase {...props} stretchColumns={stretchColumns} />
      </NavigationProvider>
    </MotionConfig>
  )
}
