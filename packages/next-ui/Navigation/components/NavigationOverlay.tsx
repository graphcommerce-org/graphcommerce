import styled from '@emotion/styled'
import { Trans } from '@lingui/react'
import { Box, Fab, SxProps, Theme, useEventCallback } from '@mui/material'
import { m } from 'framer-motion'
import { IconSvg, useIconSvgSize } from '../../IconSvg'
import { LayoutTitle } from '../../Layout'
import { LayoutHeaderContent } from '../../Layout/components/LayoutHeaderContent'
import { Overlay } from '../../LayoutOverlay'
import { useFabSize } from '../../Theme'
import { iconClose, iconChevronLeft } from '../../icons'
import {
  NavigationBase,
  NavigationProvider,
  NavigationProviderProps,
  useNavigation,
} from './Navigation'

type NavigationOverlayProps = NavigationProviderProps & {
  active: boolean
  sx?: SxProps<Theme>
  onClose: () => void
}

const MotionDiv = styled(m.div)({
  padding: 10,
})

export function NavigationOverlayBase(props: NavigationOverlayProps) {
  const { active, sx, onClose: closeCallback } = props

  const fabSize = useFabSize('responsive')
  const svgSize = useIconSvgSize('large')

  const { path, select, items } = useNavigation()

  const handleReset = useEventCallback(() => select([]))

  const handleClose = useEventCallback(() => {
    handleReset()
    closeCallback()
  })

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
            <Trans id='Menu' />
          </LayoutTitle>
        </LayoutHeaderContent>
      </Box>

      <MotionDiv layout='position'>
        <NavigationBase sx={sx} />
      </MotionDiv>
    </Overlay>
  )
}

export function NavigationOverlay(props: NavigationOverlayProps) {
  const { items } = props
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
      <NavigationOverlayBase {...props} />
    </NavigationProvider>
  )
}
