import { useGo, usePageContext } from '@graphcommerce/framer-next-pages'
import React from 'react'
import Button from '../../Button'
import SvgImageSimple from '../../SvgImage/SvgImageSimple'
import { iconClose } from '../../icons'

export function useShowClose() {
  const { overlayGroup } = usePageContext()
  return !!overlayGroup
}

export default function LayoutHeaderClose() {
  const { closeSteps } = usePageContext()
  const onClick = useGo(closeSteps * -1)

  return (
    <Button
      type='button'
      onClick={onClick}
      aria-label='Close'
      variant='text'
      startIcon={<SvgImageSimple src={iconClose} />}
    >
      Close
    </Button>
  )
}
