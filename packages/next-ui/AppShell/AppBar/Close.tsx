import { usePageRouter, usePageContext } from '@graphcommerce/framer-next-pages'
import { Fab } from '@material-ui/core'
import React from 'react'
import Button from '../../Button'
import SvgImageSimple from '../../SvgImage/SvgImageSimple'
import { iconClose } from '../../icons'

export function useShowClose() {
  const { closeSteps } = usePageContext()
  return closeSteps > 0
}

export default function Close() {
  const router = usePageRouter()
  const { closeSteps } = usePageContext()

  return (
    <Button
      type='button'
      onClick={() => router.go(closeSteps * -1)}
      aria-label='Close'
      variant='pill-link'
      startIcon={<SvgImageSimple src={iconClose} />}
    >
      Close
    </Button>
  )
}
