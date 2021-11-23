import { usePageRouter, usePageContext } from '@graphcommerce/framer-next-pages'
import { Fab } from '@material-ui/core'
import React from 'react'
import { iconClose } from '../../icons'
import SvgImageSimple from '../../SvgImage/SvgImageSimple'

export default function Close() {
  const router = usePageRouter()
  const { closeSteps } = usePageContext()
  const canClose = closeSteps > 0

  if (!canClose) return null
  return (
    <Fab type='button' onClick={() => router.go(closeSteps * -1)} aria-label='Close'>
      <SvgImageSimple src={iconClose} />
    </Fab>
  )
}
