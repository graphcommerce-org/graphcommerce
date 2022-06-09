import styled from '@emotion/styled'
import { m, useForceUpdate } from 'framer-motion'
import { useState } from 'react'
import { Overlay } from '../../LayoutOverlay'
import { Navigation, NavigationPath, NavigationProps } from './Navigation'

type NavigationOverlayProps = NavigationProps & {
  active: boolean
  onClose: () => void
}

const MotionDiv = styled(m.div)({
  padding: 10,
})

export function NavigationOverlay(props: NavigationOverlayProps) {
  const { active, onClose, items } = props

  const [path, setPath] = useState<NavigationPath>()

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
      <MotionDiv layout='position'>
        <Navigation items={items} onChange={setPath} hideRootOnNavigate />
      </MotionDiv>
    </Overlay>
  )
}
