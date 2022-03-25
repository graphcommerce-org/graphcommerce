import { useGo, usePageContext } from '@graphcommerce/framer-next-pages'
import { Fab } from '@mui/material'
import { useState } from 'react'
import { IconSvg, useIconSvgSize } from '../../IconSvg'
import { useFabSize } from '../../Theme'
import { iconClose } from '../../icons'

export function useShowClose() {
  const { overlayGroup } = usePageContext()
  return !!overlayGroup
}

export function LayoutHeaderClose() {
  const { closeSteps } = usePageContext()
  const [disabled, setDisabled] = useState(false)
  const go = useGo(closeSteps * -1)
  const onClick = () => {
    setDisabled(true)
    go()
  }

  const fabSize = useFabSize('responsive')
  const svgSize = useIconSvgSize('large')

  return (
    <Fab
      onClick={onClick}
      sx={{ boxShadow: 'none', marginLeft: `calc((${fabSize} - ${svgSize}) * -0.5)` }}
      size='responsive'
      disabled={disabled}
    >
      <IconSvg src={iconClose} size='large' />
    </Fab>
  )
}
