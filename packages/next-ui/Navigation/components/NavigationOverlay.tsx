import styled from '@emotion/styled'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Fab, SxProps, Theme, useEventCallback, useMediaQuery } from '@mui/material'
import { m, MotionConfigContext } from 'framer-motion'
import { Tween } from 'framer-motion/types/types'
import { useContext } from 'react'
import { isElement } from 'react-is'
import { IconSvg, useIconSvgSize } from '../../IconSvg'
import { LayoutHeaderContent } from '../../Layout/components/LayoutHeaderContent'
import { LayoutTitle } from '../../Layout/components/LayoutTitle'
import { Overlay } from '../../LayoutOverlay/components/Overlay'
import { useFabSize } from '../../Theme'
import { iconClose, iconChevronLeft } from '../../icons'
import { NavigationContextType, NavigationNode, useNavigation } from '../hooks/useNavigation'
import { NavigationBase } from './NavigationBase'
import { NavigationProvider, NavigationProviderProps } from './NavigationProvider'

type NavigationOverlayProps = {
  active: boolean
  sx?: SxProps<Theme>
  stretchColumns?: boolean
  itemWidth: string
  onClose: () => void
}

type FindCurrentProps = Pick<NavigationProviderProps, 'items'> & Pick<NavigationContextType, 'path'>

function findCurrent(props: FindCurrentProps) {
  const { items, path } = props
  const id = path.slice(-1)[0]
  let result: undefined | NavigationNode

  for (const item of items) {
    if (!isElement(item) && item.id === id) {
      result = item
      break
    }
    if (!isElement(item) && item.childItems) {
      result = findCurrent({ items: item.childItems, path })
      if (result) {
        break
      }
    }
  }

  return result
}

const MotionDiv = styled(m.div)()

export function NavigationOverlay(props: NavigationOverlayProps) {
  const { active, sx, onClose: closeCallback, stretchColumns, itemWidth } = props
  const { path, select, items } = useNavigation()

  const duration = (useContext(MotionConfigContext).transition as Tween | undefined)?.duration ?? 0

  const fabSize = useFabSize('responsive')
  const svgSize = useIconSvgSize('large')

  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'))
  const handleReset = useEventCallback(() => {
    if (isMobile) select(path.slice(0, -1))
    else select([])
  })

  const handeOverlayClose = useEventCallback(() => {
    closeCallback()
    setTimeout(() => {
      select([])
    }, duration * 1000)
  })

  const current = findCurrent({ items, path })

  const showBack = path.length > 0

  return (
    <Overlay
      active={active}
      close={handeOverlayClose}
      variantSm='left'
      sizeSm='floating'
      justifySm='start'
      variantMd='left'
      sizeMd='floating'
      justifyMd='start'
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
            left={
              showBack && (
                <Fab
                  color='inherit'
                  onClick={handleReset}
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
                onClick={handeOverlayClose}
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
              {current?.name ?? <Trans id='Menu' />}
            </LayoutTitle>
          </LayoutHeaderContent>
        </Box>
      </MotionDiv>

      <MotionDiv layout='position' style={{ display: 'grid' }}>
        <Box
          sx={(theme) => ({
            display: 'grid',
            alignItems: !stretchColumns ? 'start' : undefined,

            [theme.breakpoints.down('md')]: {
              overflow: 'hidden',
              scrollSnapType: 'x mandatory',
              width: `calc(${theme.spacings.md} + ${theme.spacings.md} + ${itemWidth})`,
            },
            '& .NavigationItem-item': {
              width: itemWidth,
            },
          })}
        >
          <NavigationBase sx={sx} onItemClick={handeOverlayClose} />
        </Box>
      </MotionDiv>
    </Overlay>
  )
}
