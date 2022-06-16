import styled from '@emotion/styled'
import { Trans } from '@lingui/react'
import { Box, Fab, SxProps, Theme, useEventCallback } from '@mui/material'
import { m } from 'framer-motion'
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
  xPadding?: string
  yPadding?: string
  stretchColumns?: boolean
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
  const { active, sx, onClose: closeCallback, items, xPadding, yPadding, stretchColumns } = props

  const fabSize = useFabSize('responsive')
  const svgSize = useIconSvgSize('large')

  const { path, select } = useNavigation()

  const handleReset = useEventCallback(() => select([]))

  const handleClose = useEventCallback(() => {
    handleReset()
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
      justifySm='center'
      variantMd='left'
      sizeMd='full'
      justifyMd='start'
      sx={{
        zIndex: 'drawer',
        '& > div > div': { minWidth: 'auto !important' },
        '& .LayoutOverlayBase-overlayPane': {
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
        },
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
              <Fab
                color='inherit'
                onClick={handleReset}
                sx={{
                  boxShadow: 'none',
                  marginLeft: `calc((${fabSize} - ${svgSize}) * -0.5)`,
                  marginRight: `calc((${fabSize} - ${svgSize}) * -0.5)`,
                }}
                size='responsive'
              >
                <IconSvg src={iconChevronLeft} size='large' />
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

      <MotionDiv layout='position'>
        <Box
          sx={{
            display: 'grid',
            alignItems: !stretchColumns ? 'start' : undefined,
            // width: 280,
            // overflow: 'scroll',
            // border: '1px solid red',
          }}
        >
          <NavigationBase sx={sx} xPadding={xPadding} yPadding={yPadding} />
        </Box>
      </MotionDiv>
    </Overlay>
  )
}

export function NavigationOverlay(props: NavigationOverlayProps) {
  const { items, xPadding, yPadding, stretchColumns } = props
  return (
    <NavigationProvider
      items={items}
      renderItem={({ id, hasChildren, children, href, name, component }) => {
        if (component) return <>{component}</>
        return (
          <>
            {hasChildren && 'All'} {name}
          </>
        )
      }}
      hideRootOnNavigate
    >
      <NavigationOverlayBase
        {...props}
        xPadding={xPadding}
        yPadding={yPadding}
        stretchColumns={stretchColumns}
      />
    </NavigationProvider>
  )
}
