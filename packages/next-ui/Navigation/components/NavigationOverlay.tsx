import styled from '@emotion/styled'
import { Trans } from '@lingui/react'
import { Box, Fab } from '@mui/material'
import { m, useForceUpdate } from 'framer-motion'
import { useState } from 'react'
import { IconSvg, useIconSvgSize } from '../../IconSvg'
import { LayoutTitle } from '../../Layout'
import { LayoutOverlayHeader, Overlay } from '../../LayoutOverlay'
import { useFabSize } from '../../Theme'
import { iconClose, iconChevronLeft } from '../../icons'
import {
  Navigation,
  NavigationBase,
  NavigationPath,
  NavigationProps,
  NavigationProvider,
  NavigationProviderProps,
  useNavigation,
} from './Navigation'

type NavigationOverlayProps = NavigationProviderProps & {
  active: boolean
  onClose: () => void
}

const MotionDiv = styled(m.div)({
  padding: 10,
})

export function NavigationOverlayBase(props: NavigationOverlayProps) {
  const { active, onClose } = props

  const fabSize = useFabSize('responsive')
  const svgSize = useIconSvgSize('large')

  const { path, select, items } = useNavigation()

  const resetAndClose = () => {
    onClose()
    select([])
  }

  console.log(path, items)

  return (
    <Overlay
      active={active}
      close={onClose}
      variantMd='left'
      sizeMd='full'
      justifyMd='start'
      variantSm='bottom'
      sizeSm='floating'
      justifySm='start'
      sx={{ '& > div > div': { minWidth: 'auto !important' } }}
    >
      <LayoutOverlayHeader
        switchPoint={0}
        noAlign
        sx={{ '&.noAlign': { marginBottom: 0 } }}
        primary={
          <Fab
            onClick={resetAndClose}
            sx={{
              marginLeft: `calc((${fabSize} - ${svgSize}) * -0.5)`,
              marginRight: `calc((${fabSize} - ${svgSize}) * -0.5)`,
            }}
            color='inherit'
            size='responsive'
            disabled={!active}
          >
            <IconSvg src={iconClose} size='large' />
          </Fab>
        }
        secondary={
          path.length > 0 ? (
            <Fab
              sx={{
                marginLeft: `calc((${fabSize} - ${svgSize}) * -0.5)`,
                marginRight: `calc((${fabSize} - ${svgSize}) * -0.5)`,
              }}
              onClick={(e) => {
                select([])
                e.preventDefault()
                e.stopPropagation()
              }}
              color='inherit'
              size='responsive'
            >
              <IconSvg src={iconChevronLeft} size='large' />
            </Fab>
          ) : (
            <></>
          )
        }
      >
        <LayoutTitle size='small' component='span'>
          <Trans id='Navigation' />
        </LayoutTitle>
      </LayoutOverlayHeader>

      <MotionDiv layout='position'>
        <NavigationBase />
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
