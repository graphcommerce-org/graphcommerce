import { useGo, usePageContext } from '@graphcommerce/framer-next-pages'
import { i18n } from '@lingui/core'
import { Fab } from '@mui/material'
import { useState } from 'react'
import type { FabProps } from '../../Fab'
import { iconClose } from '../../icons'
import { IconSvg, useIconSvgSize } from '../../IconSvg'
import { useFabSize } from '../../Theme'

export type LayoutHeaderCloseProps = {
  onClose?: () => void
  size?: FabProps['size']
}

export function useShowClose() {
  const { overlayGroup } = usePageContext()
  return !!overlayGroup
}

export function LayoutHeaderClose(props: LayoutHeaderCloseProps) {
  const { onClose, size = 'responsive' } = props
  const { closeSteps } = usePageContext()
  const [disabled, setDisabled] = useState(false)
  const go = useGo(closeSteps * -1)
  const onClick = () => {
    setDisabled(true)
    return onClose ? onClose() : go()
  }

  const fabSize = useFabSize(size)
  const svgSize = useIconSvgSize(size === 'large' ? 'large' : 'medium')

  return (
    <Fab
      onClick={onClick}
      className='LayoutHeaderClose-root'
      sx={{
        boxShadow: 'none',
        marginLeft: `calc((${fabSize} - ${svgSize}) * -0.5)`,
        marginRight: `calc((${fabSize} - ${svgSize}) * -0.5)`,
        background: 'none',
      }}
      size={size}
      disabled={disabled}
      aria-label={i18n._(/* i18n */ 'Close')}
    >
      <IconSvg src={iconClose} size='large' />
    </Fab>
  )
}
