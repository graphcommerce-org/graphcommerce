import { useGo, usePageContext } from '@graphcommerce/framer-next-pages'
import { Trans } from '@lingui/macro'
import { Button } from '@mui/material'
import React from 'react'
import { responsiveVal } from '../../Styles/responsiveVal'
import { makeStyles } from '../../Styles/tssReact'
import SvgImageSimple from '../../SvgImage/SvgImageSimple'
import { iconClose } from '../../icons'

export function useShowClose() {
  const { overlayGroup } = usePageContext()
  return !!overlayGroup
}

const useStyles = makeStyles()((theme) => ({
  close: {
    [theme.breakpoints.up('md')]: {
      marginLeft: `calc(${responsiveVal(12, 22)} * -1)`,
      marginRight: `calc(${responsiveVal(12, 22)} * -1)`,
    },
  },
}))

export default function LayoutHeaderClose() {
  const { closeSteps } = usePageContext()
  const onClick = useGo(closeSteps * -1)
  const { classes } = useStyles()

  return (
    <Button
      type='button'
      onClick={onClick}
      aria-label='Close'
      variant='text'
      startIcon={<SvgImageSimple src={iconClose} />}
      className={classes.close}
    >
      <Trans>Close</Trans>
    </Button>
  )
}
