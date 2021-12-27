import { usePageRouter, usePageContext } from '@graphcommerce/framer-next-pages'
import React from 'react'
import Button from '../../Button'
import SvgImageSimple from '../../SvgImage/SvgImageSimple'
import { iconClose } from '../../icons'

export function useShowClose() {
  const { overlayGroup } = usePageContext()
  return !!overlayGroup
}

export default function LayoutHeaderClose() {
  const router = usePageRouter()
  const { closeSteps } = usePageContext()

  return (
    <Button
      type='button'
      onClick={() => router.go(closeSteps * -1)}
      aria-label='Close'
      variant='text'
      startIcon={<SvgImageSimple src={iconClose} />}
    >
      Close
    </Button>
  )
}
