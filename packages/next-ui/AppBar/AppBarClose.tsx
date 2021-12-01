import { usePageRouter, usePageContext } from '@graphcommerce/framer-next-pages'
import React from 'react'
import Button from '../Button'
import SvgImageSimple from '../SvgImage/SvgImageSimple'
import { iconClose } from '../icons'

export default function AppBarClose() {
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
